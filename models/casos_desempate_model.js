//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const Caso_Desempate_Schema=new Schema({
    id_test:{type:String,required:true},
    idioma:{type:String,required:true},
    tipo_test:{type:String,required:true},
    num_empates:{type:Number,required:true},
    des_empates:{type:String,required:true},
    pregunta_des:{type:String,required:true},
});


module.exports=mongoose.model('Caso_Desempate',Caso_Desempate_Schema);