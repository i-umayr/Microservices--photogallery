const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique:true
  },
  totalStorage: {
    type: Number,
    required: true,
  },
  UsedStorage: {
    type: Number,
    required: true,
  },
  FreeStorage: {
    type: Number,
    required: true,
  }
});

const Storage = mongoose.model('Schema', storageSchema);

module.exports = {Storage};