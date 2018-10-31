
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
//   we're connected!
console.log('connection-success')
});
module.exports = connection