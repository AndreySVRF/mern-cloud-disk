import axios from 'axios';
import { setAlert } from '../reducers/userReducer';

export const registration = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
        email,
        password
      });

      dispatch(setAlert('success', response.data.message))
    } catch (e) {
      if ('error' in e.response.data) {
        dispatch(setAlert('error', e.response.data.error.errors))
        //console.log(e.response.data.error.errors);
      } else {
        //console.log(e.response.data.message);
        dispatch(setAlert('error', e.response.data.message))
      }

    }
  }
};


