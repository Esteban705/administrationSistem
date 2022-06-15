const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, revalidarToken, loginUsuario } = require("../controllers/auth");
const validations = require("../middlewares/validarCampos");
const router = Router();


router.post('/new',
[
    check('name', 'el nombre es obligatorio perro').not().isEmpty(),
    check('email', 'el email es obligatorio perro').isEmail(),
    check('password', 'el password es obligatorio perro').isLength({min: 6}),
    validations
],
crearUsuario);

 router.post(
     '/',
    [
        check('email', 'el email es obligatorio perro').isEmail(),
        check('password', 'el password es obligatorio perro').isLength({min: 6}),
        validations
    ],
    loginUsuario);


    module.exports = router;