import React from 'react';
import '../../styles/addTest.css';
import Eneatipo from '../Config_Eneagrama/Eneatipo';
import {addToDatosTest} from '../../redux_reducers/actionCreators_DatosTest';
import {addToTestPublicar} from '../../redux_reducers/actionCreators_TestPublicados';
import {connect} from 'react-redux';
import store from '../../redux_reducers/store';
import {loadTipos_Tests} from '../../redux_reducers/actionCreators_Tipos_Tests';
import {loadIdiomas} from '../../redux_reducers/actionCreators_Idiomas';
import {loadPaises} from '../../redux_reducers/actionCreators_Paises';
import PreguntasRespuestas from '../Config_Eneagrama/Preguntas_Respuestas';
import PreguntasDesempate from './PreguntasDesempate';
import CasoDesempate from './CasoDesempate';
import {Collapsible,CollapsibleItem} from 'react-materialize'
import Select from 'react-select';
import swal from 'sweetalert';
import ReactNotification from "react-notifications-component";
import {loadTest} from '../../redux_reducers/actionCreators_DatosTest';


//carga de datos
store.dispatch(loadTest());
store.dispatch(loadTipos_Tests());
store.dispatch(loadIdiomas());
store.dispatch(loadPaises());

//estructura de estado
const initialStateTest={
  tipo_test:[
      {
          tipo:'',
          id_tipo:''
      }
  ],
  titulo:'',
  idioma:[
      {
          idioma:'',
          codigo:''
      }
  ],
  pais_apli:[
      {
          pais:'',
          codigo:''
      }
   ],
  exigencia:[
      {
          id_exigencia:'',
          descripcion:''
      }
  ],
  tiempo_test:[{
      id_tiempo:'',
      min:'',
      seg:'',
      descripcion:''
  }],
  condiciones_uso:''
};

const initialstateGuardarTest={
  id_test:'',
  nombre_test:'',
  fecha_guardado:'',
  tipo_test:'',
  idioma:'',
  pais_apli:[
      {
      pais:'',
      codigo:''
      }
  ],
  publicado:'',
  fecha_publicado:'',
  descripcion_test:''
};

// datos temporales, para ser asígnados en el estado
var valorSelect_T='';
var textSelect_T='';
var paisApli=[];

var tempPaisASave="";

// valor temporal del tamaño de datos de test
var lengthTest=0;

//banderas de duplicidad
var banderaTipoTest="0";
var banderaIdioma="0";
var banderaPais="0";
//objeto presentacional
const AddTest=(props)=>{

ReactNotification.notificationDOMRef = React.createRef();

var idTest=props.tests.map(tes=>{return (
    tes._id
)});

// Antes de Return
  //span para mostrar notificaciones de com´letado
  let span_activo1=document.getElementById("span_activo1");

 //compara tamaño del test, si es mayor muestra la noificación de completado
 if(lengthTest===0){
 }
 else{
  document.getElementById("banderaCompletado").value="1";
  notificaciones();
  setTimeout(function() {
    span_activo1.className="ocultar";
  }, 8000);
 }

 //arreglos, que serán llenados y mostrados en selects
  const optionsTT = [];
  const optionsI = [];
  const optionsP = [];
  const optionsE=[
    {value:'E1',label:'Todas son obligatorias'},
    {value:'E2',label:'Definición por pregunta'},
    {value:'E3',label:'No son obligatorias'}
  ];
  const optionsTL=[
    {value:'T1',label:'Sin tiempo límite'},
    {value:'T2',label:'Tiempo en general'},
    {value:'T3',label:'Tiempo por pregunta'}
  ];

  //llenar tipos de test
  for(var i=0; i<props.tipos_tests.length; i++){
    var objeto = {
             label: props.tipos_tests[i].tipo,
             value: props.tipos_tests[i]._id
    };
   optionsTT.push(objeto);
 } 

 //llenar idiomas
 for(var i2=0; i2<props.idiomas.length; i2++){
  var objetoI = {
           label: props.idiomas[i2].idioma,
           value: props.idiomas[i2].codigo
  };
  optionsI.push(objetoI);
 }

 //llenar paises
 for(var i3=0; i3<props.paises.length; i3++){
  var objetoP = {
           label: props.paises[i3].pais,
           value: props.paises[i3].codigo
  };
  optionsP.push(objetoP);
 }
// End antes de return

return(
<div id="body-container">
<input id="banderaCompletado" className="ocultar"></input>

<ReactNotification ref={ReactNotification.notificationDOMRef} />

<Collapsible popout defaultActiveKey={0}>
 
 {/* Agregar Datos del Test */}
  <CollapsibleItem icon='add_to_queue' header={
    <div className="row row_colapsible">
    <div className="col s10">
    Agregar Datos del Test
    </div>
     {/* estatus pendiente */}
    <div id="notificacion_inactivo" className="col s2 tooltip">
    <i className="material-icons right" style={{color:'#e53935'}}>info_outline</i>
    <span className="tooltiptext">pendiente</span>
    </div>
    {/* Estatus completado */}
    <div id="notificacion_activo" className="col s2 tooltip2 ocultar">
    <i className="material-icons right" style={{color:'#43a047'}}>notifications_active</i>
    <span id="span_activo1" className="tooltiptext2">completado</span>
    </div>

    </div>
    }>
    
      {/* Cuerpo de collapsible */}
        <div className="div-datos-test">
               <div className="row">
                   
               <div className="row">
                 <div className="input-field col s4">
                 <Select
                    id="id_tipo_test" 
                    placeholder="seleccionar tipo de test"
                    options={optionsTT}
                    onChange={eventoTipoTest}
                  />
                 </div>

                 <div className="input-field col s4">
                 <input id="titulo_test" type="text" className="validate" name="titulo"  onChange={eventoCambio}/>
                 <label htmlFor="titulo_test">Nombre del test</label>
                 </div>

                 <div className="input-field col s4">
                 <Select
                    id="id_idioma_test" 
                    placeholder="seleccionar idioma"
                    options={optionsI}
                    onChange={eventoIdioma}
                  />
                 </div>
               </div>

               <div className="row">
               <div className="input-field col s4">
                 <Select
                    isMulti
                    id="id_pais_test" 
                    placeholder="seleccionar país de aplicabilidad"
                    options={optionsP}
                    onChange={eventoPais}
                  />
                 </div>

                 <div id="exig" className="input-field col s4">
                 <Select
                    id="id_exigencia_test" 
                    placeholder="seleccionar exigencia"
                    options={optionsE}
                    onChange={addExigencia}
                  />
                 </div>

                 <div id="tiem" className="input-field col s4">
                 <Select
                    id="id_iempo_test" 
                    placeholder="seleccionar tiempo límite"
                    options={optionsTL}
                    onChange={tiempoLimite}
                  />
                 </div>
                 
                 <div id="div-tiempo-limite" className="ocultar">

                 <div className="input-field col s1">
                 <input id="lim-min" type="text" min="0" max="300" className="validate" maxLength="3" style={{marginBottom:'0px',marginTop:'0px'}}/>
                 <label htmlFor="lim-min">min</label>
                 </div>

                 <div className="input-field col s1">
                 <input id="lim-seg" type="text" min="0"  max="60" maxLength="2"  className="validate" style={{marginBottom:'0px',marginTop:'0px'}}/>
                 <label htmlFor="lim-seg">seg</label>
                 </div>

                 </div>
               </div>

                 <div className="input-field col s12">
                 <textarea id="textarea-condiciones" className="materialize-textarea validate" name="condiciones_uso"  onChange={eventoCambio}></textarea>
                 <label htmlFor="textarea-condiciones">Condiciones de uso</label>
                 </div>

                 <div className="col s12 div-btn-datos">
                   <div className="div-btn-save">
                   <a id="btnSaveDatosTest" className="btn estilo-btn-form" onClick={addDatosTest} href="#!"><i className="material-icons left">check_circle</i>Aceptar</a>
                   </div>
                 </div>

               </div>
        </div> 
      {/* End cuerpo colapsible */}

  </CollapsibleItem>
 {/* End agregar datos del test */}

{/* Agregar datos de eneatipos */}
  <CollapsibleItem icon='library_add' header={
    <div className="row row_colapsible">
    <div className="col s7">
    Agregar Datos de Eneatipos
    </div>
    <div className="col s4">Eneatipos (<b>{props.eneatipos.length}</b>)</div>
    <div className="col s1">

    <div id="notificacion_inactivo2" className="col s2 tooltip">
    <i className="material-icons right" style={{color:'#e53935'}}>info_outline</i>
    <span className="tooltiptext">pendiente</span>
    </div>

    <div id="notificacion_activo2" className="col s2 tooltip2 ocultar">
    <i className="material-icons right" style={{color:'#43a047'}}>notifications_active</i>
    <span id="span_activo2" className="tooltiptext2">completado</span>
    </div>

    </div>
    </div>
    }>

    <Eneatipo id_TestE={idTest} idioma_Test={initialStateTest.idioma.codigo} tipo_de_Test={initialStateTest.tipo_test.id_tipo}/>

  </CollapsibleItem>
{/* End agregar datos de eneatipos */}

{/* Agregar preguntas y respuestas */}
  <CollapsibleItem icon='question_answer' header={
    <div className="row row_colapsible">
    <div className="col s7">
    Agregar Preguntas y Respuestas
    </div>
    <div className="col s4">Preguntas (<b>{props.preguntas.length}</b>)</div>
    <div className="col s1">
    
    <div id="notificacion_inactivo3" className="col s2 tooltip">
    <i className="material-icons right" style={{color:'#e53935'}}>info_outline</i>
    <span className="tooltiptext">pendiente</span>
    </div>

    <div id="notificacion_activo3" className="col s2 tooltip2 ocultar">
    <i className="material-icons right" style={{color:'#43a047'}}>notifications_active</i>
    <span id="span_activo3" className="tooltiptext2">completado</span>
    </div>

    </div>
    </div>
    }>
     
    <PreguntasRespuestas id_Test={idTest} tipo_testP={initialStateTest.tipo_test} idiomaP={initialStateTest.idioma} pais_apliP={initialStateTest.pais_apli} exigenciaP={initialStateTest.exigencia} tiempo_testP={initialStateTest.tiempo_test}/>

  </CollapsibleItem>
{/* End agregar preguntas y respuestas */}

{/* Agregar enunciados de desempate */}
  <CollapsibleItem icon='note_add' header={
    <div className="row row_colapsible">
    <div className="col s11">
    Agregar Enunciados de Desempate
    </div>
    <div className="col s1">
    
    <div id="notificacion_inactivo4" className="col s2 tooltip">
    <i className="material-icons right" style={{color:'#e53935'}}>info_outline</i>
    <span className="tooltiptext">pendiente</span>
    </div>

    <div id="notificacion_activo4" className="col s2 tooltip2 ocultar">
    <i className="material-icons right" style={{color:'#43a047'}}>notifications_active</i>
    <span id="span_activo4" className="tooltiptext2">completado</span>
    </div>

    </div>
    </div>
    }>
    
    <PreguntasDesempate id_TestPD={idTest} tipo_testD={initialStateTest.tipo_test.id_tipo} idiomaD={initialStateTest.idioma.codigo}/>

  </CollapsibleItem>
{/* End enunciados de desempate */}

{/* Agregar casos de desempate */}
  <CollapsibleItem icon='add_box' header={
    <div className="row row_colapsible">
    <div className="col s11">
    Agregar Casos de Desempate
    </div>
    <div className="col s1">

    <div id="notificacion_inactivo5" className="col s2 tooltip">
    <i className="material-icons right" style={{color:'#e53935'}}>info_outline</i>
    <span className="tooltiptext">pendiente</span>
    </div>

    <div id="notificacion_activo5" className="col s2 tooltip2 ocultar">
    <i className="material-icons right" style={{color:'#43a047'}}>notifications_active</i>
    <span id="span_activo5" className="tooltiptext2">completado</span>
    </div>

    </div>
    </div>
    }>
    
    <CasoDesempate id_TestCD={idTest} tipo_testC={initialStateTest.tipo_test.id_tipo} idiomaC={initialStateTest.idioma.codigo}/>

  </CollapsibleItem>
{/* End casos de desempate */}

</Collapsible>

    <div className="testSave">

     <div className="div-btn-save tooltip">
     <a id="GuardarP" className="btn estilo-btn-form" href="#!" onClick={()=>guardarPublicar()}><i className="material-icons left">save</i>Guardar y Publicar</a>
     <span className="tooltiptext">Guardado y disponible para asignación</span>
     </div>

     <div className="div-btn-save tooltip">
     <a id="Guardar"  className="btn estilo-btn-form" href="#!" onClick={()=>guardar()}><i className="material-icons left">save</i>Guardar</a>
     <span className="tooltiptext">Guardado y No disponible para asignación</span>
     </div>

     <div className="div-btn-save tooltip">
     <a id="nuevoTest" className="btn estilo-btn-form" href="#!" onClick={()=>window.location.reload(true)} disabled><i className="material-icons left">add</i>Nuevo test</a>
     <span className="tooltiptext">Agregar nuevo test</span>
     </div>

     <div className="div-btn-save tooltip">
     <a className="btn estilo-btn-form" href="/"><i className="material-icons left">cancel</i>Salir</a>
     <span className="tooltiptext">Salir de esta pantalla</span>
     </div>
        
     </div>

    </div>   
    );

    function mostrarNotificacionInfo(){
      ReactNotification.notificationDOMRef.current.addNotification({
      title: "Información",
      message: "El avance del registro se queda guardado como borrador, por si no completa el registro del test, puede seguir editando en el menú visualizar y editar test",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 10000 },
      dismissable: { click: true }
    });
  }

function addDatosTest(){
  var min=document.getElementById("lim-min").value;
  var seg=document.getElementById("lim-seg").value;

  //llenar los paises seleccionados
  for(var contPais=0; contPais<paisApli.length; contPais++){
    initialStateTest.pais_apli[contPais]={
      codigo:paisApli[contPais].value,
      pais:paisApli[contPais].label
    };
  } 

  tempPaisASave=initialStateTest.pais_apli;

  initialStateTest.tiempo_test={
      id_tiempo:valorSelect_T,
      min:min,
      seg:seg,
      descripcion:textSelect_T
  }

    //validación de campos vacios
    if(initialStateTest["tiempo_test"].id_tiempo==="T2"){
      if(initialStateTest["tipo_test"].id_tipo===''||initialStateTest.titulo===''
      ||initialStateTest["idioma"].codigo===''||initialStateTest["pais_apli"][0].codigo===''
      ||initialStateTest["exigencia"].id_exigencia===''||initialStateTest["tiempo_test"].id_tiempo===''
      ||initialStateTest.condiciones_uso===''||min===''||seg===''){
        swal("Advertencia!", "Llene los campos vacíos!", "warning");
      }
      else{
        if(min.length<2&&seg.length<2){
          initialStateTest.tiempo_test={
            id_tiempo:valorSelect_T,
            min:"0"+min,
            seg:"0"+seg,
            descripcion:textSelect_T
        }
        }
        else if(min.length<2){
          initialStateTest.tiempo_test={
            id_tiempo:valorSelect_T,
            min:"0"+min,
            seg:seg,
            descripcion:textSelect_T
        }
        }
        else if(seg.length<2){
          initialStateTest.tiempo_test={
            id_tiempo:valorSelect_T,
            min:min,
            seg:"0"+seg,
            descripcion:textSelect_T
        }
        }
        if(props.tests.length>0){
          validacionExistencia();
          initialStateTest.pais_apli=[{
            codigo:"",
            pais:""
            }];
        }
        else{
          saveDatos();
        }
      }
    
      }
      else{
    
      if(initialStateTest["tipo_test"].id_tipo===''||initialStateTest.titulo===''
      ||initialStateTest["idioma"].codigo===''||initialStateTest["pais_apli"][0].codigo===''
      ||initialStateTest["exigencia"].id_exigencia===''||initialStateTest["tiempo_test"].id_tiempo===''
      ||initialStateTest.condiciones_uso===''){
        swal("Advertencia!", "Llene los campos vacíos!", "warning");
      }
      else{
        if(props.tests.length>0){
          validacionExistencia();
          initialStateTest.pais_apli=[{
            codigo:"",
            pais:""
            }];
        }
        else{
          saveDatos();
        }
      }
    
      }
}

function validacionExistencia(){
  banderaTipoTest="0";
  banderaIdioma="0";
  banderaPais="0";
   // validacion de que no esté agregado el test
   for(let iTipoTest=0;iTipoTest<props.tests.length;iTipoTest++){
    // capa1
      for(let iTipoTest2=0;iTipoTest2<props.tests[iTipoTest].tipo_test.length;iTipoTest2++){
           if(props.tests[iTipoTest].tipo_test[iTipoTest2].id_tipo===initialStateTest["tipo_test"].id_tipo){
              banderaTipoTest="1";

              //capa2
              if(banderaTipoTest==="1"){
              for(let iIdioma=0;iIdioma<props.tests[iTipoTest].idioma.length;iIdioma++){
              if(props.tests[iTipoTest].idioma[iIdioma].codigo===initialStateTest["idioma"].codigo){
              banderaIdioma="1";

              //capa3
              if(banderaIdioma==="1"){
              for(let iPais=0;iPais<props.tests[iTipoTest].pais_apli.length;iPais++){
              for(let iPaisApli=0;iPaisApli<paisApli.length;iPaisApli++){
              if(props.tests[iTipoTest].pais_apli[iPais].codigo===initialStateTest["pais_apli"][iPaisApli].codigo){
              banderaPais="1";
              break;
              }
              else{
             }
             }
             }
             }

              break;
             }

              else{
             }

             }
             }

             break;
           }
           else{
           }
      }

  }

if(banderaTipoTest==="1"&&banderaIdioma==="1"&&banderaPais==="1"){
  swal("Advertencia!", "Ya existe Test (con tipo de test,idioma y pais de aplicabilidad) en el sistema, No se puede repetir, son únicas!", "warning");
}
else{
  saveDatos();
}
}

function saveDatos(){
  let span_activo1=document.getElementById("span_activo1");
  lengthTest=props.tests.length+1;

  props.addToDatosTest(initialStateTest);
  span_activo1.className="tooltiptext2 mostrar";

  let btnSaveDatosTest= document.getElementById("btnSaveDatosTest");
  btnSaveDatosTest.setAttribute("disabled", "disabled");

    mostrarNotificacionInfo();
}

function notificaciones(){
 var notificacion_activo=document.getElementById("notificacion_activo");
 var notificacion_inactivo=document.getElementById("notificacion_inactivo");

  if(props.tests.length+1===(lengthTest+1)){
    notificacion_activo.className="col s2 tooltip2 mostrar";
    notificacion_inactivo.className="ocultar";
  }
}

function guardar(){
 let guardar=document.getElementById("Guardar");
 let guardarP=document.getElementById("GuardarP");
 let nuevoTest=document.getElementById("nuevoTest");
 let fecha_hoy=new Date();

 let dia = fecha_hoy.getDate();
 let mes = fecha_hoy.getMonth()+1;
 let year = fecha_hoy.getFullYear();

if(document.getElementById("banderaCompletado").value==="5"){
  swal("Agregar descripción del test:", {
    content: "input",
  })
  .then((value) => {
    if(value===null||value===""){
      swal("Información","debe agregar la descripción para guardar","info");
    }
    else{
      initialstateGuardarTest.id_test=idTest[0];
      initialstateGuardarTest.nombre_test=initialStateTest.titulo;
      initialstateGuardarTest.fecha_guardado=dia+'/'+mes+'/'+year;
      initialstateGuardarTest.tipo_test=initialStateTest["tipo_test"].tipo;
      initialstateGuardarTest.idioma=initialStateTest["idioma"].idioma;
      initialstateGuardarTest.pais_apli=tempPaisASave;
      initialstateGuardarTest.publicado="0";
      initialstateGuardarTest.fecha_publicado="";
      initialstateGuardarTest.descripcion_test=value;

      props.addToTestPublicar(initialstateGuardarTest);
      document.getElementById("banderaCompletado").value="";
      nuevoTest.removeAttribute("disabled");
      guardar.setAttribute("disabled", "disabled");
      guardarP.setAttribute("disabled", "disabled");
    }
  });

}
else{
  swal("Advertencia","debe llenar todos los formularios","warning");
}

}

function guardarPublicar(){
  let guardar=document.getElementById("Guardar");
  let guardarP=document.getElementById("GuardarP");
  let nuevoTest=document.getElementById("nuevoTest");
  let fecha_hoy=new Date();

 let dia = fecha_hoy.getDate();
 let mes = fecha_hoy.getMonth()+1;
 let year = fecha_hoy.getFullYear();

 if(document.getElementById("banderaCompletado").value==="5"){
  swal("Agregar descripción del test:", {
    content: "input",
  })
  .then((value) => {
    if(value===null||value===""){
      swal("Información","debe agregar la descripción para guardar","info");
    }
    else{
      initialstateGuardarTest.id_test=idTest[0];
      initialstateGuardarTest.nombre_test=initialStateTest.titulo;
      initialstateGuardarTest.fecha_guardado=dia+'/'+mes+'/'+year;
      initialstateGuardarTest.tipo_test=initialStateTest["tipo_test"].tipo;
      initialstateGuardarTest.idioma=initialStateTest["idioma"].idioma;
      initialstateGuardarTest.pais_apli=tempPaisASave;
      initialstateGuardarTest.publicado="1";
      initialstateGuardarTest.fecha_publicado=dia+'/'+mes+'/'+year;
      initialstateGuardarTest.descripcion_test=value;

      props.addToTestPublicar(initialstateGuardarTest);
      document.getElementById("banderaCompletado").value="";
      nuevoTest.removeAttribute("disabled");
      guardar.setAttribute("disabled", "disabled");
      guardarP.setAttribute("disabled", "disabled");
    }
  });
 }
 else{
  swal("Advertencia","debe llenar todos los formularios","warning");
 }
}
};

//llena el estado titulo de test
function eventoCambio(e){
  const {name,value}=e.target;
  initialStateTest[name]=value
}

//llena el estado de tipo test
function eventoTipoTest(e){
  initialStateTest.tipo_test={
       id_tipo:e.value,
       tipo:e.label
  };
}

//llena el estado de idioma
function eventoIdioma(e){
  initialStateTest.idioma={
    codigo:e.value,
    idioma:e.label
  };
}

//llena el arreglo seleccionado de paises
function eventoPais(e){
  paisApli=e;
}

//funcion que muestra y oculta el checkbox de exigencia
function addExigencia(e){

  initialStateTest.exigencia={
    id_exigencia:e.value,
    descripcion:e.label
  };

  var elemento = document.getElementById("res_obligatoria");

  if(e.value==="E1"){
    elemento.className = "ocultar";
  }
  else if(e.value==="E2"){
    elemento.className = "input-field col s3 mostrar";
  }
  else{
    elemento.className = "ocultar";
  }
}

//funcion de opcion de tiempo límite en datos_de_test
function tiempoLimite(e){
valorSelect_T=e.value;
textSelect_T=e.label;

var elemento = document.getElementById("div-tiempo-limite");
var elementoCheck=document.getElementById("check_tiempo_limite");
var elementoexi = document.getElementById("exig");
var elementotie = document.getElementById("tiem");

if(e.value==="T1"){
  elemento.className = "ocultar";
  elementoexi.className="input-field col s4";
  elementotie.className="input-field col s4"
  elementoCheck.className="ocultar";
}
else if(e.value==="T2"){
  elemento.className = "mostrar";
  elementoexi.className="input-field col s3";
  elementotie.className="input-field col s3"
  elementoCheck.className="ocultar";
}
else{
  elemento.className = "ocultar";
  elementoCheck.className="input-field col s2 mostrar";
}
}

// eventos de Redux
const mapStateToProps=state=>{
  return{
    tests:state.tests,
    eneatipos:state.eneatipos,
    preguntas:state.preguntas,
    tipos_tests:state.tipos_tests,
    idiomas:state.idiomas,
    paises:state.paises
  }
};

const mapDispatchToProps=dispatch=>{
  return{
    addToDatosTest(initialStateTest) {
      dispatch(addToDatosTest(initialStateTest));
  },
  addToTestPublicar(initialstateGuardarTest){
    dispatch(addToTestPublicar(initialstateGuardarTest));
  }
  }
};
// End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(AddTest);