const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique:true
  },
  totalUsage: {
    type: Number,
    required: true,
  },
  dailyUsage: {
    type: Number,
    required: true,
  }
});

const Usage = mongoose.model('Usage', storageSchema);

module.exports = {Usage};