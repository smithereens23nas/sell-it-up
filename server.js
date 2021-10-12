/* == External modules == */
const express = require('express');
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Global variables
const controllers = require("./controllers");
const PORT = 4000;

// Run my express dependency
const app = express();

/* == App configs == */
app.set('view engine', 'ejs');

/* == middlewares == */
app.use(express.static('public'))

app.use(
    session(
        {
        // where to store the sessions in mongodb
        store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sellituptwo" }),

        // secret key is used to sign every cookie to say its is valid
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        // configure the experation of the cookie
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
        }
    )
);

/* = this should be near the top, above the routes == */
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

/* == use controllers == */
app.use("/products", controllers.product);
app.use("/", controllers.user)

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
