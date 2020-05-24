import React from 'react';
import {addDesempates,updateDesempates} from '../../redux_reducers/actionCreators_Desempate';
import {connect} from 'react-redux';
import swal from 'sweetalert';

const initialStateDesempate={
    id_test:'',
    tipo_test:'',
    idioma:'',
    id_eneatipo:'',
    eneatipo:'',
    des_respuesta:''
};
const updateStateDesempates={
    des_respuesta:'',
    _id:''
  };

var temp_des_res=""; 
const PreguntasDesempate=(props)=>{

    var span_activo4=document.getElementById("span_activo4");
    if(props.res_desempates.length>0){
        if(props.eneatipos.length===props.res_desempates.length){
            document.getElementById("banderaCompletado").value="4";
            notificaciones4();
            setTimeout(function() {
            span_activo4.className="ocultar";
          }, 5000);
        }
    }

    return(
    <div >
        <div className="div-datos-test">

        <ul className="collection with-header">
        <li className="collection-header"><h6>Enunciado de desempate para cada eneatipo</h6></li>
        {
            //descripción agregada       
            props.res_desempates.map((desempate,i)=>  
                <li className="collection-item" key={i}>{desempate.eneatipo}
                <div className="row">

                <div className="input-field col s11">
                <input id={"respuestaAgregado"+i} type="text" className="validate" defaultValue={desempate.des_respuesta} disabled/>
                </div>

                <div className="col s1 alin-btn-enea btn-CRUD">
                    <a className="waves-effect waves-light" href="#!" onClick={()=>ocultarEditDes(i,"close")}><i id={"crud_closeDes"+i} className="material-icons right i-CRUD ocultar" style={{color:'#0073b1'}}>close</i></a>
                    <a className="waves-effect waves-light" href="#!" onClick={()=>updateResDes(i,desempate._id)}><i id={"crud_checkDes"+i} className="material-icons left i-CRUD ocultar" style={{color:'#0073b1'}}>check</i></a>
                    <a className="waves-effect waves-light" href="#!" onClick={()=>mostrarEditDes(i)}><i id={"crud_editDes"+i} className="material-icons right i-CRUD" style={{color:'#0073b1'}}>edit</i></a>
                </div>     

                </div>
                </li> 
              )
            //End descripción agregada
        }
        {
            //descripción por agregar        
            props.eneatipos.map((eneatipo,i)=>  
                <li id={"lifila"+i} className="collection-item" key={i}>{eneatipo.dato_eneatipo}
                <div className="row">
                
                <div className="input-field col s11">
                <input id={"respuestaM-des1"+i} type="text" className="validate"/>
                <label htmlFor={"respuestaM-des1"+i}>Agregar Enunciado</label>
                </div>

                <div className="col s1 alin-btn-enea btn-CRUD">
                 <a className="waves-effect waves-light" href="#!" onClick={()=>addDesempate(i,eneatipo._id,eneatipo.dato_eneatipo)} ><i className="material-icons right i-CRUD" style={{color:'#0073b1'}}>check</i></a>
                </div>   

                </div>
                </li> 
              )
            //End descripción por agregar
        }
        </ul>

        </div>
    </div>
    );

function addDesempate(i,id_eneatipo,eneatipo){
   let fila=document.getElementById("lifila"+i);

    initialStateDesempate.id_test=props.id_TestPD[0];
    initialStateDesempate.tipo_test=props.tipo_testD;
    initialStateDesempate.idioma=props.idiomaD;
    initialStateDesempate.id_eneatipo=id_eneatipo;
    initialStateDesempate.eneatipo=eneatipo;
    initialStateDesempate.des_respuesta=document.getElementById("respuestaM-des1"+i).value;

    if(initialStateDesempate.des_respuesta===undefined||initialStateDesempate.des_respuesta===""){
        swal("Advertencia!", "Favor de agregar la descripción!", "warning");
    }
    else{
        props.addDesempates(initialStateDesempate);

        fila.className="ocultar";
    }
}

function updateResDes(i,_id){
    let update_des_res=document.getElementById("respuestaAgregado"+i).value;

    if(update_des_res===""){
        swal("Advertencia!", "Favor de agregar la descripción!", "warning");
    }
    else{
    updateStateDesempates.des_respuesta=update_des_res;
    updateStateDesempates._id=_id;

    props.updateDesempates(updateStateDesempates);
    ocultarEditDes(i);
    }
}
};

function notificaciones4(){
    var notificacion_activo4=document.getElementById("notificacion_activo4");
    var notificacion_inactivo4=document.getElementById("notificacion_inactivo4");
   
    notificacion_activo4.className="col s2 tooltip2 mostrar";
    notificacion_inactivo4.className="ocultar";   
}
function mostrarEditDes(i){
    let crud_checkDes=document.getElementById("crud_checkDes"+i);
    let crud_closeDes=document.getElementById("crud_closeDes"+i);
    let crud_editDes=document.getElementById("crud_editDes"+i);
  
    let res_des=document.getElementById("respuestaAgregado"+i);
  
    temp_des_res=res_des.value;
  
    crud_editDes.className="ocultar";
    crud_closeDes.className="material-icons right i-CRUD mostrar";
    crud_checkDes.className="material-icons left i-CRUD mostrar";
  
    res_des.removeAttribute("disabled");
  }
  
  function ocultarEditDes(i,tipo_ocultar){
      let crud_checkDes2=document.getElementById("crud_checkDes"+i);
      let crud_closeDes2=document.getElementById("crud_closeDes"+i);
      let crud_editDes2=document.getElementById("crud_editDes"+i);

      let des_res2=document.getElementById("respuestaAgregado"+i);
    
      crud_editDes2.className="material-icons right i-CRUD mostrar";
      crud_closeDes2.className="ocultar";
      crud_checkDes2.className="ocultar";
      
      if(tipo_ocultar==="close"){
          des_res2.value=temp_des_res;
      }
  
      des_res2.setAttribute("disabled", "disabled");
    }
  
// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
      eneatipos:state.eneatipos,
      res_desempates:state.res_desempates
    }
  };
//agrega datos y dispara evento, para posteriormente recargar el estado
  const mapDispatchToProps=dispatch=>{
    return{
        addDesempates(initialStateDesempate) {
        dispatch(addDesempates(initialStateDesempate)); 
    },
    updateDesempates(updateStateDesempates) {
        dispatch(updateDesempates(updateStateDesempates));
    }
  };
}

  // End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(PreguntasDesempate);