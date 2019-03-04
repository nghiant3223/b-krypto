const mongoose = require('mongoose');

module.exports = function () {
    mongoose.set('useCreateIndex', true);
    return mongoose.connect('mongodb://localhost/test',  { useNewUrlParser: true });
}