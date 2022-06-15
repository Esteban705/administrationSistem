
const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { validationResult } = require("express-validator");
const MesasSchema = require("../models/Mesas");

const createNewTable = async (req, res = response) => {

    const { number, id, url } = req.body;
  try {
  
    let mesa = await MesasSchema.findOne({ id });
    if(mesa){
        return res.status(400).json({
            ok: false,
            msj: 'la mesa ya existe'
        })
    }

     mesa = new MesasSchema(req.body);

        await mesa.save();

    res.status(201).json({
        ok: true,
        msg: "Mesa Registrada",
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

const tablesAvailable = async (req, res = response) => {

  try {

    const table = await MesasSchema.find()
    return res.json({ status: 200, data: table });

  } catch (error) {
    return res.status(400).json({
      ok: false,
      errors: "error",
    });
  }
}

const deleteTable = async (req, res = response) => {

  
  try {

    const { id } = req.body;

    const tableID = id;

   const deleteTables = await MesasSchema.deleteOne({id : tableID});

  

    if(deleteTables.deletedCount === 0){
      return res.json({ status: 400, msj: 'no se encuentra la tabla' });
    }


    return res.json({ status: 200, data: deleteTables, msg: 'eliminada con exíto' });

  } catch (error) {
    return res.status(400).json({
      ok: false,
      errors: error,
    });
  }

}

const getTable = async (req, res = response) => {

  const {id} = req.body

  console.log(id)
  try {

    const table = await MesasSchema.find({id:id})
    return res.json({ status: 200, data: table });

  } catch (error) {
    return res.status(400).json({
      ok: false,
      errors: "error",
    });
  }
}





module.exports = {
  createNewTable,
  tablesAvailable,
  deleteTable,
  getTable
};
