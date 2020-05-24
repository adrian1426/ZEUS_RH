import React from 'react';
import  '../../styles/login.css';
import Select from 'react-select';
import ReCAPTCHA from "react-google-recaptcha";
import swal from 'sweetalert';
import {addUsuarios} from '../../redux_reducers/actionCreators_Usuarios';
import {connect} from 'react-redux';

const initialStateUsuario={
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

var valorCaptcha= "";

const NewUser = (props) =>{

    const optionsTipUsuario=[
        {value:'U1',label:'Profesional/Particular'},
        {value:'U2',label:'Corporativo/Coach'}
      ];

      //definición de fecha
    let fecha_hoy=new Date();
    let dia = fecha_hoy.getDate();
    let mes = fecha_hoy.getMonth()+1;
    let year = fecha_hoy.getFullYear();

    return(
        <div>
        
        <div className="row cabecero_registro">
        <div className="col s12" style={{textAlign:'center'}}>
        <p style={{color:'white'}}><b>REGISTRO DE USUARIO</b></p>
        </div>
        </div>
            
        <div className="row" id="registro">

            <div className="input-field col s4">
            <Select
            id="id_tipo_usuario" 
            placeholder="seleccionar tipo de usuario"
            options={optionsTipUsuario}
            onChange={eventoTipoUsuario}
            />
            </div>

            <div className="input-field col s4">
            <i className="material-icons prefix">account_box</i>
            <input id="nombreUsuario" type="text" className="validate"/>
            <label htmlFor="nombreUsuario">Nombre o Razón Social *</label>
            </div>

            <div className="input-field col s4">
            <i className="material-icons prefix">email</i>
            <input id="correo" type="text" className="validate"/>
            <label htmlFor="correo">Correo elecrónico *</label>
            </div>

            <div className="input-field col s4">
            <i className="material-icons prefix">account_circle</i>
            <input id="usuario" type="text" className="validate"/>
            <label htmlFor="usuario">Usuario *</label>
            </div>

            <div className="input-field col s4">
            <i className="material-icons prefix">https</i>
            <input id="pass1" type="password" className="validate"/>
            <label htmlFor="pass1">Contraseña *</label>
            </div>

            <div className="input-field col s4">
            <i className="material-icons prefix">https</i>
            <input id="pass2" type="password" className="validate"/>
            <label htmlFor="pass2">Repetir Contraseña *</label>
            </div>

           <div className="input-field col s12">
            <p>
            <label>
            <input id="check_politica" type="checkbox"/>
            <span>¿Acepta política de publicación de datos personales?</span>
            </label>
            </p>
           </div>

           <div className="input-field col s8">
           <ReCAPTCHA
           sitekey="6Ld-HqMUAAAAADghGH3XcRcf-TnzhjVuG27w83t-"
           onChange={onChangeCaptcha}
           />
           </div>

           <div className="input-field col s12" style={{textAlign:'Right'}}>
            <a className="btn estilo-btn-form" href="/Login" style={{marginRight:'2%'}}><i className="material-icons right">cancel</i>Cancelar</a>
            <a className="btn estilo-btn-form" href="#!" onClick={()=>registrarUsuario()}><i className="material-icons right">save</i>Registrar</a>
           </div>

        </div>

        </div>
    );

    function registrarUsuario(){
        var checkPolitica=document.getElementById("check_politica");
    
        if (checkPolitica.checked) {
            if (valorCaptcha!==""){
            initialStateUsuario.nombre= document.getElementById("nombreUsuario").value;
            initialStateUsuario.correo= document.getElementById("correo").value;
            initialStateUsuario.usuario=document.getElementById("usuario").value;
            initialStateUsuario.password=document.getElementById("pass1").value;
            initialStateUsuario.estatus="Activo";
            initialStateUsuario.fecha_registro=dia + "-" + mes + "-" + year;
            initialStateUsuario.sesion="1";
    
            props.addUsuarios(initialStateUsuario);
            }
            else{
                swal("Información!", "Por favor valida que no eres robot, selecciona Recaptcha!", "info");
            }
        } else {
            swal("Información!", "Por favor acepta las politicas de publicación de datos!", "info");
        }
    }
}

function eventoTipoUsuario(e){
    initialStateUsuario.tipo_usuario= e.value;
    initialStateUsuario.tipo_usuario_descripcion= e.label;
}

function onChangeCaptcha(value) {
    valorCaptcha= value;
}

// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
      usuarios:state.usuarios
    }
  };

//agrega datos y dispara evento, para posteriormente recargar el estado
const mapDispatchToProps=dispatch=>{
    return{
        addUsuarios(initialStateUsuario) {
        dispatch(addUsuarios(initialStateUsuario));
    }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);