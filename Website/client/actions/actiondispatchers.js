import {
  getData,
} from './actions';

import axios from 'axios'
import Cookies from 'js-cookie'

export const getDataAsync = () => (dispatch) => {
  const url = Cookies.get('url');
  const token = Cookies.get('token');
  axios.get(url,
    {
      headers: {
      'api-key': token,
      }
    })
    .then(function (response) {
      dispatch(
        getData(response.data.value)
      )
    }).
    catch(function(){
      dispatch(
        getData([])
      )
    })
};
