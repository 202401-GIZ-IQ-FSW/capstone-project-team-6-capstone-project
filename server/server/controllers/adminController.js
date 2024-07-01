const User = require('../models/user');
const Ticket = require('../models/ticket');

const getUsers = async (req, res) => {
  try {
    const role = req.session?.user.role;
    let users;

    if (role === "superAdmin") {
      users = await User.find({role: {$ne: 'superAdmin'}}).select('-password');
      if (!users || users.length === 0) {
        return res.status(404).json({error: "Can't find or there aren't any admins, support agents or customers accounts"})
      }
    } else {
      users = await User.find({role: {$nin: ['superAdmin', 'admin']}}).select('-password');
      if (!users || users.length === 0) {
        return res.status(404).json({error: "Can't find or there aren't any customers or support agents accounts"})
      }
    }
    
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const getUser = async (req, res) => {
  try {
    const isSuperAdmin = req.session?.user.role === 'superAdmin';
    const roles = ['supportAgent', 'customer']

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }
    
    if (user._id.toString() !== req.session?.user._id && !isSuperAdmin && !roles.includes(user.role)) {
      return res.status(403).json({error: "Not Authorized, only super admin can view other admins accounts"})
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const deleteUser = async (req, res) => {
  try {
    const isSuperAdmin = req.session?.user.role === 'superAdmin';
    
    const roles = ['supportAgent', 'customer']

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    const isLoggedUser = user._id.toString() === req.session?.user._id

    if (!isLoggedUser && !isSuperAdmin && !roles.includes(user.role)) {
      return res.status(403).json({error: "Not Authorized, only SuperAdmin can delete other admins"})
    }

    // Find and delete all tickets belonging to the user
    await Ticket.deleteMany({ user: user._id });

    // Delete user profile
    await user.remove()

    if (isLoggedUser) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Could not destroy session' });
        }
        return res.status(200).json({ message: 'Profile and associated tickets deleted successfully' })
      });
    }

    res.status(200).json({ message: 'Profile and associated tickets deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const isSuperAdmin = req.session?.user.role === 'superAdmin';

    if (!isSuperAdmin) {
      return res.status(403).json({error: "Not Authorized, only super admin can create admins"})
    }

    const { id, role } = req.body;
    const newRoles = ['admin', 'customer']

    if (!id || !role || !newRoles.includes(role)) {
      return res.status(400).json({ error: 'Please provide a valid id and role must be of admin or customer' });
    }

    const newAdmin = await User.findByIdAndUpdate(
      id,
      {role: role},
      { new: true, select: '-password' }
    )

    if (!newAdmin) {
      return res.status(404).json({error: "User not found"})
    }
    
    res.status(200).json(newAdmin)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSupportAgent = async (req, res) => {
  try {
    const loggedUserRole = req.session?.user.role;
    const roles = ['superAdmin', 'admin']

    if (!roles.includes(loggedUserRole)) {
      return res.status(403).json({error: "Not Authorized, only admins can create support agents"})
    }

    const { id, role } = req.body;
    const newRoles = ['supportAgent', 'customer']

    if (!id || !role || !newRoles.includes(role)) {
      return res.status(400).json({ error: 'Please provide a valid id and role must be of supportAgent or customer' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    if (user.role === 'admin' && loggedUserRole !== "superAdmin") {
      return res.status(403).json({error: "Not Authorized, only superAdmin can change an admin to supportAgent"})
    }

    user.role = role;
    await user.save();
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const loggedUserRole = req.session?.user.role;
    const superAdminLoggedIn = loggedUserRole === 'superAdmin';
    const userId = req.params.id;

    const { role } = req.body;
    const newRoles = ['admin', 'supportAgent', 'customer']

    if (!role || !newRoles.includes(role)) {
      return res.status(400).json({ error: 'Please provide a valid role must be of admin, supportAgent or customer' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    if (user.role === 'admin' && !superAdminLoggedIn) {
      return res.status(403).json({error: "Not Authorized, only superAdmin can change admin role"})
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {role: role},
      { new: true, select: '-password' }
    )

    if (!updatedUser) {
      return res.status(404).json({error: "User not found"})
    }
    
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  createAdmin,
  createSupportAgent,
  updateUserRole
};