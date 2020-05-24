import React from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
import '../styles/navigation.css';
import {Dropdown} from 'react-materialize'

const Navigation=(props)=>{
    return(
        <React.Fragment>
        <div id="menu-fijo">

        <ul id="dropdown_conf_Enea" className="dropdown-content">
          <li><Link to="/AddTest">Agregar Test</Link></li>
          <li className="divider"></li>
          <li><Link to="/EditTest">Visualizar y Editar Test</Link></li>
          <li className="divider"></li>
          <li><Link to="/AnswerTest">Contestar Test</Link></li>
          <li className="divider"></li>
          <li><a href="#!">Configuración de resultados</a></li>
          <li className="divider"></li>
          <li><a href="#!">Resultados</a></li>
          <li className="divider"></li>
          <li><a href="#!">Congifuración de catálogos</a></li>
        </ul>

        <ul id="dropdown_Test" className="dropdown-content">
          <li><Link to="/AddTest">Disponibles</Link></li>
          <li className="divider"></li>
          <li><Link to="/EditTest">Pendientes</Link></li>
          <li className="divider"></li>
          <li><Link to="/AnswerTest">Completados</Link></li>
        </ul>

        <ul id="perfil_usuario" className="dropdown-content">
          <li><Link to="/">Configuración de cuenta</Link></li>
          <li className="divider"></li>
          <li><Link to="/Card">Configuración de Suscripción</Link></li>
          <li className="divider"></li>
          <li><Link to="/">Cerrar Sesión</Link></li>
        </ul>

           <nav>
             <div className="nav-wrapper" id="body-nav">
                <ul className="right hide-on-med-and-down">   
                  
                   <li>
                   <Dropdown trigger={<a data-target="dropdown_conf_Enea" href="#!">Configuración del Test
                   <i className="material-icons right">arrow_drop_down</i></a>}>
                   </Dropdown>
                   </li>

                   <li><Link to="/Users">Usuarios</Link></li>

                   <li>
                   <Dropdown trigger={<a data-target="dropdown_Test" href="#!">Catalogo de Test
                   <i className="material-icons right">arrow_drop_down</i></a>}>
                   </Dropdown>
                   </li>

                   <li><Dropdown trigger={<a data-target="perfil_usuario" href="#!">
                   <i className="large material-icons left">account_circle</i>Adrian1426</a>}>
                   </Dropdown></li>

                </ul>
              </div>
           </nav>

        </div>        
        {false && <Redirect to="/Login"/>}    
        </React.Fragment>
    );
};

export default withRouter(Navigation);