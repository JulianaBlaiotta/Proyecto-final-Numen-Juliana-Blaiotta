const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const { getuser } = require('../middleware/checkUser');



const urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = () => {

    //Insertar

    router.get('/client', clientController.home);
    router.post('/client', urlencodedParser, [
        check('username', 'El Usuario debe tener una logitud mayor a 3 caracteres')
            .exists()
            .isLength({ min: 3 }),
        check('email', 'Email no valido')
            .isEmail()
            .normalizeEmail(),
        check('password', 'La contraseña debe tener minimo 4 caracteres')
            .isLength({ min: 4 })

    ], getuser, clientController.add);

    //Buscar/ Actualizar
    router.get('/client/list', clientController.find);

    //BuscarID
    router.get('/client/:id', clientController.id);
    //
    router.post('/client/:id', urlencodedParser, [
        check('username', 'El Usuario debe tener una logitud mayor a 3 caracteres')
            .exists()
            .isLength({ min: 3 }),
        check('email', 'Email no valido')
            .isEmail()
            .normalizeEmail(),
        check('password', 'La contraseña debe tener minimo 4 caracteres')
            .isLength({ min: 4 })

    ], clientController.update);

    //Elimina
    router.get('/client/delete/:id', clientController.delete);

    //API
    router.get('/testapi', clientController.api);

    return router;
}






