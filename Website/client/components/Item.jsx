import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/main.scss';

const Item = ({Id, Name, Rating, VotesCount}) => {
  return (
    <tr>
      <td>
        {Id}
      </td>
      <td>
        {Name}
      </td>
      <td>
        {Rating}
      </td>
      <td>
        {VotesCount}
      </td>
    </tr>
  );
};

Item.propTypes = {
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Rating: PropTypes.string.isRequired,
  VotesCount: PropTypes.string.isRequired
};

export default Item;
// Id: "1"
// Name: "Black Mirror"
// Rating: "0.61"
// VotesCount: 1134