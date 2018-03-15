import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import PropTypes from 'prop-types';
import map from 'lodash/map';
class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="one" className="wrapper style2 special flow">
        <table className="table" style={{ margin: '20px' }}>
          <thead className="thead-inverse text-center">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Rating</th>
              <th>VotesCount</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data && map(this.props.data, (item) => <Item key={item.id} Id={item.Id} Name={item.Name} Rating={item.Rating} VotesCount={item.VotesCount} />)}
          </tbody>
        </table>
      </section>
    );
  }
}

ItemList.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    data: state.data.data,
  }
};
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
