import React from 'react';
import {addPreguntas} from '../../redux_reducers/actionCreators_Preguntas';
import {connect} from 'react-redux';
import Select from 'react-select';
import swal from 'sweetalert';

const initialStatePreguntas={
  id_test:'',
  tipo_pregunta:[{
      tipo:'',
      descripcion:''
  }],
  pregunta:'',
  respuesta:[{
      des_respuesta:'',
      eneatipo_respuesta:[{
          id_eneatipo:'',
          descripcion:'',
      }]
  }],
  tipo_test:[
      {
          tipo:'',
          id_tipo:''
      }
  ],
  idioma:[
      {
          idioma:'',
          codigo:''
      }
  ],
  exigencia:[
      {
          id_exigencia:'',
          descripcion:'',
          valor:0
      }
  ],
  tiempo_test:[{
      id_tiempo:'',
      min:0,
      seg:0,
      valor:0,
      descripcion:''
  }]
};

var tamRespuestas=[1,2,3,4,5,6,7,8,9,10];
var tempTam=2;
var bandValidRes=2;
var lengthPreguntas=0;

const Preguntas_Respuestas=(props)=>{
  var iband2=0;
  var span_activo3=document.getElementById("span_activo3");
    if(lengthPreguntas===0){
    }
    else{
     notificaciones3();
     setTimeout(function() {
       span_activo3.className="ocultar";
     }, 5000);
     if(iband2===0){
      document.getElementById("banderaCompletado").value="3";
      iband2++;
    }
    }

  const optionsEneatipos = [];

  const optionsTP=[
    {value:'P1',label:'pregunta de elección simple (única)'},
    {value:'P2',label:'pregunta de elección múltiple'}
  ];

  //llenar tipos de test
  for(var i=0; i<props.eneatipos.length; i++){
    var objetoE = {
             label: props.eneatipos[i].dato_eneatipo,
             value: props.eneatipos[i]._id
    };
   optionsEneatipos.push(objetoE);
 } 
    return(
        <div>
        <div className="row">
        <div className="div-datos-test">
        <div className="row" style={{marginBottom:'0px'}}>

         <div className="input-field col s4">
            <Select
              id="id_tipo_preguntat" 
              placeholder="seleccionar tipo de test"
              options={optionsTP}
              onChange={eventoTipoPregunta}
            />
         </div>  

         <div className="input-field col s1">
         </div> 

          <div id="res_obligatoria" className="input-field col s3 ocultar">
            <p>
            <label>
            <input id="valorExigencia" type="checkbox" />
            <span>¿respuesta obligarotio?</span>
            </label>
            </p>
          </div> 

          <div id="check_tiempo_limite" className="input-field col s2 ocultar">
            <p>
            <label>
            <input type="checkbox" id="check_limite" onChange={tiempoLimitePregunta}/>
            <span>¿tiempo límite?</span>
            </label>
            </p>
           </div>

            <div id="div-tiempo-limite-pregunta" className="ocultar">

            <div className="input-field col s1">
            <input id="lim-min-pregunta" type="text" name="min" min="0" max="300" maxLength="3" className="validate"/>
            <label htmlFor="lim-min-pregunta">min</label>
            </div>

            <div className="input-field col s1">
            <input id="lim-seg-pregunta" type="text" name="seg" min="0" max="60" maxLength="2" className="validate"/>
            <label htmlFor="lim-seg-pregunta">seg</label>
            </div>

            </div>

        </div>
        </div>
        </div>

         <div className="div-datos-test">
               <div className="row">

                 <div className="input-field col s11">
                 <input id="pregunta" type="text" className="validate"/>
                 <label htmlFor="pregunta">Descripción del enunciado</label>
                 </div>

                 <div className="col s1 alin-btn-enea btn-CRUD">
                 <a onClick={()=>deleteFilaRespuesta()} href="#!"><i className="small waves-effect material-icons righti-CRUD" style={{color:'#0073b1'}}>do_not_disturb_on</i></a>
                 <a onClick={()=>addFilaRespuesta()} href="#!"><i className="small waves-effect material-icons right i-CRUD" style={{color:'#0073b1'}}>add_circle</i></a>
                 </div>
              
                 {
                   tamRespuestas.map((tam,i)=>{
                     if(i<tempTam){
                      return(
                         <div key={i}>
                           <div className="input-field col s9">
                           <input id={"respuesta"+i} type="text" className="validate"/>
                           <label htmlFor={"respuesta"+i}>Agregar respuesta {i+1}</label>
                           </div>

                          <div className="input-field col s3">
                          <Select
                          name={i}
                          id={"id_eneatipo_test"+i} 
                          placeholder="seleccionar"
                          options={optionsEneatipos}
                          onChange={e => eventoEneatipo(i,e)}
                          />
                          </div>
                         </div>
                      );
                     }
                     else{
                       return '';
                     }
                   })
                 }

                 <div className="col s12 div-btn-datos">

                   <div className="div-btn-save">
                   <a className="btn estilo-btn-form" href="#!" onClick={addPregunta}><i className="material-icons left">check</i>Aceptar</a>
                   </div>

                 </div>

               </div>
           </div> 
        </div>
    );

    function eventoTipoPregunta(e){
      initialStatePreguntas.tipo_pregunta={
        tipo:e.value,
        descripcion:e.label
      };
    }

    function eventoEneatipo(i,e){
      if(document.getElementById("respuesta"+i).value===""||document.getElementById("respuesta"+i).value===undefined){
          swal("Advertencia!", "primero agregue la descripción de respuesta y seleccione nuevamente eneatipo!", "warning");
      }else{
        bandValidRes--;
        initialStatePreguntas.respuesta[i]={
          des_respuesta:document.getElementById("respuesta"+i).value,
          eneatipo_respuesta:{
            id_eneatipo:e.value,
            descripcion:e.label 
          }
        }
      }
    }
function addPregunta(){
  var minP=document.getElementById("lim-min-pregunta").value;
  var segP=document.getElementById("lim-seg-pregunta").value;

  //-----llenar estado------
          //guardar
          initialStatePreguntas.id_test=props.id_Test[0];
          initialStatePreguntas.pregunta=document.getElementById("pregunta").value;
          initialStatePreguntas.tipo_test={
          tipo:props.tipo_testP.tipo,
          id_tipo:props.tipo_testP.id_tipo
          }
          initialStatePreguntas.idioma={
          idioma:props.idiomaP.idioma,
          codigo:props.idiomaP.codigo
          }
          //valor de exigencia
          if(props.exigenciaP.id_exigencia==="E1"){
            initialStatePreguntas.exigencia={
              id_exigencia:props.exigenciaP.id_exigencia,
              descripcion:props.exigenciaP.descripcion,
              valor:1
              }
          }
          else if(props.exigenciaP.id_exigencia==="E2"){
            if(document.querySelector('#valorExigencia').checked){
              initialStatePreguntas.exigencia={
                id_exigencia:props.exigenciaP.id_exigencia,
                descripcion:props.exigenciaP.descripcion,
                valor:1
                }
            }
            else{
              initialStatePreguntas.exigencia={
                id_exigencia:props.exigenciaP.id_exigencia,
                descripcion:props.exigenciaP.descripcion,
                valor:0
                }
            }
          }
          else{
            initialStatePreguntas.exigencia={
              id_exigencia:props.exigenciaP.id_exigencia,
              descripcion:props.exigenciaP.descripcion,
              valor:0
              }
          }
          //End valor de exigencia
  
          //valor de tiempo
          if(props.tiempo_testP.id_tiempo==="T1"){
            initialStatePreguntas.tiempo_test={
              id_tiempo:props.tiempo_testP.id_tiempo,
              min:props.tiempo_testP.min,
              seg:props.tiempo_testP.seg,
              valor:0,
              descripcion:props.tiempo_testP.descripcion
            }
          }
          else if(props.tiempo_testP.id_tiempo==="T2"){
            initialStatePreguntas.tiempo_test={
              id_tiempo:props.tiempo_testP.id_tiempo,
              min:props.tiempo_testP.min,
              seg:props.tiempo_testP.seg,
              valor:1,
              descripcion:props.tiempo_testP.descripcion
            }
          }
          else{
            if(document.querySelector('#check_limite').checked){
              if(minP.length<2&&segP.length<2){
                initialStatePreguntas.tiempo_test={
                  id_tiempo:props.tiempo_testP.id_tiempo,
                  min:"0"+minP,
                  seg:"0"+segP,
                  valor:1,
                  descripcion:props.tiempo_testP.descripcion
                }
                }
                else if(minP.length<2){
                initialStatePreguntas.tiempo_test={
                  id_tiempo:props.tiempo_testP.id_tiempo,
                  min:"0"+minP,
                  seg:segP,
                  valor:1,
                  descripcion:props.tiempo_testP.descripcion
                }
                }
                else if(segP.length<2){
                initialStatePreguntas.tiempo_test={
                  id_tiempo:props.tiempo_testP.id_tiempo,
                  min:minP,
                  seg:"0"+segP,
                  valor:1,
                  descripcion:props.tiempo_testP.descripcion
                }
                }
            }
            else{
              initialStatePreguntas.tiempo_test={
                id_tiempo:props.tiempo_testP.id_tiempo,
                min:"00",
                seg:"00",
                valor:0,
                descripcion:props.tiempo_testP.descripcion
              }
            }
          }
          //End valor de tiempo

  //---------llenar estado--------

  if(props.tipo_testP.tipo===undefined||props.idiomaP.codigo===undefined||props.pais_apliP[0].codigo===undefined){
    swal("Advertencia!", "Primero llene el formulario: Agregar Datos del Test!", "warning");
  }
  else if(initialStatePreguntas["tipo_pregunta"].tipo===''||initialStatePreguntas.pregunta===''||bandValidRes>0){
    swal("Advertencia!", "LLenar los campos vacíos!", "warning");
  }
  else if(document.querySelector('#check_limite').checked===true&&(minP===""||segP==="")){
    swal("Advertencia!", "Agergar tiempo límite!", "warning");
  }
  else{
       lengthPreguntas=props.preguntas.length+1;

       props.addPreguntas(initialStatePreguntas);
       tempTam=2;
       bandValidRes=2;
        
       document.getElementById("lim-min-pregunta").value="";
       document.getElementById("lim-seg-pregunta").value="";
       document.getElementById("pregunta").value="";
       document.getElementById("respuesta0").value="";
       document.getElementById("respuesta1").value="";
  }
}

function notificaciones3(){
  var notificacion_activo2=document.getElementById("notificacion_activo3");
  var notificacion_inactivo2=document.getElementById("notificacion_inactivo3");
 
   if(props.preguntas.length+1===(lengthPreguntas+1)){
     notificacion_activo2.className="col s2 tooltip2 mostrar";
     notificacion_inactivo2.className="ocultar";
   }
   else{
   }
   
 }
};

//funcion de mostrar y ocultar tiempo limite por pregunta
function tiempoLimitePregunta(){
    var checkTiempo=document.getElementById("check_limite");
    var elemento = document.getElementById("div-tiempo-limite-pregunta");
  
    if (checkTiempo.checked) {
      elemento.className = "mostrar";
    } else {
      elemento.className = "ocultar";
    }
  }
function addFilaRespuesta(){
  if(tempTam===10){
    swal("Información!", "ya llegó a limite de respuestas disponibles!", "info");
  }
  else{
    tempTam++;
    bandValidRes++;
  }
}

function deleteFilaRespuesta(){
  if(tempTam===0){
    swal("Información!", "primero agregue filas de respuesta!", "info");
  }
  else{
    tempTam--;
    initialStatePreguntas.respuesta.pop();
    bandValidRes--;
  }
}

// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
      preguntas:state.preguntas,
      eneatipos:state.eneatipos
    }
  };

//agrega datos y dispara evento, para posteriormente recargar el estado
const mapDispatchToProps=dispatch=>{
    return{
        addPreguntas(initialStatePreguntas) {
        dispatch(addPreguntas(initialStatePreguntas));
    }
    }
  };

  // End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(Preguntas_Respuestas);