import React from 'react';
import ico_facebook from '../../images/facebook.png';
import ico_google from '../../images/google.png';
import ico_linkedin from '../../images/linkedin.png';
import ico_instagram from '../../images/instagram.png';
import  '../../styles/login.css';
import NewUser from './NewUser';
import {loadUsuarios,updateUsuarios} from '../../redux_reducers/actionCreators_Usuarios';
import {connect} from 'react-redux';
import store from '../../redux_reducers/store';
import swal from 'sweetalert';

//extrae la lista de usuarios en BD
store.dispatch(loadUsuarios());
//indicador de crear cuenta
var registro=0;
//indicador de usuario encontrado
var usuEncontrado=0;
//posicion de arreglo usuario encontrado
var posicionArrUsuario=0;

//variable para almacenar datos de actualización 
const updateStateUsuario={
    tipo_usuario:'',
    tipo_usuario_descripcion:'',
    nombre:'',
    correo:'',
    usuario:'',
    password:'',
    rfc_idfiscal:'',
    direccion_fiscal:'',
    telefono:'',
    req_factura:'',
    estatus:'',
    fecha_registro:'',
    fecha_modificacion:'',
    sesion:'',
    suscrito:'',
    fecha_suscripcion:'',
    id_paquete:'',
    descripcion_paquete:''
};

const Login = (props) => {

    if (registro===0){
        return(
            <div>
        
                <div className="row cabecero_sesion">
                <div className="col s12" style={{textAlign:'center'}}>
                <p style={{color:'white'}}><b>INICIAR SESIÓN</b></p>
                </div>
                </div>
        
                <div className="row" id='login'>
        
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="usuarioCorreo" type="text" className="validate"/>
                  <label htmlFor="usuarioCorreo">Usuario o correo</label>
                </div>
        
                <div className="input-field col s12">
                  <i className="material-icons prefix">https</i>
                  <input id="passLogin" type="password" className="validate"/>
                  <label htmlFor="passLogin">Contraseña</label>
                </div>
        
                <div className="col s12">
                <a className="btn estilo-btn-form btn-login" onClick={()=>Ingresar()} href="#!">Ingresar</a>
                </div>
        
                <div className="col s12" style={{textAlign:'right'}}>
                <p className="recContra">¿Se te olvidó tu contraseña?</p>
                </div>
        
                <div className="col s12" style={{textAlign:'center'}}>
                <p className="or">Iniciar sesión con redes sociales</p>
                <hr/>
                </div>
        
                <div className="col s3">
                <a href="#!"><img src={ico_facebook} alt="facebook" width='65%' height='65%'/></a>
                </div>
        
                <div className="col s3">
                <a href="#!"><img src={ico_google} alt="google" width='65%' height='65%'/></a>
                </div>
        
                <div className="col s3">
                <a href="#!"><img src={ico_linkedin} alt="linkein" width='67%' height='67%'/></a>
                </div>
        
                <div className="col s3">
                <a href="#!"><img src={ico_instagram} alt="instagram" width='67%' height='67%'/></a>
                </div>
        
                <div className="col s12">
                <p className="or">¿No tienes una cuenta? <span style={{color:'#0073b1'}} onClick={()=>registrarUsuario()}>Crea tu cuenta.</span></p>
                </div>
        
                </div>

            </div>
            );
    }
    else{
        return(
         <NewUser/>
        );
    }

function Ingresar(){
    let usuario= document.getElementById("usuarioCorreo").value;
    let password = document.getElementById("passLogin").value;

    //comprobar que hay datos en BD
    if(props.usuarios.length > 0){

        usuEncontrado=0;

        //buscar usuario ingresado
        for(let usu=0;usu<props.usuarios.length;usu++){
            if (props.usuarios[usu].usuario===usuario || props.usuarios[usu].correo===usuario){
                posicionArrUsuario = usu;
                usuEncontrado = 1;
            }
        }

        //si es 1, se ecuentra el usuario
        if(usuEncontrado===0){
            swal("Información", "El usuario ingresado No existe!", "info");
        }
        else{
            if(props.usuarios[posicionArrUsuario].password===password){

                updateStateUsuario.tipo_usuario=props.usuarios[posicionArrUsuario].tipo_usuario;
                updateStateUsuario.tipo_usuario_descripcion=props.usuarios[posicionArrUsuario].tipo_usuario_descripcion;
                updateStateUsuario.nombre=props.usuarios[posicionArrUsuario].nombre;
                updateStateUsuario.correo=props.usuarios[posicionArrUsuario].correo;
                updateStateUsuario.usuario=props.usuarios[posicionArrUsuario].usuario;
                updateStateUsuario.password=props.usuarios[posicionArrUsuario].password;
                updateStateUsuario.rfc_idfiscal=props.usuarios[posicionArrUsuario].rfc_idfiscal;
                updateStateUsuario.direccion_fiscal=props.usuarios[posicionArrUsuario].direccion_fiscal;
                updateStateUsuario.telefono=props.usuarios[posicionArrUsuario].telefono;
                updateStateUsuario.req_factura=props.usuarios[posicionArrUsuario].req_factura;
                updateStateUsuario.estatus=props.usuarios[posicionArrUsuario].estatus;
                updateStateUsuario.fecha_registro=props.usuarios[posicionArrUsuario].fecha_registro;
                updateStateUsuario.fecha_modificacion=props.usuarios[posicionArrUsuario].fecha_modificacion;
                updateStateUsuario.sesion="1";
                updateStateUsuario.suscrito=props.usuarios[posicionArrUsuario].suscrito;
                updateStateUsuario.fecha_suscripcion=props.usuarios[posicionArrUsuario].fecha_suscripcion;
                updateStateUsuario.id_paquete=props.usuarios[posicionArrUsuario].id_paquete;
                updateStateUsuario.descripcion_paquete=props.usuarios[posicionArrUsuario].descripcion_paquete;
            
                props.updateUsuarios(updateStateUsuario);
            }
            else{
                swal("Error de password", "Contraseña incorrecta!", "error");
            }

        }
    }
    else{
        swal("Información", "El usuario ingresado No existe!", "info");
    }
}
};

function registrarUsuario(){
    registro=1;
    store.dispatch(loadUsuarios());
}

const mapStateToProps=state=>{
    return{
      usuarios:state.usuarios
    }
  };
  
  const mapDispatchToProps=dispatch=>{
      return{
        updateUsuarios(updateStateUsuario) {
            dispatch(updateUsuarios(updateStateUsuario));
        }
      }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
