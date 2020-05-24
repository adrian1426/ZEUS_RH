//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const IdiomaSchema=new Schema({
    idioma:{type:String,required:true},
    codigo:{type:String,required:true}
});


module.exports=mongoose.model('Idioma',IdiomaSchema);