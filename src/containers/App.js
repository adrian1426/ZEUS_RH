import React from 'react';
import '../styles/App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Users from '../components/Users'
import Navigation from '../components/Navigation';
import AddTest from '../components/Config_Eneagrama/AddTest';
import AnswerTest from './../components/Answer_Test/AnswerTest';
import IniciarTest from './../components/Answer_Test/IniciarTest';
import Login from './../components/Login/Login';
import EditTest from './../components/Edit_Test/EditTest';
import {connect} from 'react-redux';
import Card from './../components/Acount/Card';


var sesion="1";
const App=(props)=>{

  if(props.usuarios.length === 1){
    sesion = props.usuarios[0].sesion;
    console.log("sesion: ",props.usuarios[0].sesion);
  }

if(sesion==="0"){
    return(
      <Login/>
    )
}
else{
  return ( 
    <div className="App">
    <div id='marca-contenedor'>
    {/* menú de navegacion */}
       <BrowserRouter>
       <React.Fragment>
       <Route path="/Login" component={Login}/>
       <Navigation/>
       <Route path="/Users" component={Users}/>
       <Route path="/AddTest" component={AddTest}/>
       <Route path="/EditTest" component={EditTest}/>
       <Route path="/AnswerTest" component={AnswerTest}/>
       <Route path="/IniciarTest/:id?/:userid?" component={IniciarTest}/>
       <Route path="/Card" component={Card}/>
       </React.Fragment>
       </BrowserRouter>
    </div>
    </div>
  );
}
}

const mapStateToProps=state=>{
  return{
    usuarios:state.usuarios
  }
};

const mapDispatchToProps=dispatch=>{
    return{
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
