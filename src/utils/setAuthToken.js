import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    token = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
};

export default setAuthToken;
