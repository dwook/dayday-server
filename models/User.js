const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebook_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  profile_image: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
