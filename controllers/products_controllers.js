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

// This is the page to our form to create a new product! :)
router.get('/newForm', (req, res) => { 
    res.render('new.ejs');
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

module.exports = router