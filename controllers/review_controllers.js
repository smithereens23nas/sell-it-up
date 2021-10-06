const express = require('express');
const router = express.Router();
const { Product, Review } = require("../models");

Review.deleteMany({}, function (error, deletedReviews) {
  if (error) {
    return console.log(error);
  }
  Review.insertMany(
    [
      {
        rating: 5,
        content: "Fast Delivery!",
        product: "615b331be3d673dc223bf66e",
      },
      {
        rating: 3,
        content: "Took awhile to get here, but the product is great.",
        product: "615b2cb8e3d673dc223bf665",
      },
      {
        rating: 4,
        content: "love the style of the products",
        product: "615b2cb8e3d673dc223bf665",
      },
    ],
    function (error, createdReviews) {
      if (error) {
        return console.log(error);
      }
      console.log("=== Seed Complete ===");
      console.log(createdReviews);
    }
  );
});

module.exports = Review;