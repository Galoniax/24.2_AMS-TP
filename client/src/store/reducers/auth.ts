import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  SET_LOADING,
} from '../types';

const initialState = {
  user_data: {
    id: null,
    username: null,
    email: null,
    role: null,
    token: null,
    birthDate: null,
  },
  isAuthenticated: false,
  loading: false,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user_data: action.payload,
        isAuthenticated: true,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        user_data: null,
        isAuthenticated: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user_data: null,
        isAuthenticated: false,
      };
    case USER_LOGOUT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
