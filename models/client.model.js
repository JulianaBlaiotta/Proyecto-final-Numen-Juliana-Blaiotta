const mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Campo requerido.'
    },
    email: {
        type: String,
        required:'Campo requerido.'
    },
    password: {
        type: String,
        required:'Campo requerido.'
    },
    
});


module.exports = mongoose.model('Client', clientSchema);