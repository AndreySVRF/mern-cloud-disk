const SET_ALERT = 'SET_ALERT';
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

const defaultState = {
  currentUser: {},
  isAuth: false,
  alert: null
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      };
    case SET_USER:
      return {
        alert: null,
        currentUser: action.payload,
        isAuth: true
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        alert: null,
        currentUser: {},
        isAuth: false
      };
    default:
      return state;
  }
}

export const setAlert = (type, message) => ({ type: SET_ALERT, payload: { type, message } });
export const setUser = user => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
