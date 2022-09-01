import {
  CREATE_SHIFT_HANDOVER_REQUEST,
  CREATE_SHIFT_HANDOVER_SUCCESS,
  CREATE_SHIFT_HANDOVER_FAIL,
  GET_SHIFT_HANDOVER_REQUEST,
  GET_SHIFT_HANDOVER_SUCCESS,
  GET_SHIFT_HANDOVER_FAIL,
  DELETE_SHIFT_HANDOVER_REQUEST,
  DELETE_SHIFT_HANDOVER_SUCCESS,
  DELETE_SHIFT_HANDOVER_FAIL,
  UPDATE_SHIFT_HANDOVER_REQUEST,
  UPDATE_SHIFT_HANDOVER_SUCCESS,
  UPDATE_SHIFT_HANDOVER_FAIL,
  REMOVE_SHIFT_HANDOVER_FROM_STATE
} from '../constants/shiftHandoverConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';


// Get Shift Handovers
export const getShiftHandovers = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SHIFT_HANDOVER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.SHIFTHANDOVER}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: GET_SHIFT_HANDOVER_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_SHIFT_HANDOVER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_SHIFT_HANDOVER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// ADD Shift Handover
export const addShiftHandover = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SHIFT_HANDOVER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.SHIFTHANDOVER,
      data,
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: CREATE_SHIFT_HANDOVER_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Shift Handover Added Successfully'));
    } else {
      dispatch({
        type: CREATE_SHIFT_HANDOVER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    console.log(error)
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: CREATE_SHIFT_HANDOVER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Delete Shift Handover
export const deleteShiftHandover = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SHIFT_HANDOVER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.delete(
      `${path.SHIFTHANDOVER}/${id}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: DELETE_SHIFT_HANDOVER_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: DELETE_SHIFT_HANDOVER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: DELETE_SHIFT_HANDOVER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Shift Handover
export const updateShiftHandover = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SHIFT_HANDOVER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.SHIFTHANDOVER}/${data._id}`,
      data,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_SHIFT_HANDOVER_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Shift Handover Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_SHIFT_HANDOVER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    console.log(error)
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_SHIFT_HANDOVER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Remove Shift Handover From State
export const removeShiftHandoverFromState = () => async (dispatch) => {
  dispatch({
    type: REMOVE_SHIFT_HANDOVER_FROM_STATE,
  });
};
