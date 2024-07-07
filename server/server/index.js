const express = require("express");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();

const bodyParser = require("body-parser");
const path = require('path');
const imageRouter = require('./routes/imageRouter');
const Ticket = require('./models/ticket');

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

const dirname = path.resolve();
console.log('directory-name 👉️', dirname);

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static(path.join(dirname, "public")));


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

app.use("/imageFiles/:imageId", ensureAuthenticated, async (req, res, next) => {

    const imageId = req.params?.imageId;
    const loggedUser = req.session?.user;
    const roles = ['superAdmin', 'admin', 'supportAgent'];

    const ticket = await Ticket.findOne({imageURL: imageId});

    if (!ticket) {
      return res.status(404).json({error: "Ticket not found", imageURL: imageId})
    }

    if (ticket?.user?._id.toString() !== loggedUser?._id && !roles.includes(loggedUser?.role) ) {
      return res.status(403).json({error: "Not authorized to view image"})
    }

    next();

  }, express.static(path.join(dirname, "/upload/images"))
);

app.use("/imagesApi", ensureAuthenticated, imageRouter);

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
