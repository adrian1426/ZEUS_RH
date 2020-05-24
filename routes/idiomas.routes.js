/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar tarea, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Idioma = require('../models/idiomas_model');

//consultar
router.get('/',async (req,res)=>{
const idiomas=await Idioma.find();
res.json(idiomas);
});


module.exports=router;