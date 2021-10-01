const express = require('express');
const router = express.Router();

const db = require('../models');

/* == Producs Routes == */

/* == index route == */
router.get('/', function (req, res) {

  db.Product.find({}, (error, products) => {
    if (error) return console.log(error);

    const context = {
        products,
    }

    res.render('product/index', context);
  });
});

// This is the page to our form to create a new product! :)
router.get('/new', (req, res) => { 
  res.render('new.ejs');
});

// This is the post request coming from my newForm
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
 db.Product.create( req.body, (error, createdProduct) => {
    if (error) return console.log(error);

    console.log(createdProduct);
  
    return res.redirect('/products');
  });
});

/* == Show == */
router.get('/:id', function (req, res, next) { 
    db.Product.findById( req.params.id, ( error, foundProduct ) => {
        if (error) {
            console.log(error)
            req.error = error
            return next()
        };

        const context = {
            product: foundProduct,
        }

        res.render('product/show', context);
    });
});

// edit route
// this route will catch GET requests to /products/id/edit
// and respond by rendering a form together with a product object

router.get('/:productId/edit', (req, res) => {
    db.Product.findById(req.params.productId, (error, foundItem) => {
        if (error) return console.log(error);
    
        return res.render('edit.ejs', { product: foundItem });
    });
});

/* Update */
router.put('/:productId', (req, res) => {

  db.Product.findByIdAndUpdate(
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
   db.Product.findByIdAndDelete( req.params.productId, (error, deletedProduct) => {
        if (error) return console.log(error);
    
        console.log(deletedProduct);
        return res.redirect('/products');
    });
})

module.exports = router