/* == External modules == */
const express = require('express');
const methodOverride = require('method-override');
// Global variables
const PORT = 4000;
const controllers = require("./controllers");

// Run my express dependency
const app = express();

/* == App configs == */
app.set('view engine', 'ejs');

/* == middlewares == */
app.use(express.static('public'))

/* = this should be near the top, above the routes == */
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


/* == logger == */
app.use((req, res, next) => {    
    console.log(`[${req.url}] ${req.method} - ${new Date().toLocaleTimeString()}`);
	next();
});

/* == Routes == */
app.get('/', function (req, res) {
    res.redirect('/products');
});

/* == use controllers == */
app.use("/products", controllers.product);


/* == 404 == */
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

/* == My server listening for cool stuff to happen == */
app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT}`));
