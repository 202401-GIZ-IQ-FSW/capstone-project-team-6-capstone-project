const User = require('../models/user');

const ensureAdmin = async (req, res, next) => {
    
    //  Check if the user exist in the database
    const user = await User.findById(req.session?.user?._id)
    // If the user is not found
    if (!user) {
        return res.status(403).send({ error: 'Unauthorized the user either does not exist or is not signed in' });
    }
    const role = req.session.user.role;
    const roles = ['superAdmin', 'admin'];
    // If the user is found, we check if he is an admin or not
    if (!roles.includes(role)) {
        return res.status(403).send({ error: 'Unauthorized the user is not an admin' });
    }
    // If the user is found and he is an admin, we allow the request to be processed by passing the execution to the next function
    next();
}

module.exports = ensureAdmin;
