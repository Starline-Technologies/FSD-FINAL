const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
