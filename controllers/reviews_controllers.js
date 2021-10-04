const express = require('express');
const router = express.Router();

const {Review} = require('../models');

/* == Review Routes == */

/* == index route == */
router.get('/', function (req, res) {

  Review.find({}, (error, reviews) => {
    if (error) return console.log(error);

    const context = {
        reviews,
    }

    console.log(`My context length is right now: ${context.reviews}`)

    res.render('review/index', context);
  });
});

/* == Show == */
router.get('/:id', function (req, res, next) { 
    Review.findById( req.params.id, ( error, foundReview ) => {
        if (error) {
            console.log(error)
            req.error = error
            return next()
        };

        const context = {
            review: foundReview,
        }

        res.render('review/show', context);
    });
});

module.exports = router;