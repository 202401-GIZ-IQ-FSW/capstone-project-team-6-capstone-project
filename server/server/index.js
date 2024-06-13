const express = require("express");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();

// Importing Database connection info
const connectToMongo = require("./db/connection");

// Importing Routes
const authenticationRouter = require('./routes/authenticationRouter');

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
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

// attach user to session
function attachUser(req, res, next) {
  res.locals.user = req.session?.user ?? null;
  next();
}

// use the attachUser function
app.use(attachUser);

// Using Routes for User Auth
app.use('/user', authenticationRouter);

app.get("/", (req, res) => {
  res.json(
    "Welcome to support ticket website"
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!!  Good Luck with your capstones :D"
  );
});

module.exports = app;
