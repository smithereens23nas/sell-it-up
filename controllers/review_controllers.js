const express = require("express");
const router = express.Router();
const { Product, Review } = require("../models");

router.get("/", async (req, res) => {
  try {   
    const allProducts = await Product.find({});
    const allReviews = await Review.find({})
    .populate("product")
    .exec(allProducts);
    const context = { reviews: allReviews, products: allProducts };
    return res.render("reviews/index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Review.create(req.body);
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return next();
  }
});

// edit route
router.get("/:reviewId/edit", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    return res.render("reviews/edit.ejs", { review: review });
  } catch {
    if (error) return console.log(error);
  }
});

//update
router.put("/:reviewId", async (req, res) => {
  try {
    await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.redirect("/reviews");
  } catch (error) {
    return console.log(error);
  }
});

/* delete */
router.delete("/:id", async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//seed data - add in own product ID
// Review.deleteMany({}, function (error, deletedReviews) {
//   if (error) {
//     return console.log(error);
//   }
//   Review.insertMany(
//     [
//       {
//         rating: 5,
//         content: "Fast Delivery!",
//         product: "6162188c71ecd3c3bfa33a77",
//       },
//       {
//         rating: 3,
//         content: "Took awhile to get here, but the product is great.",
//         product: "6162188c71ecd3c3bfa33a77",
//       },
//       {
//         rating: 4,
//         content: "love the style of the products",
//         product: "6162188c71ecd3c3bfa33a77",
//       },
//     ],
//     function (error, createdReviews) {
//       if (error) {
//         return console.log(error);
//       }
//       console.log("=== Seed Complete ===");
//       console.log(createdReviews);
//     }
//   );
// });
module.exports = router;
