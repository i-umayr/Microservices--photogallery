const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  imageData: {
    type: String, 
    required: true,
  },
});

const gallerySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  freeStorage: {
    type: Number,
    required: true,
  },
  images: [imageSchema],
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = { Gallery };
