'use strict'
const express = require('express')

const mongoose = require('../mongodb/mongoose')

const app = express()
const port = process.env.PORT || 8000;

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1 
    },
    label: {
        type: String,
        default: 'Other'
    },
    status: {
        type: Boolean,
        default: null
    }
})


app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    // You'll create your note here.
    console.log(req.body)
    res.send('Connected to Server')
});

app.post('/push', (req, res) => {
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text,
        label: req.body.label,
        status: req.body.status
    })
    todo.save().then((r) => {
        res.send(r)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/getall', (req, res) => {
    Todo.find().then((r) => {
        res.send({todos})
    }).catch((e) => {
        res.status(400).send()
    })
})

app.post('/read', (req, res) => {
    
    res.send(data)
})
