const express = require('express');
const router = express.Router();

const products = require('../models/product_model');

/* == Producs Routes == */

/* == index route == */
router.get('/', function (req, res) {
    products.find((products) => {

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
    products.create(req.body, (error, createdProduct) => {
        if (error) return console.log(error);

        console.log(createdProduct);
      // redirect the user to the index route
      // since the index route is listening for GET requests
      // with a URL path of '/products', we just need to include
      // the URL path as the argument since the .redirect() method
      // has a default HTTP verb of GET.
        return res.redirect('/products');
    });
});

/* == Show == */
router.get('/:id', function (req, res, next) { 
    products.findById(req.params.id, ( error, foundProduct ) => {
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
    products.findById(req.params.productId, (error, foundItem) => {
        if (error) return console.log(error);
    
        return res.render('edit.ejs', { product: foundItem });
    });
});

router.put('/:productId', (req, res) => {
    products.findByIdAndUpdate(
        req.params.productId,
        req.body,
        (error, updatedProduct) => {
            if (error) return console.log(error);
            
            return res.redirect(`/products/${updatedProduct.id}`);
        },
    );
});

// delete route// this route will catch DELETE requests to /products/anyValue
// and, after deleting data, respond by redirecting
// the user to the index route
router.delete('/:productId', (req, res) => {
    products.findByIdAndDelete( req.params.productId, (error, deletedProduct) => {
        if (error) return console.log(error);
    
        console.log(deletedProduct);
        return res.redirect('/products');
    });
})

module.exports = router