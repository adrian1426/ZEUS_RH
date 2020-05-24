/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Preguntas = require('../models/preguntas_model');

//consultar
router.get('/',async (req,res)=>{
const preguntas=await Preguntas.find();
res.json(preguntas);
});

//consultar por filtro
 router.get('/:id_test',async (req,res)=>{
    const preguntas=await Preguntas.find({id_test:req.params.id_test});
    res.json(preguntas);
 });

//insertar
router.post('/',async (req, res) => {
    const { id_test,tipo_pregunta,pregunta,respuesta,tipo_test,idioma,exigencia,tiempo_test}= req.body;
    const preguntas=  new Preguntas({id_test,tipo_pregunta,pregunta,respuesta,tipo_test,idioma,exigencia,tiempo_test});
    await preguntas.save();
    res.json({status:'pregunta guardado'});
});

//actualizar
router.put('/:id',async (req,res)=>{
    const {tipo_pregunta,des_pregunta,respuesta,tipo_test,idioma,exigencia,tiempo_test }=req.body;
    const newPreguntas={tipo_pregunta,des_pregunta,respuesta,tipo_test,idioma,exigencia,tiempo_test};
    await Preguntas.findOneAndUpdate({id:req.params.id},newPreguntas);
    res.json({status:"pregunta actualizado"});
});


//Eliminar
router.delete('/:id',async (req,res)=>{
await Preguntas.findOneAndRemove({id:req.params.id});
res.json({status:"pregunta eliminada"});
});

module.exports=router;