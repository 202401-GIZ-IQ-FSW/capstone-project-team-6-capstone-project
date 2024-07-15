const User = require('../models/user');
const Ticket = require('../models/ticket');
const Comment = require('../models/comment');

const getUsers = async (req, res) => {
  try {
    const role = req.session?.user.role;
    let users;

    if (role === "superAdmin") {
      users = await User.find({role: {$ne: 'superAdmin'}}).select('-password').sort({ createdAt: -1 });

      if (!users || users.length === 0) {
        return res.status(404).json({error: "Can't find or there aren't any admins, support agents or customers accounts"})
      }
    } else {
      users = await User.find({role: {$nin: ['superAdmin', 'admin']}}).select('-password').sort({ createdAt: -1 });
      
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
      return res.status(404).json({error: "User not found"});
    }
    
    if (user._id.toString() !== req.session?.user._id && !isSuperAdmin && !roles.includes(user.role)) {
      return res.status(403).json({error: "Not Authorized, only super admin can view other admins accounts"});
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

    const isLoggedUser = user._id.toString() === req.session?.user._id;

    if (!isLoggedUser && !isSuperAdmin && !roles.includes(user.role)) {
      return res.status(403).json({error: "Not Authorized, only SuperAdmin can delete other admins"})
    }

    // Find all tickets belonging to the user
    const userTickets = await Ticket.find({ user: user?._id });

    // Delete all comments associated with the user's tickets
    const ticketIds = userTickets.map(ticket => ticket._id);
    await Comment.deleteMany({ ticket: { $in: ticketIds } });

    // Find and delete all tickets belonging to the user
    await Ticket.deleteMany({ user: user?._id });

    // Find and update all tickets assigned to the user
    await Ticket.updateMany({assignedUser: user?._id}, {$unset: {assignedUser: ""}});

    if (isLoggedUser) {
      // Delete logged admin profile
      await user.remove()

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Could not destroy session' });
        } else {
          return res.status(200).json({ message: 'Admin Profile and associated tickets deleted successfully' })
        }
      });
    } else {
      // Delete user profile
      await user.remove()

      return res.status(200).json({ message: 'User Profile and associated tickets deleted successfully' })
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const createAdmin = async (req, res) => {
//   try {
//     const isSuperAdmin = req.session?.user.role === 'superAdmin';

//     if (!isSuperAdmin) {
//       return res.status(403).json({error: "Not Authorized, only super admin can create admins"})
//     }

//     const { id, role } = req.body;
//     const newRoles = ['admin', 'customer']

//     if (!id || !role || !newRoles.includes(role)) {
//       return res.status(400).json({ error: 'Please provide a valid id and role must be of admin or customer' });
//     }

//     const newAdmin = await User.findByIdAndUpdate(
//       id,
//       {role: role},
//       { new: true, select: '-password' }
//     )

//     if (!newAdmin) {
//       return res.status(404).json({error: "User not found"})
//     }
    
//     res.status(200).json(newAdmin)
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const createSupportAgent = async (req, res) => {
//   try {
//     const loggedUserRole = req.session?.user.role;
//     const roles = ['superAdmin', 'admin']

//     if (!roles.includes(loggedUserRole)) {
//       return res.status(403).json({error: "Not Authorized, only admins can create support agents"})
//     }

//     const { id, role } = req.body;
//     const newRoles = ['supportAgent', 'customer']

//     if (!id || !role || !newRoles.includes(role)) {
//       return res.status(400).json({ error: 'Please provide a valid id and role must be of supportAgent or customer' });
//     }

//     const user = await User.findById(id).select('-password');

//     if (!user) {
//       return res.status(404).json({error: "User not found"})
//     }

//     if (user.role === 'admin' && loggedUserRole !== "superAdmin") {
//       return res.status(403).json({error: "Not Authorized, only superAdmin can change an admin to supportAgent"})
//     }

//     user.role = role;
//     await user.save();
//     res.status(200).json(user)
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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

    if ( ['superAdmin', 'admin'].includes(user.role) && !superAdminLoggedIn ) {
      return res.status(403).json({error: "Not Authorized, only superAdmin can change admin role"})
    }

    if ( role === 'customer' && ['admin', 'supportAgent'].includes(user.role) ) {
      await Ticket.updateMany({assignedUser: userId}, {$unset: {assignedUser: ""}});
    }

    user.role = role;
    await user.save();
    
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const loggedUserRole = req.session?.user.role;
    const superAdminLoggedIn = loggedUserRole === 'superAdmin';
    const userId = req.params.id;

    const { status } = req.body;
    const statusValues = ["Active", "Pending", "Blocked"]

    if (!status || !statusValues.includes(status)) {
      return res.status(400).json({ error: 'Please provide a valid status must be of Active, Pending or Blocked' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    if ( ['superAdmin', 'admin'].includes(user.role) && !superAdminLoggedIn ) {
      return res.status(403).json({error: "Not Authorized, only superAdmin can change admin status"})
    }

    // if ( role === 'customer' && ['admin', 'supportAgent'].includes(user.role) ) {
    //   await Ticket.updateMany({assignedUser: userId}, {$unset: {assignedUser: ""}});
    // }

    user.status = status;
    await user.save();
    
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const role = req.session?.user?.role; // Ensure to access role safely
    let users;

    const { name, username, email } = req.query;

    if (!name && !username && !email) {
      return res.status(400).json({ error: 'At least one query parameter (name, username, email) is required' });
    }

    let query = {};
    // If searching by name
    if (name) {
      query.name = new RegExp(name, 'i'); // Case-insensitive search
    }
    if (username) {
      query.username = new RegExp(username, 'i'); // Case-insensitive search
    }
    if (email) {
      query.email = new RegExp(email, 'i'); // Case-insensitive search
    }

    // Constructing the regex condition for search
    const searchRegex = new RegExp(Object.values(query).map(val => val.source).join('|'), 'i'); // Case-insensitive search

    let searchConditions;
    if (role === "superAdmin") {
      searchConditions = {
        role: { $ne: 'superAdmin' },
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { username: searchRegex }
        ]
      };
    } else {
      searchConditions = {
        role: { $nin: ['superAdmin', 'admin'] },
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { username: searchRegex }
        ]
      };
    }

    users = await User.find(searchConditions).select('-password');

    if (!users || users.length === 0) {
      if (role === "superAdmin") {
        return res.status(404).json({ error: "Can't find any admins, support agents, or customers accounts" });
      } else {
        return res.status(404).json({ error: "Can't find any customers or support agents accounts" });
      }
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sortUsers = async (req, res) => {
  try {
    const role = req.session?.user.role;
    let users;

    const { sort } = req.query;
    let sortOrder = -1; // Default to descending

    if (sort && (sort === 'asc' || sort === 'desc')) {
      sortOrder = sort === 'asc' ? 1 : -1;
    }

    if (role === "superAdmin") {
      users = await User.find({role: {$ne: 'superAdmin'}}).select('-password').sort({ createdAt: sortOrder });

      if (!users || users.length === 0) {
        return res.status(404).json({error: "Can't find or there aren't any admins, support agents or customers accounts"})
      }
    } else {
      users = await User.find({role: {$nin: ['superAdmin', 'admin']}}).select('-password').sort({ createdAt: sortOrder });
      
      if (!users || users.length === 0) {
        return res.status(404).json({error: "Can't find or there aren't any customers or support agents accounts"})
      }
    }
    
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  // createAdmin,
  // createSupportAgent,
  updateUserRole,
  updateUserStatus,
  searchUsers,
  sortUsers
};