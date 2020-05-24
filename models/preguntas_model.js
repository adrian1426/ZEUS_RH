//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const PreguntasSchema=new Schema({
    id_test:{type:String,required:true},
    tipo_pregunta:[{
        tipo:{type:String,required:true},
        descripcion:{type:String,required:true}
    }],
    pregunta:{type:String,required:true},
    respuesta:[{
        des_respuesta:{type:String,required:true},
        eneatipo_respuesta:[{
            id_eneatipo:{type:String,required:true},
            descripcion:{type:String,required:true},
        }]
    }],
    tipo_test:[
        {
            tipo:{type:String,required:true},
            id_tipo:{type:String,required:true}
        }
    ],
    idioma:[
        {
            idioma:{type:String,required:true},
            codigo:{type:String,required:true}
        }
    ],
    exigencia:[
        {
            id_exigencia:{type:String,required:true},
            descripcion:{type:String,required:true},
            valor:{type:Number,required:true}
        }
    ],
    tiempo_test:[{
        id_tiempo:{type:String,required:true},
        min:{type:String,required:false},
        seg:{type:String,required:false},
        valor:{type:Number,required:false},
        descripcion:{type:String,required:true}
    }]
});


module.exports=mongoose.model('Pregunta',PreguntasSchema);