import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var id_test="";
//lee todos los eneatipos en BD
const loadPreguntas=()=>{
    return dispatch=>{
       return axios.get("/api/preguntas")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_PREGUNTAS",
                    preguntas:response.data
                }
            );
       })
    };
}

//lee todos los preguntas en BD de acuerdo a un filtro
const loadPreguntasFiltro=(id_test)=>{
    return dispatch=>{
       return axios.get(`/api/preguntas/${id_test}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_PREGUNTAS_FILTRO",
                    preguntas:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addPreguntas=Preguntas=>{
    id_test=Preguntas.id_test;

    return dispatch=>{

        return fetch('/api/preguntas',{
            method:'POST',
            body:JSON.stringify(Preguntas),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_PREGUNTAS",
                    preguntas:Preguntas
                }
            );
            swal("Éxito!", "Pregunta guardado correctamente!", "success");
            store.dispatch(loadPreguntasFiltro(id_test));
         }
         )
        .catch(err=>{
            swal("Error!", "No se guardó la información!", "error");
        });
      };
};



export {loadPreguntas,loadPreguntasFiltro,addPreguntas};