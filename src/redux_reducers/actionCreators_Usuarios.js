import axios from 'axios';
import swal from 'sweetalert';
import store from './store';

var load_usuario="";

//lee todos los usuarios en BD
const loadUsuarios=()=>{
    return dispatch=>{
       return axios.get("/api/usuarios")
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_USUARIO",
                    usuarios:response.data
                }
            );
       })
    };
}

//filtro por usuario
const loadUsuariosFiltro=(usuario)=>{
    return dispatch=>{
       return axios.get(`/api/usuarios/${usuario}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_USUARIO_FILTRO",
                    usuarios:response.data
                }
            );
       })
    };
}

//filtro por correo
const loadUsuariosCorreoFiltro=(usuario,correo)=>{
    return dispatch=>{
       return axios.get(`/api/usuarios/${usuario}/${correo}`)
       .then((response)=>{
            dispatch(
                {
                    type:"LOAD_USUARIO_FILTRO",
                    usuarios:response.data
                }
            );
       })
    };
}

//recibe los datos, para agregarlo
const addUsuarios=Usuarios=>{
    load_usuario=Usuarios.usuario;
    return dispatch=>{

        return fetch('/api/usuarios',{
            method:'POST',
            body:JSON.stringify(Usuarios),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"ADD_TO_DATOS_USUARIO",
                    usuarios:Usuarios
                }
            );
            swal("Éxito!", "Usuario registrado correctamente!", "success")
               .then((value) => {
                 if(value===true){
                     //window.location.href="/";
                 }
                 else{
                   // window.location.href="/Login";
                 }
               });

            console.log("load_usuario: ",load_usuario);
            store.dispatch(loadUsuariosFiltro(load_usuario));
        }
         )
        .catch(err=>{
            swal("Error!", "No se registró el usuario!", "error");
        });
      };
};

//recibe los datos, para actualizarlo por usuario
const updateUsuarios=Usuarios=>{
    return dispatch=>{
        return fetch(`/api/usuarios/${Usuarios.usuario}`,{
            method:'PUT',
            body:JSON.stringify(Usuarios),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"UPDATE_USUARIOS",
                    usuarios:Usuarios
                }
            );
            //swal("Éxito!", "Datos actualizados correctamente!", "success");
            store.dispatch(loadUsuariosFiltro(Usuarios.usuario));
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

//recibe los datos, para actualizarlo por correo
const updateUsuariosCorreo=Usuarios=>{
    return dispatch=>{
        return fetch(`/api/usuarios/${Usuarios.usuario}/${Usuarios.correo}`,{
            method:'PUT',
            body:JSON.stringify(Usuarios),
            headers:{
                'Accept':'application/sjon',
                'Content-Type':'application/json'
            }
        })
        .then(()=>{
            dispatch(
                {
                    type:"UPDATE_USUARIOS",
                    usuarios:Usuarios
                }
            );
            //swal("Éxito!", "Datos actualizados correctamente!", "success");
            store.dispatch(loadUsuariosCorreoFiltro(Usuarios.usuario,Usuarios.correo));
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
export {loadUsuarios,loadUsuariosFiltro,loadUsuariosCorreoFiltro,addUsuarios,updateUsuarios,updateUsuariosCorreo};