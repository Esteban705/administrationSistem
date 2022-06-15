
const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuarios = require("../models/Usuarios");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
  try {
  
    let usuario = await Usuarios.findOne({ email });
    if(usuario){
        return res.status(400).json({
            ok: false,
            msj: 'usuario ya existe'
        })
    }

     usuario = new Usuarios(req.body);

     const salt = bcryptjs.genSaltSync();
    
     usuario.password = bcryptjs.hashSync( password.toString(), salt );


        await usuario.save();

    res.status(201).json({
        ok: true,
        msg: "register",
      });
      
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        ok: false,
        msg: 'errors',
      });

  }

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
        ok: false,
        errors: error.mapped(),
      });
  }

  
};



const loginUsuario = async (req, res) => {
  const { password, email } = req.body;
  let usuario = await Usuarios.findOne({ email });
 
  try {

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msj: 'password Incorrecto'
      })
    }

    res.status(201).json({
      ok: true,
      msg: "Login Exitoso",
    });


    
  } catch (error) {
    if(!usuario){
      return res.status(400).json({
        ok: false,
        msj: 'email incorrecto'
      })
    }
    console.log(error)
    return res.status(500).json({
        ok: false,
        msg: 'errors',
      });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
};
