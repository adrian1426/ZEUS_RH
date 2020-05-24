//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const TestSchema=new Schema({
    tipo_test:[
        {
            tipo:{type:String,required:true},
            id_tipo:{type:String,required:true}
        }
    ],
    titulo:{type:String,required:true},
    idioma:[
        {
            idioma:{type:String,required:true},
            codigo:{type:String,required:true}
        }
    ],
    pais_apli:[
        {
            pais:{type:String,required:true},
            codigo:{type:String,required:true}
        }
     ],
    exigencia:[
        {
            id_exigencia:{type:String,required:true},
            descripcion:{type:String,required:true}
        }
    ],
    tiempo_test:[{
        id_tiempo:{type:String,required:true},
        min:{type:String,required:false},
        seg:{type:String,required:false},
        descripcion:{type:String,required:true}
    }],
    condiciones_uso:{type:String,required:true}
});


module.exports=mongoose.model('Test',TestSchema);