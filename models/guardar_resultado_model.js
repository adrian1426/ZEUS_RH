//se definen la estructura de BD
const mongoose=require('mongoose');

const {Schema}=mongoose;

//es la estructura de mi coleccion
const ResultadoSchema=new Schema({
    id_test:{type:String,required:true},
    id_usuario:{type:String,required:true},
    nombre_usuario:{type:String,required:true},
    id_asignador:{type:String,required:true},
    asignado_por:{type:String,required:true},
    fecha_asignacion:{type:String,required:true},
    fecha_completado:{type:String,required:true},
    tiempo_disponible:{type:String,required:true},
    tiempo_ocupado:{type:String,required:true},
    total_preguntas:{type:Number,required:true},
    preguntas_contestadas:{type:Number,required:true},
    estatus:{type:String,required:true},
    empates:{type:String,required:false},
    num_empates:{type:String,required:false},
    resultado_respuestas:[{
        pregunta:{type:String,required:true},
        respuesta:[{
        des_respuesta:{type:String,required:true},
        eneatipo_respuesta:[{
            id_eneatipo:{type:String,required:true},
            descripcion:{type:String,required:true}
        }]
       }]
    }]
});


module.exports=mongoose.model('Resultado',ResultadoSchema);