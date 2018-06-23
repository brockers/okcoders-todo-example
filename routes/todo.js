var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;

db.on('error', function(msg){
    console.log("Mongoose: Unable to connec to todo database. " + msg);
});

db.once('open', function(){
    console.log("Mongoose connected to todo database.");
});

var Todo = require('../models/todo');

// Create
router.post('/add', function(req,res){
    console.log("Create a new task in todo");
});

// Read
router.get('/all', function(req, res){
    console.log("Get all our tasks from todo");
    res.json({task: "TESTING", done: false});
});

// Update
router.put('/:id', function(req,res){
    console.log("Update a task in todo");
});

// Delete
router.delete('/:id', function(req,res){
    console.log("Delete a taks in todo");
});

module.exports = router;