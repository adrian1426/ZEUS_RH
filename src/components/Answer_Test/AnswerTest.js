import React from 'react';
import  '../../styles/answerTest.css';
import logo_test from '../../images/icono_test.png';
import logo from '../../images/eneagrama.png';
import ico_empresa from '../../images/ico_empresa.jpg';
import ico_persona from '../../images/persona.png';
import {loadPreguntasFiltro} from '../../redux_reducers/actionCreators_Preguntas';
import store from '../../redux_reducers/store';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadEneatiposFiltro} from '../../redux_reducers/actionCreators_Eneatipos';
import {loadTest} from '../../redux_reducers/actionCreators_DatosTest';
import {loadCasoDesFiltro} from '../../redux_reducers/actionCrestors_Caso_Des';
import {loadDesempatesFiltro} from '../../redux_reducers/actionCreators_Desempate';

const AnswerTest=(props)=>{
  return(
      <div id="body-container">
      <div>
      <div className="chip back-color">
          <img src={logo_test} alt="Contact Person"/>
          <span className="tipo_letra3">Test asígnados, completados y pendientes, favor de contestarlos a la brevedad.</span>
      </div>
      </div>
      
      <div className="row">

      <div className="col s4">
      <div className="card">

      <div className="col s12 span-status" style={{paddingTop:'8px'}}><span className="badge red lighten-3 span_status" data-badge-caption="pendiente"></span></div>
      <div className="col s2"></div>
      <div className="col s8">
      <div className="card-image waves-effect waves-block waves-light answerTestImg">
      <img className="activator" src={logo}  alt="logo"/>
      </div>
      </div>
      <div className="card-content">
      <div>
          <div className="chip">
          <img src={ico_persona} alt="Contact Person"/>
          Asignado por: Adrian Hernandez
          </div>
          <div className="chip">
          <img src={ico_empresa} alt="Contact Person"/>
           Empresa: Merck S.A. de C.V.
          </div>
      </div>

      </div>

      <div className="card-footer grey lighten-3">
      <span  className="card-title activator grey-text text-darken-4 tipo_letra2">Test de Eneatipos<i className="material-icons right">info_outline</i></span>
      <p><Link to="/IniciarTest/5c9019819b6f8e3218c92d14/1234" onClick={()=>dispararTest("5c9019819b6f8e3218c92d14")}>Contestar Test</Link></p>
      </div>

      <div className="card-reveal">
      <div className="grey lighten-3 det_card" style={{paddingBottom:'3px'}}>
      <div className="chip">
          <img src={logo} alt="Contact Person"/>
          <span className="card-title grey-text text-darken-4 tipo_letra2" style={{marginBottom:'10%'}}>Test de Eneatipos<i className="material-icons right">close</i></span>
      </div>

      <div style={{paddingLeft:'5%'}}>
      <p className="tipo_letra1">Tipo de test: Test de Eneagrama</p>
      <p className="tipo_letra1">Fecha de asignación: 26-02-2019</p>
      <p className="tipo_letra1">Número de Preguntas: 72</p>
      <p className="tipo_letra1">Tipo de preguntas: opción simple</p>
      <p className="tipo_letra1">Descripción: Usted debe seleccionar una única respuesta, la cuál le permitirá continuar con las preguntas restantes.</p>
      <p className="tipo_letra1">Idioma: Español</p>
      <p className="tipo_letra1">Pais aplicable: México</p>
      <p className="tipo_letra1">Tiempo límite: 30 min</p>
      </div>
      </div>
      </div>

      </div>
      </div>

      {/* empieza otro card */}
      <div className="col s4">
      <div className="card">

      <div className="col s12 span-status" style={{paddingTop:'8px'}}><span className="badge red lighten-3 span_status" data-badge-caption="pendiente"></span></div>
      <div className="col s2"></div>
      <div className="col s8">
      <div className="card-image waves-effect waves-block waves-light answerTestImg">
      <img className="activator" src={logo}  alt="logo"/>
      </div>
      </div>
      <div className="card-content">
      <div>
          <div className="chip">
          <img src={ico_persona} alt="Contact Person"/>
          Asignado por: Adrian Hernandez
          </div>
          <div className="chip">
          <img src={ico_empresa} alt="Contact Person"/>
           Empresa: Merck S.A. de C.V.
          </div>
      </div>

      </div>

      <div className="card-footer grey lighten-3">
      <span  className="card-title activator grey-text text-darken-4 tipo_letra2">Test de Eneatipos<i className="material-icons right">info_outline</i></span>
      <p><Link to="/IniciarTest/5ca6a81dd3fa0a1a80ad7be1/1234" onClick={()=>dispararTest("5ca6a81dd3fa0a1a80ad7be1")}>Contestar Test</Link></p>
      </div>

      <div className="card-reveal">
      <div className="grey lighten-3 det_card" style={{paddingBottom:'3px'}}>
      <div className="chip">
          <img src={logo} alt="Contact Person"/>
          <span className="card-title grey-text text-darken-4 tipo_letra2" style={{marginBottom:'10%'}}>Test de Eneatipos<i className="material-icons right">close</i></span>
      </div>

      <div style={{paddingLeft:'5%'}}>
      <p className="tipo_letra1">Tipo de test: Test de Eneagrama</p>
      <p className="tipo_letra1">Fecha de asignación: 26-02-2019</p>
      <p className="tipo_letra1">Número de Preguntas: 72</p>
      <p className="tipo_letra1">Tipo de preguntas: opción simple</p>
      <p className="tipo_letra1">Descripción: Usted debe seleccionar una única respuesta, la cuál le permitirá continuar con las preguntas restantes.</p>
      <p className="tipo_letra1">Idioma: Español</p>
      <p className="tipo_letra1">Pais aplicable: México</p>
      <p className="tipo_letra1">Tiempo límite: 30 min</p>
      </div>
      </div>
      </div>

      </div>
      </div>

      {/* empieza otro card */}
      <div className="col s4">
      <div className="card">

      <div className="col s12 span-status" style={{paddingTop:'8px'}}><span className="badge red lighten-3 span_status" data-badge-caption="pendiente"></span></div>
      <div className="col s2"></div>
      <div className="col s8">
      <div className="card-image waves-effect waves-block waves-light answerTestImg">
      <img className="activator" src={logo}  alt="logo"/>
      </div>
      </div>
      <div className="card-content">
      <div>
          <div className="chip">
          <img src={ico_persona} alt="Contact Person"/>
          Asignado por: Adrian Hernandez
          </div>
          <div className="chip">
          <img src={ico_empresa} alt="Contact Person"/>
           Empresa: Merck S.A. de C.V.
          </div>
      </div>

      </div>

      <div className="card-footer grey lighten-3">
      <span  className="card-title activator grey-text text-darken-4 tipo_letra2">Test de Eneatipos<i className="material-icons right">info_outline</i></span>
      <p><Link to=''>Contestar Test</Link></p>
      </div>

      <div className="card-reveal">
      <div className="grey lighten-3 det_card" style={{paddingBottom:'3px'}}>
      <div className="chip">
          <img src={logo} alt="Contact Person"/>
          <span className="card-title grey-text text-darken-4 tipo_letra2" style={{marginBottom:'10%'}}>Test de Eneatipos<i className="material-icons right">close</i></span>
      </div>

      <div style={{paddingLeft:'5%'}}>
      <p className="tipo_letra1">Tipo de test: Test de Eneagrama</p>
      <p className="tipo_letra1">Fecha de asignación: 26-02-2019</p>
      <p className="tipo_letra1">Número de Preguntas: 72</p>
      <p className="tipo_letra1">Tipo de preguntas: opción simple</p>
      <p className="tipo_letra1">Descripción: Usted debe seleccionar una única respuesta, la cuál le permitirá continuar con las preguntas restantes.</p>
      <p className="tipo_letra1">Idioma: Español</p>
      <p className="tipo_letra1">Pais aplicable: México</p>
      <p className="tipo_letra1">Tiempo límite: 30 min</p>
      </div>
      </div>
      </div>

      </div>
      </div>

      </div>

      </div>

  );

function dispararTest(test){
    store.dispatch(loadPreguntasFiltro(test));
    store.dispatch(loadEneatiposFiltro(test));
    store.dispatch(loadCasoDesFiltro(test));
    store.dispatch(loadDesempatesFiltro(test));
    store.dispatch(loadTest());
}
};

// eventos de Redux

//recibe toda la información del estado
const mapStateToProps=state=>{
    return{
    }
  };

//agrega datos y dispara evento, para posteriormente recargar el estado
const mapDispatchToProps=dispatch=>{
    return{
    }
  };

  // End eventos de Redux

export default connect(mapStateToProps, mapDispatchToProps)(AnswerTest);