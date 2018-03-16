import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import NavBar from './NavBar';
import {getDataAsync} from '../actions/actiondispatchers'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar getData={this.props.getData}/>
        <ItemList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data.data
  }
}
function mapDispatchToProps(dispatch) {
  return({
      getData: () => {dispatch(getDataAsync())}
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
