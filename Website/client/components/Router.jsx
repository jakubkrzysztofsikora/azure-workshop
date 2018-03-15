import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';
import PropTypes from 'prop-types';
import { getDataAsync } from '../actions/actiondispatchers';
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../store/store';
const NotFound = () => <div className="not_found"><h1>Not Found</h1></div>;
const history = syncHistoryWithStore(browserHistory, store)
const Routes = ({getDataAsync}) => {
  return (
    <Router history={history}>
      <Route path="/" component={Home} onEnter={getDataAsync} />
      <Route path="*" component={NotFound} />
    </Router>
  )
};

Routes.propTypes = {
  getDataAsync: PropTypes.func.isRequired
};

const mapStateToProps = ({ data }) => (
  {
    data
  });
const mapDispatchToProps = {getDataAsync};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
