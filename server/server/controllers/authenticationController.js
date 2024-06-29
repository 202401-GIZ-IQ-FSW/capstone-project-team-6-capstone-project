const User = require('../models/user');
const bcrypt = require('bcrypt');

async function login (req, res) {
    try {
      const { email, password, rememberMe } = req.body;
  
      // User must exist in the database for sign in request
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Wrong email' });
      }
  
      // bcrypt compare is used to validate the plain text password sent in the request body with the hashed password stored in the database
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ error: 'Wrong password' });
      }
  
      // If the user is already signed in don't sign in again
      if (req.session?.user) {
        return res.status(400).json({ error: 'User is already signed in' });
      }
  
      if (rememberMe) {
          req.session.cookie.maxAge = 14 * 24 * 3600 * 1000; // Value of 14 days in milliseconds
      }
      // If password is valid, it's a sign in success. User details are returned in session
      // Regenerate session ID is used to prevent session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ error: 'Could not regenerate session' });
        }
        // Convert the user document to a plain object and delete the password field
        const userObj = user.toObject();
        delete userObj.password;
        req.session.user = userObj;
        // console.log("login session", req.session.user)
        res.json({ message: 'Sign in success'});
      });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function signup (req, res) {
    try {
      const {
        name,
        username,
        email,
        password,
        confirmPassword,
        role,
        ...rest
      } = req.body;
  
      // Check password typed correctly by user twice
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'passwords do not match' });
      }
  
      // User must not exist in the database for sign up request
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: `${email}: email already exist` });
      }
  
      // User must not exist in the database for sign up request
      user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ error: `${username}: username already exist` });
      }
  
      // Create the user record on the database
      user = await User.create({
        name,
        username,
        email,
        password,
        ...rest
      });
  
      // Once user record is created, it's a sign up success user details is returned in session
      // Regenerate session ID is used to prevent session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ error: 'Could not regenerate session' });
        }
        // Convert the user document to a plain object and delete the password field
        const userObj = user.toObject();
        delete userObj.password;
        req.session.user = userObj;
        res.status(201).json({ message: 'Sign up success' });
      });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getSession (req, res) {
  // console.log("getSession session", req.session?.user)
  try {
      if (req.session?.user) {
        return res.status(200).json({ user: req.session.user });
      } else {
        return res.status(403).json({ error: "User is not signed in" });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

async function logout (req, res) {
    try {
        // express session destroy function is used to destroy the session and unset the req.session property
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ error: 'Could not destroy session' });
          }
          res.json({ message: 'Sign out success' });
      });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    login,
    signup,
    getSession,
    logout
};