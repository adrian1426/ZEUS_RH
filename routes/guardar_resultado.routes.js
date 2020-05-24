/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Resultado = require('../models/guardar_resultado_model');

//consultar
router.get('/',async (req,res)=>{
const resultados=await Resultado.find();
res.json(resultados);
});

//consultar por filtro
 router.get('/:id',async (req,res)=>{
    const resultados=await Resultado.findById({id:req.params.id});
    res.json(resultados);
 });

//insertar
router.post('/',async (req, res) => {
    const {id_test,id_usuario,nombre_usuario,id_asignador,asignado_por,
        fecha_asignacion,fecha_completado,tiempo_disponible,tiempo_ocupado,
        total_preguntas,preguntas_contestadas,estatus,empates,num_empates,resultado_respuestas }= req.body;

    const resultado=  new Resultado({id_test,id_usuario,nombre_usuario,id_asignador,asignado_por,
        fecha_asignacion,fecha_completado,tiempo_disponible,tiempo_ocupado,
        total_preguntas,preguntas_contestadas,estatus,empates,num_empates,resultado_respuestas});

    await resultado.save();
    res.json({status:'resultado guardado'});
});

module.exports=router;