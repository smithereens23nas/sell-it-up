const express = require('express');
const router = express.Router();
const { Product, Review } = require("../models");

/* == Producs Routes == */

/* == index route == */
router.get('/', function (req, res) {

  Product.find({}, (error, products) => {
    if (error) return console.log(error);

    const context = {
        products,
    }

    res.render('products/index', context);
  });
});

// This is the page to our form to create a new product! :)
router.get('/new', (req, res) => { 
  res.render('new.ejs');
});

// This is the post request coming from my newForm
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
 Product.create( req.body, (error, createdProduct) => {
    if (error) return console.log(error);

    console.log(createdProduct);
  
    return res.redirect('/products');
  });
});

/* == Show == */
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    // Here we are finding all the reviews where the product is 
    //equal to the param
    Review.find({ product: req.params.id }, (error, allReviews) => {
      const context = {
        product: foundProduct,
        reviews: allReviews,
      };

      return res.render("products/show.ejs", context);
    });
  });
});

// edit route
router.get('/:productId/edit', (req, res) => {
    Product.findById(req.params.productId, (error, foundItem) => {
        if (error) return console.log(error);
    
        return res.render('edit.ejs', { product: foundItem });
    });
});

/* Update */
router.put('/:productId', (req, res) => {

  Product.findByIdAndUpdate(
      req.params.productId,
     {
       $set: req.body
     },
      {
        new: true
      },
      (error, updatedProduct) => {
          if (error) return console.log(error);
          
          return res.redirect(`/products/${updatedProduct.id}`);
      },
  );

});

/* delete */
router.delete('/:productId', (req, res) => {
   Product.findByIdAndDelete( req.params.productId, (error, deletedProduct) => {
        if (error) return console.log(error);
    
        console.log(deletedProduct);
        return res.redirect('/products');
    });
})

module.exports = router;