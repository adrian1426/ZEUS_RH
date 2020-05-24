/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar test, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Test = require('../models/test_model');

//consultar
router.get('/',async (req,res)=>{
const test=await Test.find();
res.json(test);
});

//consultar por filtro
 router.get('/:id_tipo/:codigo/:pais',async (req,res)=>{
    const test=await Test.find({"tipo_test.id_tipo":req.params.id_tipo,"idioma.codigo":req.params.codigo,
                                "pais_apli.codigo":req.params.pais});
    res.json(test);
 });

//insertar
router.post('/',async (req, res) => {
    const { tipo_test,titulo,idioma,pais_apli,exigencia,tiempo_test,condiciones_uso }= req.body;
    const test=  new Test({tipo_test,titulo,idioma,pais_apli,exigencia,tiempo_test,condiciones_uso });
    await test.save();
    res.json({status:'datos de test guardado'});
});

//actualizar
router.put('/:titulo',async (req,res)=>{
    const {tipo_test,titulo,idioma,pais_apli,exigencia,tiempo_test,condiciones_uso }=req.body;
    const newTest={tipo_test,titulo,idioma,pais_apli,exigencia,tiempo_test,condiciones_uso};
    await Test.findOneAndUpdate({titulo:req.params.titulo},newTest);
    res.json({status:"test actualizado"});
});


//Eliminar
router.delete('/:id_tipo',async (req,res)=>{
await Test.findOneAndRemove({"tipo_test.id_tipo":req.params.id_tipo});
res.json({status:"test eliminada"});
});

module.exports=router;