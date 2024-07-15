const express = require("express");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();
const axios = require("axios");
const rateLimit = require("express-rate-limit");

// Swagger Api documentation view at "http://localhost:3001/api-docs"
const { swaggerUi, swaggerSpec } = require('./swagger');

// const bodyParser = require("body-parser");
// const path = require('path');
// const imageRouter = require('./routes/imageRouter');
// const Ticket = require('./models/ticket');

// Importing Database connection info
const connectToMongo = require("./db/connection");

// Importing Routes
const authenticationRouter = require('./routes/authenticationRouter');
const profileRouter = require('./routes/profileRouter');
const adminRouter = require('./routes/adminRouter');
const ticketsRouter = require('./routes/ticketsRouter');

// Importing Middlewares
const ensureAuthenticated = require('./middlewares/ensureAuthenticated');
const ensureAdmin = require('./middlewares/ensureAdmin');

// Models
const Allow = require('./models/allow');

// const dirname = path.resolve();
// console.log('directory-name 👉️', dirname);

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

connectToMongo().then(() => {
  console.info('Connected to db');
});

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with client URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter); // Apply rate limiter to all requests

// Configure session options
const sessionOptions = {
  secret: process.env.APP_SECRET,
  name: 'sid',
  resave: false, // don't save the sessions back to the session store
  saveUninitialized: false, // don't save uninitialized sessions to the session store
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // set cookie age to 1 day in milliseconds
    sameSite: 'lax' // prevent cross-site request forgery (CSRF) attacks
  }
};

// check if in production environment
const isProduction = app.get('env') === 'production';

if (isProduction) {
  app.set('trust proxy', 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
}

// use the session
app.use(session(sessionOptions));

// Using Routes for User Auth
app.use('/user', authenticationRouter);
// Using Routes for user profile
app.use('/user/profile', ensureAuthenticated, profileRouter);
// Using Routes for admin
app.use('/admin', ensureAuthenticated, ensureAdmin, adminRouter);
// Using Routes for tickets
app.use('/tickets', ensureAuthenticated, ticketsRouter);
// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


/**
 * @swagger
 * tags:
 *   name: Allow All
 *   description: Allow All status management
 */

/**
 * @swagger
 * /allow-all:
 *   get:
 *     summary: Get Allow All status
 *     tags: [Allow All]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved Allow All status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Allow'
 *       403:
 *         description: Not authorized or Allow All model not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update Allow All status
 *     tags: [Allow All]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allowAll:
 *                 type: string
 *                 enum: [Yes, No]
 *             required:
 *               - allowAll
 *     responses:
 *       200:
 *         description: Successfully updated Allow All status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       403:
 *         description: Not authorized or Allow All model not found
 *       500:
 *         description: Internal server error
 */

// Allow All Get
app.get("/allow-all", ensureAuthenticated, async (req, res) => {
  try {
    const role = req.session?.user?.role;
    if (role !== "superAdmin") {
      return res.status(403).json({ error: "Not Authorized to view the status of Allow All"});
    }

    // Check Allow All
    const allow = await Allow.findOne({ name: "main"});
    if (!allow) {
      return res.status(403).json({ error: "Allow All Model Not Found"});
    }
    
    return res.status(200).json(allow)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Allow All Update
app.put("/allow-all", ensureAuthenticated, async (req, res) => {
  try {
    const role = req.session?.user?.role;
    if (role !== "superAdmin") {
      return res.status(403).json({ error: "Not Authorized to change the status of Allow All"});
    }

    const { allowAll } = req.body;
    const allowAllValues = ["Yes", "No"];

    if ( !allowAll || !allowAllValues.includes(allowAll) ) {
      return res.status(400).json({ error: 'Please provide a valid Allow All status must be Yes or No' });
    }

    // Check Allow All
    const allow = await Allow.findOne({ name: "main"});
    if (!allow) {
      return res.status(403).json({ error: "Allow All Model Not Found"});
    }

    allow.allowAll = allowAll;
    await allow.save();
    
    return res.status(200).json({ message : `Allow All status changed to ${allow.allowAll} successfully` })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// view image
app.get("/image/:id", ensureAuthenticated, async (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  try {
    const response = await axios.get(driveUrl, {
      responseType: "arraybuffer",
    });
    if (response.status === 200) {
      res.set("Content-Type", response.headers["content-type"]);
      res.send(response.data);
    } else {
      // console.error(`Failed to fetch image. Status code: ${response.status}`);
      res.status(response.status).send(`Failed to fetch image. Status code: ${response.status}`);
    }
  } catch (error) {
    // console.error("Error fetching the image:", error.message);
    res.status(500).send("Error fetching the image");
  }
});

// app.use("/imageFiles/:imageId", ensureAuthenticated, async (req, res, next) => {

//     const imageId = req.params?.imageId;
//     const loggedUser = req.session?.user;
//     const roles = ['superAdmin', 'admin', 'supportAgent'];

//     const ticket = await Ticket.findOne({imageURL: imageId});

//     if (!ticket) {
//       return res.status(404).json({error: "Ticket not found", imageURL: imageId})
//     }

//     if (ticket?.user?._id.toString() !== loggedUser?._id && !roles.includes(loggedUser?.role) ) {
//       return res.status(403).json({error: "Not authorized to view image"})
//     }

//     next();

//   }, express.static(path.join(dirname, "/upload/images"))
// );

// app.use("/imagesApi", ensureAuthenticated, imageRouter);

app.get("/", (req, res) => {
  if (req.session?.user) { return res.json({ message: `Welcome ${req.session.user?.name}`}); }
  return res.json({ message: "Welcome Guest"});
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  // Connecting to the Database
  // await connectToMongo();
});

module.exports = app;
