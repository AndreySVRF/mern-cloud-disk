const SET_ALERT = 'SET_ALERT';

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
    default:
      return state;
  }
}

export const setAlert = (type, message) => ({ type: SET_ALERT, payload: {type, message} });
