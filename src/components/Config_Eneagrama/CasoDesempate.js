import React from 'react';
import {addCaso_Desempates,deleteCasoDesempate,updateCasoDesempates} from '../../redux_reducers/actionCrestors_Caso_Des';
import {connect} from 'react-redux';
import Select from 'react-select';
import swal from 'sweetalert';

const initialStateCasos={
    id_test:'',
    idioma:'',
    tipo_test:'',
    num_empates:0,
    des_empates:'',
    pregunta_des:''
}
const updateStateCasos={
    pregunta_des:'',
    _id:''
  };

const deleteStateCasos={
    _id:'',
    i:''
  };

var temp_des_CD="";
var lengthCasos=0;

const CasoDesempate=(props)=>{
    var iband3=0;
    const optionsCasosDesempate=[
        {value:'2',label:'2'},
        {value:'3',label:'3'},
        {value:'4',label:'4'},
        {value:'5',label:'5'},
        {value:'6',label:'6'},
        {value:'7',label:'7'},
        {value:'222',label:'mayor a 2'}
    ];

    var span_activo5=document.getElementById("span_activo5");
    if(lengthCasos===0){
    }
    else{
     notificaciones5();
     setTimeout(function() {
       span_activo5.className="ocultar";
     }, 5000);
     if(iband3===0){
        document.getElementById("banderaCompletado").value="5";
        iband3++;
     }
    }

    return(
        <div className="row">

        <div className="col s12">
        <a id="btnAddFilaCaso" className="btn estilo-btn-form" href="#!" onClick={addFilaCaso}>
        <i className="material-icons left">add</i>Agregar caso</a>
        </div>

        {
            props.caso_desempates.map((casos,i)=>
            <div className="col s12 div-datos-eneatipos" key={i}>

            <div className="input-field col s2">
            <input id={"num_caso"+i} type="text" className="validate" defaultValue={casos.des_empates} disabled/>
            </div>
   
            <div className="input-field col s9">
            <input id={"pregunta-des"+i} type="text" className="validate" defaultValue={casos.pregunta_des} disabled/>
            </div>
   
            <div className="col s1 alin-btn-enea btn-CRUD">
                <a className="waves-effect waves-light" href="#!" onClick={()=>ocultarEditC(i,"close")}><i id={"crud_closeC"+i} className="material-icons right i-CRUD ocultar" style={{color:'#0073b1'}}>close</i></a>
                <a className="waves-effect waves-light" href="#!" onClick={()=>updateCasoD(i,casos._id)}><i id={"crud_checkC"+i} className="material-icons left i-CRUD ocultar" style={{color:'#0073b1'}}>check</i></a>
                <a className="waves-effect waves-light" href="#!" onClick={()=>mostrarEditC(i)}><i id={"crud_editC"+i} className="material-icons left i-CRUD" style={{color:'#0073b1'}}>edit</i></a>
                <a className="waves-effect waves-light" href="#!" onClick={()=>deleteCasoD(i,casos._id)}><i id={"crud_deleteC"+i} className="material-icons right i-CRUD" style={{color:'#0073b1'}}>delete</i></a>
            </div>   
   
            </div>
        )
        }

        <div id="filaCaso" className="col s12 div-datos-eneatipos ocultar">

         <div className="input-field col s2">
            <Select
                id="id_numEmpates" 
                placeholder="empate"
                options={optionsCasosDesempate}
                onChange={eventoNumEmpates}
            />
         </div>

         <div className="input-field col s9">
         <input id="pregunta_caso" type="text" className="validate"/>
         <label htmlFor="pregunta_caso">Descripción de la pregunta</label>
         </div>

         <div className="col s1 alin-btn-enea btn-CRUD">
         <a className="waves-effect waves-light" href="#!" id="crud_check_C" onClick={addCaso}><i className="material-icons right i-CRUD" style={{color:'#0073b1'}}>check</i></a>
         <a className="waves-effect waves-light" href="#!" id="crud_delete_C" onClick={deleteFilaCaso}><i className="material-icons right i-CRUD" style={{color:'#0073b1'}}>delete</i></a>
        </div>  

         </div>

        </div>
    );

function addCaso(){
    initialStateCasos.id_test=props.id_TestCD[0];
    initialStateCasos.idioma=props.idiomaC;
    initialStateCasos.tipo_test=props.tipo_testC;
    initialStateCasos.pregunta_des=document.getElementById("pregunta_caso").value;

    if(initialStateCasos.idioma===undefined||initialStateCasos.tipo_test===undefined){
        swal("Advertencia!", "Primero llene el formulario: Agregar Datos del Test!", "warning");
    }
    else if(initialStateCasos.num_empates===0||initialStateCasos.pregunta_des===""){
        swal("Advertencia!", "Llene los campos vacíos!", "warning");
    }
    else{
        lengthCasos=props.caso_desempates.length+1;

        props.addCaso_Desempates(initialStateCasos);
        document.getElementById("pregunta_caso").value="";
    }
}

function updateCasoD(i,_id){
    let update_des_Caso=document.getElementById("pregunta-des"+i).value;

    if(update_des_Caso===""){
        swal("Advertencia!", "Llenar campo vacío!", "warning");
    }
    else{
    updateStateCasos.pregunta_des=update_des_Caso;
    updateStateCasos._id=_id;
    props.updateCasoDesempates(updateStateCasos);

    ocultarEditC(i);
    }
}

function deleteCasoD(i,_id){
    swal({
        title: "Está seguro de eliminar caso de desempate?",
        text: "Se eliminará caso seleccionado!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

        deleteStateCasos._id=_id;
        deleteStateCasos.i=i;

         props.deleteCasoDesempate(deleteStateCasos);
        
         ocultarEditC(i);
          
          swal("Se eliminó correctamente!", {
            icon: "success",
          });
        } else {
          swal("Operación cancelada!");
        }
      });
}

function notificaciones5(){
    var notificacion_activo5=document.getElementById("notificacion_activo5");
    var notificacion_inactivo5=document.getElementById("notificacion_inactivo5");
   
     if(props.caso_desempates.length+1===(lengthCasos+1)){
       notificacion_activo5.className="col s2 tooltip2 mostrar";
       notificacion_inactivo5.className="ocultar";
     }
     else{
     }
     
}
};

function addFilaCaso(){  
    let filaCaso= document.getElementById("filaCaso");
    let btnFilaCaso=document.getElementById("btnAddFilaCaso");
   
    filaCaso.className = "mostrar";
    btnFilaCaso.setAttribute("disabled", "disabled");
}

   function deleteFilaCaso(){
    let fila= document.getElementById("filaCaso");
    let btnFila=document.getElementById("btnAddFilaCaso");

    fila.className = "ocultar";  
    btnFila.removeAttribute("disabled");

    document.getElementById("pregunta_caso").value="";
}

function mostrarEditC(i){
    let crud_checkC=document.getElementById("crud_checkC"+i);
    let crud_closeC=document.getElementById("crud_closeC"+i);
    let crud_editC=document.getElementById("crud_editC"+i);
    let crud_deleteC=document.getElementById("crud_deleteC"+i);
  
    let des_CD=document.getElementById("pregunta-des"+i);
  
    temp_des_CD=des_CD.value;
  
    crud_editC.className="ocultar";
    crud_deleteC.className="ocultar";
    crud_closeC.className="material-icons right i-CRUD mostrar";
    crud_checkC.className="material-icons left i-CRUD mostrar";
  
    des_CD.removeAttribute("disabled");
  }

  function ocultarEditC(i,tipo_ocultar){
    let crud_checkC=document.getElementById("crud_checkC"+i);
    let crud_closeC=document.getElementById("crud_closeC"+i);
    let crud_editC=document.getElementById("crud_editC"+i);
    let crud_deleteC=document.getElementById("crud_deleteC"+i);
  
    let des_CD=document.getElementById("pregunta-des"+i);
  
    crud_editC.className="material-icons left i-CRUD mostrar";
    crud_deleteC.className="material-icons right i-CRUD mostrar";
    crud_closeC.className="ocultar";
    crud_checkC.className="ocultar";
    
    if(tipo_ocultar==="close"){
        des_CD.value=temp_des_CD;
    }

    des_CD.setAttribute("disabled", "disabled");
  }

//llena el estado de empate
function eventoNumEmpates(e){
    initialStateCasos.num_empates=e.value;
    initialStateCasos.des_empates=e.label;
}

// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
      caso_desempates:state.caso_desempates
    }
  };
//agrega datos y dispara evento, para posteriormente recargar el estado
  const mapDispatchToProps=dispatch=>{
    return{
        addCaso_Desempates(initialStateCasos) {
        dispatch(addCaso_Desempates(initialStateCasos));
    },
    updateCasoDesempates(updateStateCasos) {
        dispatch(updateCasoDesempates(updateStateCasos));
    },
    deleteCasoDesempate(deleteStateCasos) {
        dispatch(deleteCasoDesempate(deleteStateCasos));
    }
    }
  };

  // End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(CasoDesempate);
