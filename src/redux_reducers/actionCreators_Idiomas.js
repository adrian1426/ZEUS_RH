import axios from 'axios';

//recibe la lista de usuarios ,los lee y los muestra
const loadIdiomas=()=>{
    return dispatch=>{
       return axios.get("/api/idiomas")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_IDIOMAS",
                    idiomas:response.data
                }
            );
       })
    };
}

export {loadIdiomas};