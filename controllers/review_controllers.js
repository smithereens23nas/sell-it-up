const express = require('express');
const router = express.Router();

const db = require('../models');

/* == Review Routes == */

/* == index route == */
router.get("/", function (req, res) {
    db.Review.find({}, function (error, allReviews) {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
          // Here is our adjustment 
      const context = { reviews: allReviews };
      return res.render("review/index", context);
    });
  });

module.exports = router