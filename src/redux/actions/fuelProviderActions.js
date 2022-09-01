import {
  ADD_FUEL_PROVIDER_REQUEST,
  ADD_FUEL_PROVIDER_SUCCESS,
  ADD_FUEL_PROVIDER_FAIL,
  UPDATE_FUEL_PROVIDER_REQUEST,
  UPDATE_FUEL_PROVIDER_SUCCESS,
  UPDATE_FUEL_PROVIDER_FAIL,
} from '../constants/fuelProviderConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// ADD Fuel Provider
export const addFuelProvider = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_FUEL_PROVIDER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.FUELPROVIDER,
      {
        fuelProvider: data.fuelProvider,
        email: data.email,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_FUEL_PROVIDER_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Fuel Provider Added Successfully'));
    } else {
      dispatch({
        type: ADD_FUEL_PROVIDER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_FUEL_PROVIDER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Fuel Provider
export const updateFuelProvider = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_FUEL_PROVIDER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.FUELPROVIDER}/${data.id}`,
      {
        fuelProvider: data.fuelProvider,
        email: data.email,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_FUEL_PROVIDER_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Fuel Provider Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_FUEL_PROVIDER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_FUEL_PROVIDER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};
