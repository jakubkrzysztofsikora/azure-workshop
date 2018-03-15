import {
  getData,
} from './actions';

import axios from 'axios'

export const getDataAsync = () => (dispatch) => {
  axios.get('https://azure-workshop.search.windows.net/indexes/azuresql-index/docs?api-version=2016-09-01&search=*',
    {
      headers: {
      'api-key': '',
      }
    })
    .then(function (response) {
      dispatch(
        getData(response.data.value)
      )
      
    })
};
