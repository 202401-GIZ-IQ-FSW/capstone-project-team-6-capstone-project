const User = require('../models/user');

const getProfile = async (req, res) => {
  try {
    const id = req.session?.user._id;
    
    const user = await User.findById(id).select('-password');
   
    if (!user) {
      return res.status(404).json({error: "User not found"})
    }

    delete user.password;
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

    const user = await User.findByIdAndUpdate(
      id,
      data,
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
  
    await user.remove()

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not destroy session' });
      }
      return res.status(200).json({ message: 'Profile deleted successfully' })
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