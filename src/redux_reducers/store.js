import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';

const users=(state=[],action)=>{
    if(action.type==="LOAD_USERS"){
       return action.users;
    }
 return state;
};

const tests=(state=[],action)=>{
    if(action.type==="LOAD_TEST"){
        return action.tests;
     }
     else if(action.type==="LOAD_TEST_FILTRO"){
        return action.tests;
     }
    else if(action.type==="ADD_TO_DATOS_TEST"){
        return state.concat(action.tests);
    }
     return state;
};

const eneatipos=(state=[],action)=>{
    if(action.type==="LOAD_ENEATIPOS"){
        return action.eneatipos;
     }
    else if(action.type==="LOAD_ENEATIPOS_FILTRO"){
        return action.eneatipos;
     }
    else if(action.type==="ADD_ENEATIPOS"){
        return state.concat(action.eneatipos);
    }
    else if(action.type==="UPDATE_ENEATIPOS"){
        return state.concat(action.eneatipos);
    }
    else if(action.type==="DELETE_ENEATIPOS"){        
         return state.filter((enea,i)=>enea._id!==action.eneatipos._id);
    }
     return state;
};

const preguntas=(state=[],action)=>{
    if(action.type==="LOAD_PREGUNTAS"){
        return action.preguntas;
     }
     else if(action.type==="LOAD_PREGUNTAS_FILTRO"){
        return action.preguntas;
     }
    else if(action.type==="ADD_PREGUNTAS"){
        return state.concat(action.preguntas);
    }
     return state;
};

const res_desempates=(state=[],action)=>{
    if(action.type==="LOAD_DESEMPATES"){
        return action.res_desempates;
     }
     else if(action.type==="LOAD_DESEMPATES_FILTRO"){
        return action.res_desempates;
     }
    else if(action.type==="ADD_DESEMPATES"){
        return state.concat(action.res_desempates);
    }
    else if(action.type==="UPDATE_DESEMPATES"){
        return state.concat(action.res_desempates);
    }
     return state;
};

const caso_desempates=(state=[],action)=>{
    if(action.type==="LOAD_CASO_DESEMPATES"){
        return action.caso_desempates;
     }
     else if(action.type==="LOAD_CASO_DESEMPATES_FILTRO"){
        return action.caso_desempates;
     }
    else if(action.type==="ADD_CASO_DESEMPATES"){
        return state.concat(action.caso_desempates);
    }
    else if(action.type==="UPDATE_CASO_DESEMPATES"){
        return state.concat(action.caso_desempates);
    }
    else if(action.type==="DELETE_CASO_DESEMPATES"){        
        return state.filter((enea,i)=>enea._id!==action.caso_desempates._id);
   }
     return state;
};

const test_publicados=(state=[],action)=>{
    if(action.type==="LOAD_TEST_PUBLICADOS"){
        return action.test_publicados;
    }
     else if(action.type==="LOAD_TEST_PUBLICADOS_FILTRO"){
        return action.test_publicados;
    }
    else if(action.type==="ADD_TEST_PUBLICADOS"){
        return state.concat(action.test_publicados);
    }
    return state;
};

const resultados=(state=[],action)=>{
    if(action.type==="LOAD_RESULTADOS"){
        return action.resultados;
    }
     else if(action.type==="LOAD_RESULTADOS_FILTRO"){
        return action.resultados;
    }
    else if(action.type==="ADD_RESULTADOS"){
        return state.concat(action.resultados);
    }
    return state;
};

const tipos_tests=(state=[],action)=>{
    if(action.type==="LOAD_TIPOS_TESTS"){
       return action.tipos_tests;
    }
 return state;
};

const idiomas=(state=[],action)=>{
    if(action.type==="LOAD_IDIOMAS"){
       return action.idiomas;
    }
 return state;
};

const paises=(state=[],action)=>{
    if(action.type==="LOAD_PAISES"){
       return action.paises;
    }
 return state;
};

const usuarios=(state=[],action)=>{
    if(action.type==="LOAD_USUARIO"){
        return action.usuarios;
     }
     else if(action.type==="LOAD_USUARIO_FILTRO"){
        return action.usuarios;
     }
    else if(action.type==="ADD_TO_DATOS_USUARIO"){
        return state.concat(action.usuarios);
    }
    else if(action.type==="UPDATE_USUARIOS"){
        return state.concat(action.usuarios);
    }
     return state;
};

export default createStore(combineReducers({users,tests,eneatipos,preguntas,res_desempates,caso_desempates,test_publicados,resultados,tipos_tests,idiomas,paises,usuarios}),{users:[],tests:[],eneatipos:[],preguntas:[],res_desempates:[],caso_desempates:[],test_publicados:[],resultados:[],tipos_tests:[],idiomas:[],paises:[],usuarios:[]},applyMiddleware(thunk));