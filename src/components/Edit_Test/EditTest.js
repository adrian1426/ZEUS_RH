import React from 'react';
import {connect} from 'react-redux';
import {loadTest} from '../../redux_reducers/actionCreators_DatosTest';
import store from '../../redux_reducers/store';
import {Collapsible,CollapsibleItem} from 'react-materialize'

store.dispatch(loadTest());

const EditTest = (props) => {

    return(
    <div id="body-container">
       <Collapsible>
       <CollapsibleItem header="Better safe than sorry. That's my motto." icon="filter_drama">
        Better safe than sorry. That's my motto.
       </CollapsibleItem>
        <CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon="place">
         Yeah, you do seem to have a little 'shit creek' action going.
        </CollapsibleItem>
        <CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon="whatshot">
        You know, FYI, you can buy a paddle. Did you not plan for this contingency?
       </CollapsibleItem>
        </Collapsible>

        <h1>componente edit test</h1>
        {
            props.tests.map(test=>{
               return(
                test.exigencia.map((exi,i) => {
                    return(
                        <h1 key={i}>{exi.descripcion}</h1>
                    )
                        
                }   
                )
            )
            })
        }
        </div>
    );

}

const mapStateToProps=state=>{
    return{
      tests:state.tests
    }
  };
  
const mapDispatchToProps=dispatch=>{
       return 2;
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditTest);
