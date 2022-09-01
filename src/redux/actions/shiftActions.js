import {
  CREATE_SHIFT_REQUEST,
  CREATE_SHIFT_SUCCESS,
  CREATE_SHIFT_FAIL,
  GET_SHIFT_REQUEST,
  GET_SHIFT_SUCCESS,
  GET_SHIFT_FAIL,
  DELETE_SHIFT_REQUEST,
  DELETE_SHIFT_SUCCESS,
  DELETE_SHIFT_FAIL,
  UPDATE_SHIFT_REQUEST,
  UPDATE_SHIFT_SUCCESS,
  UPDATE_SHIFT_FAIL,
  REMOVE_SHIFT_FROM_STATE
} from '../constants/shiftConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';


// Get Shift
export const getShifts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SHIFT_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.SHIFT}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: GET_SHIFT_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SHIFT_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_SHIFT_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// ADD Shift
export const addShift = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SHIFT_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.SHIFT,
      data,
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: CREATE_SHIFT_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Shift Added Successfully'));
    } else {
      dispatch({
        type: CREATE_SHIFT_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: CREATE_SHIFT_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Delete Shift
export const deleteShift = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SHIFT_REQUEST,
    });
    const res = await GLOBAL_AXIOS.delete(
      `${path.SHIFT}/${id}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: DELETE_SHIFT_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: DELETE_SHIFT_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: DELETE_SHIFT_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Shift
export const updateShift = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SHIFT_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.SHIFT}/${data.id}`,
      data,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_SHIFT_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Shift Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_SHIFT_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_SHIFT_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Remove Shift From State
export const removeShiftFromState = () => async (dispatch) => {
  dispatch({
    type: REMOVE_SHIFT_FROM_STATE,
  });
};
