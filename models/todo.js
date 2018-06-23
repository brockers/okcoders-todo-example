var mongoose = require('mongoose');

var schema = mongoose.Schema({
    task: String,
    done: Boolean
});

var Todo = mongoose.model('todo', schema);

module.export = Todo;