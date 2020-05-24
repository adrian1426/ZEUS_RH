//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const Res_DesempateSchema=new Schema({
    id_test:{type:String,required:true},
    tipo_test:{type:String,required:true},
    idioma:{type:String,required:true},
    id_eneatipo:{type:String,required:true},
    eneatipo:{type:String,required:true},
    des_respuesta:{type:String,required:true}
});


module.exports=mongoose.model('Res_Desempate',Res_DesempateSchema);