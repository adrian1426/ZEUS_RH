import axios from 'axios';

//recibe la lista de usuarios ,los lee y los muestra
const loadPaises=()=>{
    return dispatch=>{
       return axios.get("/api/paises")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_PAISES",
                    paises:response.data
                }
            );
       })
    };
}

export {loadPaises};