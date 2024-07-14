// authentication
const Allow = require('../models/allow');

module.exports = async (req, res, next) => {
  
  // Check Allow All
  const allow = await Allow.findOne({ name: "main"});
  if (!allow) {
    return res.status(403).json({ error: "No session, Not Allowed"});
  }
  // Check if user session is active, that is if user is already authenticated
  if (!req.session?.user) {

    // The HTTP 403 Forbidden response status code is sent which indicates that the server refuses to authorize the request.
    return res.status(403).json({ error: "Unauthorized the user is not signed in"});

  } else if (req.session?.user.status !== "Active" && allow?.allowAll !== "Yes") { 

    if (req.session?.user.status === "Pending") {

      return res.status(403).json({ error: "Account is Pending activation"});

    } else if ( req.session?.user.status === "Blocked" ) {

      return res.status(403).json({ error: "Account is Blocked"});

    } else {

      return res.status(403).json({ error: "Unauthorized the user is not signed in"});
    }
  } else {
    // if the user is signed in, we allow the request to be processed by passing the execution to the next function
    next();
  }
};

