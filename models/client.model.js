const mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Campo requerido.']
    },
    email: {
        type: String,
        required: [true,'Campo requerido.']
    },
    password: {
        type: String,
        required: [true,'Campo requerido.']
    },
    
});


module.exports = mongoose.model('Client', clientSchema);