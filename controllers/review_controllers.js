const express = require('express');
const router = express.Router();
const { Product, Review } = require("../models");

router.get("/", (req, res) => {
  Review.find({})
    .populate("product")
    .exec((error, allReviews) => {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
			// Here we are requesting all the products to add into the context
      Product.find({}, (error, allProducts) => {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }

        const context = { reviews: allReviews, products: allProducts };
        return res.render("reviews/index", context);
      });
    });
});

router.post("/", function (req, res) {
  Review.create(req.body, function (error, createdReview) {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    return res.redirect("/reviews");
  });
});

/* delete */
router.delete("/:id", (req, res, next) => {
  Review.findByIdAndDelete(req.params.id, (error, deletedReview) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

  });
});


//seed data - add in own product ID
Review.deleteMany({}, function (error, deletedReviews) {
  if (error) {
    return console.log(error);
  }
  Review.insertMany(
    [
      {
        rating: 5,
        content: "Fast Delivery!",
        product: "615dd35b94a188d6897c997d",
      },
      {
        rating: 3,
        content: "Took awhile to get here, but the product is great.",
        product: "615dd35b94a188d6897c997d",
      },
      {
        rating: 4,
        content: "love the style of the products",
        product: "615dd35b94a188d6897c997d",
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
module.exports = router;