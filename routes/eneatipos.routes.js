/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Eneatipo = require('../models/eneatipos_model');

//consultar
router.get('/',async (req,res)=>{
const eneatipo=await Eneatipo.find();
res.json(eneatipo);
});

//consultar por filtro
 router.get('/:idioma/:tipo_test',async (req,res)=>{
    const eneatipo=await Eneatipo.find({idioma:req.params.idioma,tipo_test:req.params.tipo_test});
    res.json(eneatipo);
 });

 //consultar por filtro de id_test
 router.get('/:id_test',async (req,res)=>{
    const eneatipo=await Eneatipo.find({id_test:req.params.id_test});
    res.json(eneatipo);
 });

//insertar
router.post('/',async (req, res) => {
    const { id_test,dato_eneatipo,des_eneatipo,idioma,tipo_test}= req.body;
    const eneatipo=  new Eneatipo({id_test,dato_eneatipo,des_eneatipo,idioma,tipo_test});
    await eneatipo.save();
    res.json({status:'datos de eneatipo guardado'});
});

//actualizar
router.put('/:id',async (req,res)=>{
    const {dato_eneatipo,des_eneatipo}=req.body;
    const newEneatipo={dato_eneatipo,des_eneatipo};
    await Eneatipo.findByIdAndUpdate(req.params.id,newEneatipo);
    res.json({status:"eneatipo actualizado"});
});


//Eliminar
router.delete('/:id',async (req,res)=>{
await Eneatipo.findByIdAndRemove(req.params.id);
res.json({status:"eneatipo eliminado"});
});

module.exports=router;