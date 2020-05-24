/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Res_Desempate = require('../models/res_desempate_model');

//consultar
router.get('/',async (req,res)=>{
const res_desempate=await Res_Desempate.find();
res.json(res_desempate);
});

//consultar por filtro
router.get('/:id_test',async (req,res)=>{
    const res_desempate=await Res_Desempate.find({id_test:req.params.id_test});
    res.json(res_desempate);
 });

//insertar
router.post('/',async (req, res) => {
    const { id_test,tipo_test,idioma,id_eneatipo,eneatipo,des_respuesta}= req.body;
    const res_desempate=  new Res_Desempate({id_test,tipo_test,idioma,id_eneatipo,eneatipo,des_respuesta});
    await res_desempate.save();
    res.json({status:'respuesta de desempate guardado'});
});

//actualizar
router.put('/:id',async (req,res)=>{
    const {des_respuesta}=req.body;
    const newResDesempate={des_respuesta};
    await Res_Desempate.findByIdAndUpdate(req.params.id,newResDesempate);
    res.json({status:"respuesta de desempate actualizado"});
});

module.exports=router;