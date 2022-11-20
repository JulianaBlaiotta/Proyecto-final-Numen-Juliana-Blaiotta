const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { db } = require('../models/client.model');
const Client = mongoose.model('Client');



const urlencodedParser = bodyParser.urlencoded({ extended: false });

///////////////////////////////////////////////////////////////////////////////////////

router.get('/client', (req, res) => {
    res.render('client/add')
})


////////////////////////////////////////////////////////////////////////////////////////

router.post('/client', urlencodedParser, [
    check('username', 'El usuario debe contener al menos 3 caracteres')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email no válido')
        .isEmail()
        .normalizeEmail(),
    check('password', 'La contraseña debe tener mínimo 4 caracteres')
        .isLength({ min: 4 })

], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //
        const alert = errors.array()
        res.render('client/add', {
            alert
        })
    }
    else
        var client = new Client();
    client.username = req.body.username;
    client.email = req.body.email;
    client.password = req.body.password;
    client.save((err, doc) => {
        if (!err)
            res.redirect('client/list');
    });


})

/////////////////////////////////////////////////////////////////////////////////////

router.get('/client/list', (req, res) => {
    db.collection('clients').find().toArray()
        .then(results => {
            res.render("client/list", { clients: results })
        })
        .catch(/* ... */)
});

router.get('/client/:id', (req, res) => {
    Client.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("client/edit", {
                viewTitle: "Actualizar cliente",
                client: doc
            });
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////

router.post('/client/:id', urlencodedParser, [
    check('username', 'El usuario debe contener al menos 3 caracteres')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email no valido')
        .isEmail()
        .normalizeEmail(),
    check('password', 'La contraseña debe tener mínimo 4 caracteres')
        .isLength({ min: 4 })

], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //
        const alert = errors.array()
        res.render('client/edit', {
            alert, client: req.body
        })
    }
    else
        Client.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('list'); }
        });

})

/////////////////////////////////////////////////////////////////////////////////////////

router.get('/client/delete/:id', (req, res) => {
    Client.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/client/list');
        }
        else { console.log('Error  client delete :' + err); }
    });
});









module.exports = router;




