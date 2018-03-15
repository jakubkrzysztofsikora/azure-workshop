import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import NavBar from './NavBar';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar />
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

export default connect(mapStateToProps)(Home);
