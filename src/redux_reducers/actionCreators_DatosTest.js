import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var paisAp="";
//lee todos los test en BD
const loadTest=()=>{
    return dispatch=>{
       return axios.get("/api/test")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_TEST",
                    tests:response.data
                }
            );
       })
    };
}

//lee todos los test en BD de acuerdo a un filtro
const loadTestFiltro=(tipo_test,idioma,pais)=>{
    return dispatch=>{
       return axios.get(`/api/test/${tipo_test}/${idioma}/${pais}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_TEST_FILTRO",
                    tests:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addToDatosTest=DatosTest=>{
    paisAp=DatosTest.pais_apli[0].codigo;
    return dispatch=>{

        return fetch('/api/test',{
            method:'POST',
            body:JSON.stringify(DatosTest),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_TO_DATOS_TEST",
                    tests:DatosTest
                }
            );
            swal("Éxito!", "Datos guardados correctamente!", "success");
            store.dispatch(loadTestFiltro(DatosTest.tipo_test.id_tipo,DatosTest.idioma.codigo,paisAp));
        }
       )
        .catch(err=>{
            swal("Error!",`No se guardaron los datos!, ${err} `, "error");
        });
      };
};

export {loadTest,loadTestFiltro,addToDatosTest};