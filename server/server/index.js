const express = require("express");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();

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

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with client URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure session options
const sessionOptions = {
  secret: process.env.SECRET_KEY,
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

app.get("/", (req, res) => {
  if (req.session?.user) { return res.json({ message: `Welcome ${req.session.user?.name}`}); }
  return res.json({ message: "Welcome Guest"});
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  // Connecting to the Database
  await connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!! Good Luck with your capstones :D"
  );
});

module.exports = app;
