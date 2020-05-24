import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var load_id_des="";
//lee todos los eneatipos en BD
const loadDesempates=()=>{
    return dispatch=>{
       return axios.get("/api/res_desempate")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_DESEMPATES",
                    res_desempates:response.data
                }
            );
       })
    };
}

//lee todos los eneatipos en BD de acuerdo a un filtro
const loadDesempatesFiltro=(id_test)=>{
    load_id_des=id_test;
    return dispatch=>{
       return axios.get(`/api/res_desempate/${id_test}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_DESEMPATES_FILTRO",
                    res_desempates:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addDesempates=Res_Desempates=>{
    return dispatch=>{

        return fetch('/api/res_desempate',{
            method:'POST',
            body:JSON.stringify(Res_Desempates),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_DESEMPATES",
                    res_desempates:Res_Desempates
                }
            );
            swal("Éxito!", "Datos guardados correctamente!", "success");
            store.dispatch(loadDesempatesFiltro(Res_Desempates.id_test));
         }
         )
        .catch(err=>{
            swal("Error!", "No se guardó la información!", "error");
        });
      };
};

//recibe los datos, para actualizarlo
const updateDesempates=Res_Desempates=>{
    return dispatch=>{
        return fetch(`/api/res_desempate/${Res_Desempates._id}`,{
            method:'PUT',
            body:JSON.stringify(Res_Desempates),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"UPDATE_DESEMPATES",
                    res_desempates:Res_Desempates
                }
            );
            swal("Éxito!", "Datos actualizados correctamente!", "success");
            store.dispatch(loadDesempatesFiltro(load_id_des));
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


export {loadDesempates,loadDesempatesFiltro,addDesempates,updateDesempates};