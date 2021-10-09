const express = require("express");
const router = express.Router();
const { Product, Review } = require("../models");

/* == Products Routes == */

/* == index route == */
router.get("/", async function (req, res) {
  try {
    const products = await Product.find({});

    const context = {
      products,
    };

    res.render("products/index", context);
  } catch (error) {
    return console.log(error);
  }
});

// This is the page to our form to create a new product! :)
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// This is the post request coming from my newForm
router.post("/", async function (req, res) {
  try {
    await Product.create(req.body);

    return res.redirect("/products");
  } catch (error) {
    return console.log(error);
  }                     
});

/* == Show == */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const allReviews = await Review.find({ product: req.params.id });
    const context = {
      product: product,          
      reviews: allReviews,
    };
    return res.render("products/show.ejs", context);
  } catch {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
  }
});

// edit route
router.get("/:productId/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    return res.render("edit.ejs", { product: product });
  } catch {
    if (error) return console.log(error);
  }
});

/* Update */
router.put("/:productId", async (req, res) => {
  try {
   await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      {
        new: true,
      });
    return res.redirect(`/products/${req.params.productId}`);
  }
  catch (error){
   return console.log(error);

    }

});

/* delete */
router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    Review.deleteMany({ product: req.params.id }, (error, deletedReviews) => {
      return res.redirect("/products");
    });
  });
});

module.exports = router;
