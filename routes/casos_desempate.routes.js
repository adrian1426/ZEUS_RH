/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Caso_Desempate = require('../models/casos_desempate_model');

//consultar
router.get('/',async (req,res)=>{
const caso_desempate=await Caso_Desempate.find();
res.json(caso_desempate);
});

//consultar por filtro de id_test
router.get('/:id_test',async (req,res)=>{
    const caso_desempate=await Caso_Desempate.find({id_test:req.params.id_test});
    res.json(caso_desempate);
 });

//insertar
router.post('/',async (req, res) => {
    const { id_test,idioma,tipo_test,num_empates,des_empates,pregunta_des}= req.body;
    const caso_desempate=  new Caso_Desempate({id_test,idioma,tipo_test,num_empates,des_empates,pregunta_des });
    await caso_desempate.save();
    res.json({status:'caso de desempate guardado'});
});

//actualizar
router.put('/:id',async (req,res)=>{
    const {pregunta_des}=req.body;
    const newCaso_Desempate={pregunta_des};
    await Caso_Desempate.findByIdAndUpdate(req.params.id,newCaso_Desempate);
    res.json({status:"caso de desempate actualizado"});
});

//Eliminar
router.delete('/:id',async (req,res)=>{
    await Caso_Desempate.findByIdAndRemove(req.params.id);
    res.json({status:"caso de desempate eliminado"});
    });

module.exports=router;