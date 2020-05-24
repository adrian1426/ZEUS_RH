import axios from 'axios';
import swal from 'sweetalert';


//lee todos los eneatipos en BD de acuerdo a un filtro
const loadTestPublicarFiltro=(id_test)=>{
    return dispatch=>{
       return axios.get(`/api/guardar_test/${id_test}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_TEST_PUBLICADOS_FILTRO",
                    test_publicados:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addToTestPublicar=TestPublicar=>{
    return dispatch=>{

        return fetch('/api/guardar_test',{
            method:'POST',
            body:JSON.stringify(TestPublicar),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_TEST_PUBLICADOS",
                    test_publicados:TestPublicar
                }
            );
            swal("Éxito!", "Test Guardado!", "success");
        }
       )
        .catch(err=>{
            swal("Error!",`No se guardaron los datos!, ${err} `, "error");
        });
      };
};

export {addToTestPublicar,loadTestPublicarFiltro};