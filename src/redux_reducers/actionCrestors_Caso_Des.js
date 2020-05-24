import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var load_id_test='';
//lee todos los eneatipos en BD
const loadCaso_Desempates=()=>{
    return dispatch=>{
       return axios.get("/api/caso_desempate")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_CASO_DESEMPATES",
                    caso_desempates:response.data
                }
            );
       })
    };
};

//lee todos los eneatipos en BD de acuerdo a un filtro
const loadCasoDesFiltro=(id_test)=>{
    load_id_test=id_test;
    return dispatch=>{
       return axios.get(`/api/caso_desempate/${id_test}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_CASO_DESEMPATES_FILTRO",
                    caso_desempates:response.data
                }
            );
       })
    };
};

//recibe los datos, para agregarlo
const addCaso_Desempates=Casos=>{
    return dispatch=>{
        return fetch('/api/caso_desempate',{
            method:'POST',
            body:JSON.stringify(Casos),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_CASO_DESEMPATES",
                    caso_desempates:Casos
                }
            );
            swal("Éxito!", "Datos guardados correctamente!", "success");
            store.dispatch(loadCasoDesFiltro(Casos.id_test));
         }
         )
        .catch(err=>{
            swal("Error!", "No se guardó la información!", "error");
        });
      };
};

//recibe los datos, para actualizarlo
const updateCasoDesempates=Casos=>{
    return dispatch=>{
        return fetch(`/api/caso_desempate/${Casos._id}`,{
            method:'PUT',
            body:JSON.stringify(Casos),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"UPDATE_CASO_DESEMPATES",
                    caso_desempates:Casos
                }
            );
            swal("Éxito!", "Datos actualizados correctamente!", "success");
            store.dispatch(loadCasoDesFiltro(load_id_test));
         }
         )
        .catch(err=>{
            try{
                swal("Error!", "No se actualizó la información!", "error");
            }
            catch(err){
                console.log(err);
            }
            
        });
      };
};

//recibe el id, para eliminarlo
const deleteCasoDesempate=Casos=>{
    return dispatch=>{
        return fetch(`/api/caso_desempate/${Casos._id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"DELETE_CASO_DESEMPATES",
                    caso_desempates:Casos
                }
            );
            swal("Éxito!", "Caso de desempate eliminado correctamente!", "success");
         }
         )
        .catch(err=>{
            try{
                swal("Error!", "No se eliminó caso de desempate!", "error");
            }
            catch(err){
                console.log(err);
            }
            
        });
      };
};

export {loadCaso_Desempates,addCaso_Desempates,updateCasoDesempates,loadCasoDesFiltro,deleteCasoDesempate};