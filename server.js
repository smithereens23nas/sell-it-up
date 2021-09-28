/* == External modules == */
const express = require('express');

// Global variables
const PORT = 4000;

// Run my express dependency
const app = express();

/* == Internal modules == */
const products = require('./models/product_model');


/* == App configs == */
app.set('view engine', 'ejs');

/* == middlewares == */
app.use(express.static('public'))

/* == Routes == */
app.get('/', function(req, res) {
    res.send(`<h1>Welcome To Sell it Up</h3>`)
})

/* == index route == */
app.get('/products', (req, res) => {
    products.find((products) => {

        const context = {
            products,
        }

        res.render('product/index', context);
    });
});

/* == Show == */
app.get('/products/:id', (req, res, next) => { 
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

// 404
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

// My server listening for cool stuff to happen
app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));
