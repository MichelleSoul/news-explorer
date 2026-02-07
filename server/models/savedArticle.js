const mongoose = require('mongoose');
const validator = require('validator');

const savedArticleSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Invalid URL format'
    }
  },
  tag: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  // Article data from News API
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Invalid image URL format'
    }
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('savedArticle', savedArticleSchema);
