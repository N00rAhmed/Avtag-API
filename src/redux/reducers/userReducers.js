import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, success: false };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, isRegistered: false };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        isRegistered: true,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        isRegistered: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const loadUserReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: payload,
      };
    case LOAD_USER_FAIL:
    case USER_LOGOUT:
      return {
        loading: false,
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
};
