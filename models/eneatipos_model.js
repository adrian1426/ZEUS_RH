//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const EneatipoSchema=new Schema({
    id_test:{type:String,required:true},
    dato_eneatipo:{type:String,required:true},
    des_eneatipo:{type:String,required:true},
    idioma:{type:String,required:true},
    tipo_test:{type:String,required:true}
});


module.exports=mongoose.model('Eneatipo',EneatipoSchema);