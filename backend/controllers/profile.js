const Profile = require('../models/ProfileModel');

// Controller action to create a new user profile
const createProfile = async (req, res) => {
    try {
      const { name, place, age, email, password, education, phoneNumber } = req.body;
      const profile = new Profile({ name, place, age, email, password, education, phoneNumber });
      await profile.save();
      res.status(201).json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

// Controller action to retrieve all user profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller action to delete a user profile by ID
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfiles,
  deleteProfile,
};
