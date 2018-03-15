import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Router';
import { Provider } from 'react-redux';
import store from './store/store';
import { getDataAsync } from './actions/actiondispatchers';
import isString from 'lodash/isString'
import includes from 'lodash/includes'

ReactDOM.render(
  <Provider store={store}>
    <Routes onEnter={getDataAsync}/>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/Home', () => {
        ReactDOM.render(
            <Provider store={store}>
              <Routes onEnter={getDataAsync}/>
            </Provider>,
            document.getElementById('root')
          );
  });
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (...args) => { // eslint-disable-line no-console
    if (args
      && args.length === 1
      && isString(args[0])
      && includes(args[0], 'You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
}