var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect(config.connection, {
    autoIndex: true
});

var connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB Connected');
});

connection.once('error', function(err) {
    console.log('MongoDB Bad Connection:');
    console.log(err);
    process.exit(0);
});