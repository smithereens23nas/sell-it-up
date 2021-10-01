/* == External modules == */
const express = require('express');
const methodOverride = require('method-override');
// Global variables
const PORT = 4000;

// Run my express dependency
const app = express();

const productsCtrls = require('./controllers/products_controllers');

/* == App configs == */
app.set('view engine', 'ejs');

/* == middlewares == */
app.use(express.static('public'))

// this should be near the top, above the routes
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
app.use('/products', productsCtrls);

// Adding middlewear
// app.use((req, res, next) => { 
// 	// console.log('I run for all routes');    

// 	next();
// });

app.use((req, res, next) => {    
	console.log('\x1b[36m%s\x1b[0m', `[${req.url}] ${req.method} - ${new Date().toLocaleTimeString()}`);

	next();
});

// /* == Routes == */
app.get('/', function (req, res, next ) {
    console.log('response', res);
    res.send(`<h1>Welcome To Sell it Up</h3>`)
})

// /* == index route == */
// app.get('/products', function (req, res) {
//     products.find((products) => {

//         const context = {
//             products,
//         }

//         res.render('product/index', context);
//     });
// });

// 404
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

// My server listening for cool stuff to happen
app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));
