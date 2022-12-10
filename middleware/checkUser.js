const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const { validationResult } = require('express-validator');

const getuser = async (req, res, next) => {
    const user = await Client.findOne({ username: req.body.username, email: req.body.email, password: req.body.password })
    if (user !== null) {
            const alert = [{msg:"El Usuario ya existe"}];
            res.render('client/add', {
                alert
            })
       

    }
    else {
        next();
    }
};



module.exports = { getuser }