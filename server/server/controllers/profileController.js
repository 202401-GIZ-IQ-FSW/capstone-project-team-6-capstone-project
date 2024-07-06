const User = require('../models/user');
const Ticket = require('../models/ticket');

// Function to filter out empty fields from the request body
const filterEmptyFields = (data) => {
  const filteredData = {};
  for (const key in data) {
    if (data[key] !== "") {
      filteredData[key] = data[key];
    }
  }
  return filteredData;
};

const getProfile = async (req, res) => {
  try {
    const id = req.session?.user._id;
    
    const user = await User.findById(id).select('-password');
   
    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

const updateProfile = async (req, res) => {
  try {
    const id = req.session?.user._id;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Please provide data to update like email or password' });
    }

    if (data.role) {
      delete data.role;
    }

    // Filter out empty fields
    const filteredData = filterEmptyFields(data);

    // Check if there is any data left to update
    if (Object.keys(filteredData).length === 0) {
      return res.status(400).json({ error: 'Please provide data to update like email or password' });
    }

    // Parse and validate dateOfBirth field
    if (filteredData.dateOfBirth) {
      filteredData.dateOfBirth = new Date(filteredData.dateOfBirth);
      if (isNaN(filteredData.dateOfBirth)) {
        return res.status(400).json({ error: 'Invalid date format for dateOfBirth' });
      }
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      filteredData,
      { new: true, select: '-password' }
    )

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }
    
    delete user.password;
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const id = req.session?.user._id;
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({error: "User not found"})
    }
  
    // Find and delete all tickets belonging to the user
    await Ticket.deleteMany({ user: id });

    // Find and update all tickets assigned to the user
    await Ticket.updateMany({assignedUser: id}, {$unset: {assignedUser: ""}});

    // Delete user profile
    await user.remove()

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not destroy session' });
      }
      return res.status(200).json({ message: 'Profile and associated tickets deleted successfully' })
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
};