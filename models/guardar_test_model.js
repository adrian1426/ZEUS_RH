//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const Test_PublicadoSchema=new Schema({
    id_test:{type:String,required:true},
    nombre_test:{type:String,required:true},
    fecha_guardado:{type:String,required:true},
    tipo_test:{type:String,required:true},
    idioma:{type:String,required:true},
    pais_apli:[
        {
            pais:{type:String,required:true},
            codigo:{type:String,required:true}
        }
     ],
     publicado:{type:String,required:false},
     fecha_publicado:{type:String,required:false},
     descripcion_test:{type:String,required:true}
});


module.exports=mongoose.model('Test_Publicado',Test_PublicadoSchema);