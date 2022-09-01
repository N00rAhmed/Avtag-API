import {
  CREATE_STAFF_PROFILE_REQUEST,
  CREATE_STAFF_PROFILE_SUCCESS,
  CREATE_STAFF_PROFILE_FAIL,
  GET_STAFF_PROFILE_REQUEST,
  GET_STAFF_PROFILE_SUCCESS,
  GET_STAFF_PROFILE_FAIL,
  DELETE_STAFF_PROFILE_REQUEST,
  DELETE_STAFF_PROFILE_SUCCESS,
  DELETE_STAFF_PROFILE_FAIL,
  UPDATE_STAFF_PROFILE_REQUEST,
  UPDATE_STAFF_PROFILE_SUCCESS,
  UPDATE_STAFF_PROFILE_FAIL,
  REMOVE_STAFF_PROFILE_FROM_STATE
} from '../constants/staffProfileConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';


// Get Staff Profiles
export const getStaffProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_STAFF_PROFILE_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.STAFFPROFILE}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: GET_STAFF_PROFILE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_STAFF_PROFILE_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_STAFF_PROFILE_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// ADD Staff Profile
export const addStaffProfile = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_STAFF_PROFILE_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.STAFFPROFILE,
      data,
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: CREATE_STAFF_PROFILE_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Staff Profile Added Successfully'));
    } else {
      dispatch({
        type: CREATE_STAFF_PROFILE_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: CREATE_STAFF_PROFILE_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Delete Staff Profile
export const deleteStaffProfiles = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_STAFF_PROFILE_REQUEST,
    });
    const res = await GLOBAL_AXIOS.delete(
      `${path.STAFFPROFILE}/${id}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: DELETE_STAFF_PROFILE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: DELETE_STAFF_PROFILE_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: DELETE_STAFF_PROFILE_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Staff Profile
export const updateStaffProfile = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_STAFF_PROFILE_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.STAFFPROFILE}/${data.id}`,
      data,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_STAFF_PROFILE_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Staff Profile Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_STAFF_PROFILE_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_STAFF_PROFILE_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Remove Staff Profile From State
export const removeStaffProfileFromState = () => async (dispatch) => {
  dispatch({
    type: REMOVE_STAFF_PROFILE_FROM_STATE,
  });
};
