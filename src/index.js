import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from '../src/redux_reducers/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
  );
serviceWorker.unregister();
