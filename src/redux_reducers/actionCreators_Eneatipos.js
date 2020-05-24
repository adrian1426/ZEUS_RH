import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var load_id_test="";
//lee todos los eneatipos en BD
const loadEneatipos=()=>{
    return dispatch=>{
       return axios.get("/api/eneatipos")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_ENEATIPOS",
                    eneatipos:response.data
                }
            );
       })
    };
}

//lee todos los eneatipos en BD de acuerdo a un filtro
const loadEneatiposFiltro=(id_test)=>{
    load_id_test=id_test;
    return dispatch=>{
       return axios.get(`/api/eneatipos/${id_test}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_ENEATIPOS_FILTRO",
                    eneatipos:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addEneatipos=Eneatipos=>{
    return dispatch=>{

        return fetch('/api/eneatipos',{
            method:'POST',
            body:JSON.stringify(Eneatipos),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_ENEATIPOS",
                    eneatipos:Eneatipos
                }
            );
            swal("Éxito!", "Datos guardados correctamente!", "success");
            store.dispatch(loadEneatiposFiltro(Eneatipos.id_test));
         }
         )
        .catch(err=>{
            swal("Error!", "No se guardó la información!", "error");
        });
      };
};

//recibe los datos, para actualizarlo
const updateEneatipos=Eneatipos=>{
    return dispatch=>{
        return fetch(`/api/eneatipos/${Eneatipos._id}`,{
            method:'PUT',
            body:JSON.stringify(Eneatipos),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"UPDATE_ENEATIPOS",
                    eneatipos:Eneatipos
                }
            );
            swal("Éxito!", "Datos actualizados correctamente!", "success");
            store.dispatch(loadEneatiposFiltro(load_id_test));
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
const deleteEneatipos=Eneatipos=>{
    return dispatch=>{
        return fetch(`/api/eneatipos/${Eneatipos._id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"DELETE_ENEATIPOS",
                    eneatipos:Eneatipos
                }
            );
            swal("Éxito!", "Eneatipo eliminado correctamente!", "success");
         }
         )
        .catch(err=>{
            try{
                swal("Error!", "No se eliminó el eneatipo!", "error");
            }
            catch(err){
                console.log(err);
            }
            
        });
      };
};

export {loadEneatipos,loadEneatiposFiltro,addEneatipos,updateEneatipos,deleteEneatipos};