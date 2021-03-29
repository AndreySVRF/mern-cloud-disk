import axios from 'axios';
import { setAlert, setUser } from '../reducers/userReducer';

export const registration = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
        email,
        password
      });

      dispatch(setAlert('success', response.data.message));
    } catch (e) {
      if ('error' in e.response.data) {
        dispatch(setAlert('error', e.response.data.error.errors));
      } else {
        dispatch(setAlert('error', e.response.data.message));
      }
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password
      });

      dispatch(setAlert('success', 'Login successful'));
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      if (e.response) {
        if ('error' in e.response.data) {
          dispatch(setAlert('error', e.response.data.error.errors));
        } else {
          dispatch(setAlert('error', e.response.data.message));
        }
      }
    }
  };
};

export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      localStorage.removeItem('token');
      // if ('error' in e.response.data) {
      //   dispatch(setAlert('error', e.response.data.error.errors));
      // } else {
      //   dispatch(setAlert('error', e.response.data.message));
      // }
    }
  };
};
