/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Test_Publicado = require('../models/guardar_test_model');

//consultar por filtro de id_test
router.get('/:id_test',async (req,res)=>{
    const test_publicado=await Test_Publicado.find({id_test:req.params.id_test});
    res.json(test_publicado);
 });

//insertar
router.post('/',async (req, res) => {
    const { id_test,nombre_test,fecha_guardado,tipo_test,idioma,pais_apli,publicado,fecha_publicado,descripcion_test }= req.body;
    const test_publicado=  new Test_Publicado({id_test,nombre_test,fecha_guardado,tipo_test,idioma,pais_apli,publicado,fecha_publicado,descripcion_test});
    await test_publicado.save();
    res.json({status:'test guardado'});
});

module.exports=router;