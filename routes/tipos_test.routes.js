/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar tarea, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Tipos_Test = require('../models/tipo_test_model');

//consultar
router.get('/',async (req,res)=>{
const tipos_test=await Tipos_Test.find();
res.json(tipos_test);
});

//insertar
router.post('/',async (req, res) => {
    const { tipo,descripcion}= req.body;
    const tipos_test=  new Tipos_Test({tipo,descripcion});
    await tipos_test.save();
    res.json({status:'datos de tipo test guardado'});
});


module.exports=router;