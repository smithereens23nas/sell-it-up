/* == External modules == */
const express = require('express');

// Global variables
const PORT = 4000;

/* == Internal modules == */
const products = require('./models/product_model');

// Run my express dependency
const app = express();

/* == App configs == */
app.set('view engine', 'ejs');

/* == middlewares == */
app.use(express.static('public'))

// this should be near the top, above the routes
app.use(express.urlencoded({ extended: false }));

// Adding middlewear
// app.use((req, res, next) => { 
// 	// console.log('I run for all routes');    

// 	next();
// });

app.use((req, res, next) => {    
	console.log('\x1b[36m%s\x1b[0m', `[${req.url}] ${req.method} - ${new Date().toLocaleTimeString()}`);
       
	next();
});

/* == Routes == */
app.get('/', function (req, res, next ) {
    console.log('response', res);
    res.send(`<h1>Welcome To Sell it Up</h3>`)
})

/* == index route == */
app.get('/products', function (req, res) {
    products.find((products) => {

        const context = {
            products,
        }

        res.render('product/index', context);
    });
});

app.post('/products/', (req, res) => {
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
app.get('/products/new', (req, res) => { 
    res.render('new.ejs');
});

/* == Show == */
app.get('/products/:id', function (req, res, next) { 
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
