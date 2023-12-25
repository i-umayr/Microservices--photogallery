const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gallery: {
    freeStorage: {
      type: Number,
      required: true,
    },
    freeBandwidth: {
      type: Number,
      required: true,
    },
    images: [
      {
        title: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        imageLink: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  storage: {
    totalStorage: {
      type: Number,
      required: true,
    },
    usedStorage: {
      type: Number,
      required: true,
    },
    freeStorage: {
      type: Number,
      required: true,
    },
  },
  usage: {
    totalUsage: {
      type: Number,
      required: true,
    },
    dailyUsage: {
      type: Number,
      required: true,
    },
  },
});

const View = mongoose.model('View', ViewSchema);

module.exports = {View};