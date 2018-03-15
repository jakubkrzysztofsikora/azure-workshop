import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Router';
import { Provider } from 'react-redux';
import store from './store/store';
import { getDataAsync } from './actions/actiondispatchers';

ReactDOM.render(
  <Provider store={store}>
     <Routes onEnter={getDataAsync}/>
  </Provider>,
  document.getElementById('root')
);

