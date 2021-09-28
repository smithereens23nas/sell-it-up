// Dependencies
const express = require('express');

// Global variables
const PORT = 4000;

const products = [
    {
        name: 'Internet Friends',
        price: 29,
        image:
        'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
    },
    {
        name: 'Angry Pants',
        price: 35,
        image:
        'https://cdn.shopify.com/s/files/1/1297/1509/products/HERO_c5b0ec76-ad06-4cc7-a165-6129e11a8ff6_x1440.jpg?v=1571274622',
    },
    {
        name: 'Dead Cool',
        price: 50,
        image:
        'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_40030160-f468-4d50-8f30-c8b9733ce84e_x1440.jpg?v=1575020412',
    },
];

const dogs = {
    dogNames: ['Fred', 'George', 'Ron', 'Harry', 'Hermione', 
    'Hagrid', 'Snape', 'Dumbledore', 'Filch', 'Malfoy', 'Crabbe', 
    'Goyle', 'McGonagall'],
    dogBreeds: ['lhasa apso', 'pug', 'rottweiler', 'german shepherd', 'pit bull', 'bulldog'],
}

// Run my express dependency
const app = express();

// Mounting of app

// Routes
app.get('/', function(req, res) {
    res.send(`
        <h1>Please choose if you're interested in buying clothing
        products or if you're more interested in puppies!</h1> <br>
        <h3>Only monsters don't love the puppies!</h3>
    `)
})

app.get('/products', (req, res) => {
    res.send(products);
})

app.get('/products/awesome', (req, res) => 
{ res.send('These are my best products!');
});

app.get('/products/:productIndex', (req, res) => { 
    res.send(products[req.params.productIndex]);
});

app.get('/dogs', (req, res) => {
    res.send(dogs);
})

app.get('/dogs/:name/:breed', (req, res) => {
    res.send(`You got a ${dogs.dogBreeds[req.params.breed]} and named it ${dogs.dogNames[req.params.name]}!`)
});

app.get('/name/:firstName', function(req, res) {
    res.send(`Your first name is ${req.params.firstName}`)
})

app.get('/users', (req, res) => {
    res.send(`Your first name is ${req.query.firstName} and your last name is ${req.query.lastName}`)
})

// My server listening for cool stuff to happen
app.listen(PORT, () => console.log(

    `Listening for client requests on port ${PORT}`

));