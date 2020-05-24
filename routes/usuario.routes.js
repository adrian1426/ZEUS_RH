/*
Define las operaciones a traves de las url que se define en el servidor
url para agregar tarea, url para editar, url para eliminar, etc..
*/
const express=require('express');
//devuelve un objeto para ingresar rutas
const router=express.Router();

const Usuario = require('../models/usuario_model');

//consultar
router.get('/',async (req,res)=>{
const usuarios=await Usuario.find();
res.json(usuarios);
});

//consultar por filtro usuario
router.get('/:usuario',async (req,res)=>{
    const usuarios=await Usuario.find({usuario:req.params.usuario});
    res.json(usuarios);
});

//consultar por filtro correo
router.get('/:usuario/:correo',async (req,res)=>{
    const usuarios=await Usuario.find({correo:req.params.correo});
    res.json(usuarios);
});

//insertar
router.post('/',async (req, res) => {
    const { tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete }= req.body;
    const usuarios=  new Usuario({tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete});
    await usuarios.save();
    res.json({status:'usuario registrado'});
});

//actualizar por usuario
router.put('/:usuario',async (req,res)=>{
    const {tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete}=req.body;
    const newUsuario={tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete};
    await Usuario.findOneAndUpdate({usuario:req.params.usuario},newUsuario);
    res.json({status:"usuario actualizado"});
});

//actualizar por correo
router.put('/:usuario/:correo',async (req,res)=>{
    const {tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete}=req.body;
    const newUsuario={tipo_usuario,tipo_usuario_descripcion,nombre,correo,usuario,password,rfc_idfiscal,direccion_fiscal,telefono,req_factura,estatus,fecha_registro,fecha_modificacion,sesion,suscrito,fecha_suscripcion,id_paquete,descripcion_paquete};
    await Usuario.findOneAndUpdate({correo:req.params.correo},newUsuario);
    res.json({status:"usuario actualizado"});
});


module.exports=router;