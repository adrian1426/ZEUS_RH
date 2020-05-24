import React from 'react';
import '../styles/users.css';
import {loadUsers} from '../redux_reducers/actionCreators';
import {connect} from 'react-redux';
import store from '../redux_reducers/store';

store.dispatch(loadUsers());

const Users = (props) => {
    return(

        <div id="body-container">

            <h1>lista de usuarios dede MongoDB</h1>

            <div className="col s7">
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.users.map(user=>{
                                return(
                                  <tr key={user._id}>
                                      <td>{user.nombre}</td>
                                      <td>{user.apellidos}</td>
                                      <td>
                                          <button className="btn light-green darken-4" style={{margin:'4px'}}>
                                              <i className="material-icons">create</i>
                                          </button>
                                      </td>
                                      <td>
                                          <button className="btn red darken-4"><i className="material-icons">delete</i></button>
                                      </td>
                                  </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps=state=>{
    return{
      users:state.users
    }
  };
  
  const mapDispatchToProps=dispatch=>{
       return 2;
  };

export default connect(mapStateToProps, mapDispatchToProps)(Users);