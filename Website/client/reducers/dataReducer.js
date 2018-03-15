import {
  GET_DATA,
} from '../actions/actions';


const initial = {
  data: []
};

const dataReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({}, state, { data: action.data });
    default:
      return state;
  }
};

export default dataReducer;
