import axios from 'axios';

//lee todos los eneatipos en BD
const loadTipos_Tests=()=>{
    return dispatch=>{
       return axios.get("/api/tipos_test")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_TIPOS_TESTS",
                    tipos_tests:response.data
                }
            );
       })
    };
}


export {loadTipos_Tests};