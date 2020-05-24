//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const UserSchema=new Schema({
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true}
});


module.exports=mongoose.model('User',UserSchema);