//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const PaiseSchema=new Schema({
    pais:{type:String,required:true},
    codigo:{type:String,required:true}
});


module.exports=mongoose.model('Paise',PaiseSchema);