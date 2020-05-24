//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const Tipos_TestSchema=new Schema({
    tipo:{type:String,required:true},
    descripcion:{type:String,required:true},
});


module.exports=mongoose.model('Tipos_Test',Tipos_TestSchema);