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
    var task = new Todo(req.body);
    task.save(function(err,results){
        if(err){
            console.log("Error saving new todo " + req.body);
            res.status(404);
        } else {
            res.status(201).json({status:"Task Added"});
        }
    });
});

// Read
router.get('/all', function(req, res){
    Todo.find({}).exec(function(err,tasks){
        if(err){
            console.log("Error getting tasks from todo database");
            res.status(404);
        } else {
            res.json(tasks);
        }
    });
});

// Finish task
router.put('/complete/:id', function(req,res){
    Todo.updateOne( {_id: req.params.id}, {done: true},  function(err, tsk){
        if(err){
            console.log("Unable to make update to " + req.params.id);
            res.status(404);
        } else {
            res.json({status:"Task " + req.params.id +" marked complete"});
        }
    });
});

// Update
router.put('/:id', function(req, res){
    // Double check req.body matches what we want.
    Todo.updateOne( {_id: req.params.id}, req.body, function(err, tsk){
        if(err){
            console.log("Unable to make update to " + req.params.id);
            console.log("JSON Body: " + req.body);
            res.status(404);
        } else {
            res.json({status:"SUCCESS", message: tsk});
        }
    });
});

// Delete
router.delete('/:id', function(req,res){
    Todo.deleteOne({ _id: req.params.id }, function(err){
        if(err){
            console.log("Unable to delete from todo " + req.params.id);
            res.status(404);
        } else {
            res.json({status:"SUCCESS"});
        }
    });
});

module.exports = router;