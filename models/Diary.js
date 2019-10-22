const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  good: {
    type: String,
    required: true
  },
  bad: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Diary', diarySchema);
