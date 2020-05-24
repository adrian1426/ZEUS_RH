/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar tarea, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const User = require('../models/users_model');

//consultar
router.get('/',async (req,res)=>{
const users=await User.find();
res.json(users);
});


module.exports=router;