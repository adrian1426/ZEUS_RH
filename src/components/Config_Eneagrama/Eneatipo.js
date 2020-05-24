import React from 'react';
import {addEneatipos,updateEneatipos,deleteEneatipos} from '../../redux_reducers/actionCreators_Eneatipos';
import {connect} from 'react-redux';
import swal from 'sweetalert';

//inicializa un objeto para inserts
const initialStateEneatipos={
    id_test:'',
    dato_eneatipo:'',
    des_eneatipo:'',
    tipo_test:'',
    idioma:''
  };

const updateStateEneatipos={
    dato_eneatipo:'',
    des_eneatipo:'',
    _id:''
  };

const deleteStateEneatipos={
    _id:'',
    i:''
  };

var lengthEneatipo=0;
var temp_dato_eneatipo="";
var temp_des_eneatipo=""; 
//objeto presentacional
const Eneatipo = (props) => {  
    var iband=0;
    var span_activo2=document.getElementById("span_activo2");
    if(lengthEneatipo===0){
    }
    else{
     notificaciones2();
     setTimeout(function() {
       span_activo2.className="ocultar";
     }, 5000);
     if(iband===0){
        document.getElementById("banderaCompletado").value="2";
        iband++;
     }
    }

    
    return(   
        <div className="row">

            <div className="col s12">
            <a className="btn estilo-btn-form" id="btnAddFila" onClick={addFilaEneatipo} href="#!">
            <i className="material-icons left">add</i>Agregar fila eneatipo</a>
            </div>
               {
                   /* se mapea los eneatipos existentes y se renderiza */
                   props.eneatipos.map((eneatipo,i)=>
                    <div className="col s12 div-datos-eneatipos" key={i}>

                    <div className="input-field col s2">
                         <input name="dato_eneatipo" id={"dato_eneatipo"+i} type="text" className="validate" disabled defaultValue={eneatipo.dato_eneatipo}/>
                    </div>
        
                    <div className="input-field col s9">
                        <input name="des_eneatipo" id={"des_eneatipo"+i} type="text" className="validate" disabled defaultValue={eneatipo.des_eneatipo}/>
                    </div> 

                    <div className="col s1 alin-btn-enea btn-CRUD">
                    <a className="waves-effect waves-light" href="#!" onClick={()=>ocultarEdit(i,"close")}><i id={"crud_close"+i} className="material-icons right i-CRUD ocultar" style={{color:'#0073b1'}}>close</i></a>
                    <a className="waves-effect waves-light" href="#!" onClick={()=>updateEneatipo(i,eneatipo._id)}><i id={"crud_check"+i} className="material-icons left i-CRUD ocultar" style={{color:'#0073b1'}}>check</i></a>
                    <a className="waves-effect waves-light" href="#!" onClick={()=>mostrarEdit(i)}><i id={"crud_edit"+i} className="material-icons left i-CRUD" style={{color:'#0073b1'}}>edit</i></a>
                    <a className="waves-effect waves-light" href="#!" onClick={()=>deleteEneatipo(i,eneatipo._id)}><i id={"crud_delete"+i} className="material-icons right i-CRUD" style={{color:'#0073b1'}}>delete</i></a>
                    </div>   
        
                    </div>
                   )
                   /* End mapeo de eneatipos */
               }

               {
               /* Eneatipos agregados manualmente */
               <div id="fila_eneatipos" className="ocultar">
                 <div className="col s12 div-datos-eneatipos">
        
                 <div className="input-field col s2">
                 <input id="dato_eneatipo" name="dato_eneatipo" placeholder="Eneatipo" type="text" className="validate"/>
                 <label htmlFor="dato_eneatipo">Eneatipo</label>
                 </div>

                 <div className="input-field col s9">
                 <input id="des_eneatipo" name="des_eneatipo" placeholder="Descripción" type="text" className="validate"/>
                 <label htmlFor="des_eneatipo">Descripción</label>
                  </div>

                 <div className="col s1 alin-btn-enea btn-CRUD">
                 <a className="waves-effect waves-light" href="#!" onClick={addEneatipo} ><i className="material-icons right i-CRUD" style={{color:'#0073b1'}}>check</i></a>
                 <a className="waves-effect waves-light" href="#!" onClick={deleteFilaEneatipo}><i className="material-icons right i-CRUD" style={{color:'#0073b1'}}>delete</i></a>
                 </div>   
    
                 </div> 
               </div>
               /* End eneatipos agregados manualmente */
               }

        </div>       
    ); 
    
function addEneatipo(){
    let dato_eneatipo_let=document.getElementById("dato_eneatipo");
    let des_eneatipo_let=document.getElementById("des_eneatipo");

    if(props.id_TestE[0]===undefined){
        swal("Información!", "por problemas de conexión a la red, no puede guardar los datos, recfrescar la página y empezar de nuevo!", "info");
    }else{

        if((props.idioma_Test===null||props.idioma_Test===undefined) || (props.tipo_de_Test===null || props.tipo_de_Test===undefined)){
            swal("Advertencia!", "Primero llene el formulario: Agregar Datos del Test!", "warning");
        }
        else if(dato_eneatipo_let.value===""||des_eneatipo_let.value===""){
            swal("Advertencia!", "Llene los campos vacíos!", "warning");
        }
        else{
            console.log("id_test: ",props.id_TestE[0]);
            initialStateEneatipos.id_test=props.id_TestE[0];
            initialStateEneatipos.dato_eneatipo=dato_eneatipo_let.value;
            initialStateEneatipos.des_eneatipo=des_eneatipo_let.value;
            initialStateEneatipos.idioma=props.idioma_Test;
            initialStateEneatipos.tipo_test=props.tipo_de_Test;
    
            lengthEneatipo=props.eneatipos.length+1;
    
            props.addEneatipos(initialStateEneatipos);
        
            dato_eneatipo_let.value="";
            des_eneatipo_let.value="";
            span_activo2.className="tooltiptext2 mostrar";
        }
    }
}

function updateEneatipo(i,_id){
    let update_dato_eneatipo=document.getElementById("dato_eneatipo"+i).value;
    let update_des_eneatipo=document.getElementById("des_eneatipo"+i).value;

    if(update_dato_eneatipo===""||update_des_eneatipo===""){
        swal("Advertencia!", "Llene los campos vacíos!", "warning");
    }
    else{
    updateStateEneatipos.dato_eneatipo=update_dato_eneatipo;
    updateStateEneatipos.des_eneatipo=update_des_eneatipo;
    updateStateEneatipos._id=_id;
    props.updateEneatipos(updateStateEneatipos);

    ocultarEdit(i);
    }
}

function deleteEneatipo(i,_id){
    console.log("i: ",i);
    console.log("_id; ",_id);
    swal({
        title: "Está seguro de eliminar eneatipo?",
        text: "Se eliminará eneatipo seleccionado!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

        deleteStateEneatipos._id=_id;
        deleteStateEneatipos.i=i;

         props.deleteEneatipos(deleteStateEneatipos);
         span_activo2.className="tooltiptext2 mostrar";
        
         ocultarEdit(i);
          
          swal("Se eliminó correctamente!", {
            icon: "success",
          });
        } else {
          swal("Operación cancelada!");
        }
      });
}

function notificaciones2(){
    var notificacion_activo2=document.getElementById("notificacion_activo2");
    var notificacion_inactivo2=document.getElementById("notificacion_inactivo2");
   
     if(props.eneatipos.length+1===(lengthEneatipo+1)){
       notificacion_activo2.className="col s2 tooltip2 mostrar";
       notificacion_inactivo2.className="ocultar";
     }
     else{
     }
     
   }
};


function addFilaEneatipo(){  
 var fila= document.getElementById("fila_eneatipos");
 var btnFila=document.getElementById("btnAddFila");

 fila.className = "mostrar";
 btnFila.setAttribute("disabled", "disabled");
}

function deleteFilaEneatipo(){
    var fila= document.getElementById("fila_eneatipos");
    var btnFila=document.getElementById("btnAddFila");

    fila.className = "ocultar";  
    btnFila.removeAttribute("disabled");

    document.getElementById("dato_eneatipo").value="";
    document.getElementById("des_eneatipo").value="";
}

function mostrarEdit(i){
  var crud_check=document.getElementById("crud_check"+i);
  var crud_close=document.getElementById("crud_close"+i);
  var crud_edit=document.getElementById("crud_edit"+i);
  var crud_delete=document.getElementById("crud_delete"+i);

  var dato_eneatipo=document.getElementById("dato_eneatipo"+i);
  var des_eneatipo=document.getElementById("des_eneatipo"+i);

  temp_dato_eneatipo=dato_eneatipo.value;
  temp_des_eneatipo=des_eneatipo.value;

  crud_edit.className="ocultar";
  crud_delete.className="ocultar";
  crud_close.className="material-icons right i-CRUD mostrar";
  crud_check.className="material-icons left i-CRUD mostrar";

  dato_eneatipo.removeAttribute("disabled");
  des_eneatipo.removeAttribute("disabled");
}

function ocultarEdit(i,tipo_ocultar){
    var crud_check=document.getElementById("crud_check"+i);
    var crud_close=document.getElementById("crud_close"+i);
    var crud_edit=document.getElementById("crud_edit"+i);
    var crud_delete=document.getElementById("crud_delete"+i);
  
    var dato_eneatipo=document.getElementById("dato_eneatipo"+i);
    var des_eneatipo=document.getElementById("des_eneatipo"+i);
  
    crud_edit.className="material-icons left i-CRUD mostrar";
    crud_delete.className="material-icons right i-CRUD mostrar";
    crud_close.className="ocultar";
    crud_check.className="ocultar";
    
    if(tipo_ocultar==="close"){
        dato_eneatipo.value=temp_dato_eneatipo;
        des_eneatipo.value=temp_des_eneatipo;
    }

    dato_eneatipo.setAttribute("disabled", "disabled");
    des_eneatipo.setAttribute("disabled", "disabled");
  }
// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
      eneatipos:state.eneatipos
    }
  };
//agrega datos y dispara evento, para posteriormente recargar el estado
  const mapDispatchToProps=dispatch=>{
    return{
        addEneatipos(initialStateEneatipos) {
        dispatch(addEneatipos(initialStateEneatipos));
    },
    updateEneatipos(updateStateEneatipo) {
        dispatch(updateEneatipos(updateStateEneatipo));
    },
    deleteEneatipos(updateStateEneatipo) {
        dispatch(deleteEneatipos(updateStateEneatipo));
    }
    }
  };

  // End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(Eneatipo);