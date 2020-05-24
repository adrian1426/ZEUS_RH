//se definen la estructura de BD
const mongoose=require('mongoose');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const {Schema}=mongoose;

//es la estructura de mi coleccion
const UsuarioSchema=new Schema({
    tipo_usuario:{type:String,required:true},
    tipo_usuario_descripcion:{type:String,required:true},
    nombre:{type:String,required:true},
    correo:{type:String,required:true},
    usuario:{type:String,required:true},
    password:{type:String,required:true},
    rfc_idfiscal:{type:String,required:false},
    direccion_fiscal:{type:String,required:false},
    telefono:{type:String,required:false},
    req_factura:{type:String,required:false},
    estatus:{type:String,required:true},
    fecha_registro:{type:String,required:true},
    fecha_modificacion:{type:String,required:false},
    sesion:{type:String,required:false},
    suscrito:{type:String,required:false},
    fecha_suscripcion:{type:String,required:false},
    id_paquete:{type:String,required:false},
    descripcion_paquete:{type:String,required:false}
});

UsuarioSchema.plugin(mongooseFieldEncryption, { fields: ["password"], secret: "Z3us.2019" });

module.exports=mongoose.model('Usuario',UsuarioSchema);