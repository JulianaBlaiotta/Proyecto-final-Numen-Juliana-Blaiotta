const express = require('express');
const mongoose = require('mongoose');
const { db } = require('../models/client.model');
const {validationResult } = require('express-validator');
const Client = mongoose.model('Client');
const axios =require('axios');



///////////////////////////////////////////////////////////////////////////////////////

exports.home=(req, res) => {
    res.render('client/add')
};

////////////////////////////////////////////////////////////////////////////////////////

exports.add=(req, res)  => {
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


};


/////////////////////////////////////////////////////////////////////////////////////

exports.find=(req, res) => {
    db.collection('clients').find().toArray()
        .then(results => {
            res.render("client/list", { clients: results })
        })
        .catch(/* ... */)
};

exports.id=(req, res) => {
    Client.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("client/edit", {
                viewTitle: "Actualizar cliente",
                client: doc
            });
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////

exports.update=(req, res) => {
    const errors = validationResult(req)
    console.log(errors);
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

};

/////////////////////////////////////////////////////////////////////////////////////////

exports.delete=(req, res) => {
    Client.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/client/list');
        }
        else { console.log('Error  client delete :' + err); }
    });
};



exports.api= async (req, res, next) => {
    try {
      const respuesta = await axios.get("https://api.covidtracking.com/v1/us/daily.json" , { headers: { "Accept-Encoding": "es" } });
      res.json({status: respuesta.status, data: respuesta.data});
    }
    catch (error) {
        res.json({status: error.response.status, data:error.response.data});
        next(error)
    }
  }