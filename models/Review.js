const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, 'Please enter a rating'],
  },
  content: {
    type: String,
    required: [true, 'You had better back up what you said or else!'],
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
