import axios from 'axios';

//recibe la lista de usuarios ,los lee y los muestra
const loadUsers=()=>{
    return dispatch=>{
       return axios.get("/api/users")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_USERS",
                    users:response.data
                }
            );
       })
    };
}

export {loadUsers};