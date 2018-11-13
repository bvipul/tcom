import axios from 'axios';
import store from '../store';
import * as actions from '../store/actions';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if(localStorage.getItem('jwt_token')) {
  const jwtToken = localStorage.getItem('jwt_token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout())
    }
    return Promise.reject(error);
  }
);

export default axios;
