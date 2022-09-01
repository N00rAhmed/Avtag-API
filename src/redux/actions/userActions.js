import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

export const requestregister = ({
  token,
  loginemail,
  companyname,
  contactpersonname,
  password,
  cellnumber,
  customertype,
}) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.SIGNUP,
      {
        token,
        loginemail,
        companyname,
        contactpersonname,
        password,
        cellnumber,
        customertype,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch(setAlert(true, 'success', res.data.msg));
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    const err = error.response ? error.response.data.error : error.message;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// User Login
export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.SIGNIN,
      {
        email,
        password,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
      });
      dispatch(loadUser());
      dispatch(setAlert(true, 'success', 'Login Succesfull'));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response ? error.response.data.error : error.message;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(path.LOADUSER, config);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error,
    });
  }
};

// Logout user / Clear everything
export const logout = () => async (dispatch) => {
  try {
    await GLOBAL_AXIOS.get(path.LOGOUT);
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {}
};
