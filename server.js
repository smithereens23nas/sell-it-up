// Dependencies
const express = require('express');

// Global variables
const PORT = 4000;
const products = [
    'turtleneck', 'allbirds', 'necklase',
    'Something else', "Another signup"
]
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
    res.send('<h1>This is my amazing code that shows up now</h1>')
})

app.get('/dogs', (req, res) => {
    res.send(dogs);
})

app.get('/name/:firstName', function(req, res) {
    res.send(`Your first name is ${req.params.firstName}`)
})

app.get('/products/awesome', (req, res) => 
    { res.send('These are my best products!');
});

app.get('/products/:productIndex', (req, res) => { 
	res.send(products[req.params.productIndex]);
});

app.get('/dogs/:name/:breed', (req, res) => {
    res.send(`You got a ${dogs.dogBreeds[req.params.breed]} and named it ${dogs.dogNames[req.params.name]}!`)
});

app.get('/users', (req, res) => {
    res.send(`Your first name is ${req.query.firstName} and your last name is ${req.query.lastName}`)
})

// My server listening for cool stuff to happen
app.listen(PORT, () => console.log(

    `Listening for client requests on port ${PORT}`

));