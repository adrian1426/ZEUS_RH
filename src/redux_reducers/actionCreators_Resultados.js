import axios from 'axios';
import swal from 'sweetalert';

//lee todos los test en BD
const loadResultados=()=>{
    return dispatch=>{
       return axios.get("/api/resultados")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_RESULTADOS",
                    resultados:response.data
                }
            );
       })
    };
}

//lee todos los test en BD de acuerdo a un filtro
const loadResultadosFiltro=(id_test,id_user,id_asignador)=>{
    return dispatch=>{
       return axios.get(`/api/resultados/${id_test}/${id_user}/${id_asignador}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_RESULTADOS_FILTRO",
                    resultados:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addResultados=Resultado=>{
    return dispatch=>{

        return fetch('/api/resultados',{
            method:'POST',
            body:JSON.stringify(Resultado),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_RESULTADOS",
                    tests:Resultado
                }
            );
            swal("Éxito!", "Test completado correctamente!", "success");
        }
       )
        .catch(err=>{
            swal("Error!",`No se guardó el test!, ${err} `, "error");
        });
      };
};

export {loadResultados,loadResultadosFiltro,addResultados};