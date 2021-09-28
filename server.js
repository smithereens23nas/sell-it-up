/* == External modules == */
const express = require('express');

// Global variables
const PORT = 4000;

// Run my express dependency
const app = express();

/* == Internal modules == */
const products = require('./models/product_model');


// Routes
app.get('/', function(req, res) {
    res.send(`<h1>Welcome To Sell it Up</h3>`)
})

app.get('/products', (req, res) => {
    products.find((products) => {
        res.send(products);
    });
});

app.get('/products/:id', (req, res) => { 
    products.findById(req.params.id, ( error, foundProduct ) => {
        if (error) return console.log(error);

        res.send(foundProduct);
    });
});

// My server listening for cool stuff to happen
app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));
