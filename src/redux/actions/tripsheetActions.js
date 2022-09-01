import {
  CREATE_TRIPSHEET_REQUEST,
  CREATE_TRIPSHEET_SUCCESS,
  CREATE_TRIPSHEET_FAIL,
  GET_TRIPSHEET_REQUEST,
  GET_TRIPSHEET_SUCCESS,
  GET_TRIPSHEET_FAIL,
  UPDATE_TRIPSHEET_REQUEST,
  UPDATE_TRIPSHEET_SUCCESS,
  UPDATE_TRIPSHEET_FAIL,
  REMOVE_TRIPSHEET_FROM_STATE
} from '../constants/tripsheetConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';
import { openModal } from './modalActions';

// Create Tripsheet
export const createTripsheet = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TRIPSHEET_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.TRIPSHEET,
      {
        flightRequest: data.tripInfo.flightrequest,
        version: data.tripInfo.version,
        customer: data.tripInfo.customer,
        operator: data.tripInfo.operator,
        registration: data.tripInfo.registration,
        aircraftType: data.tripInfo.aircrafttype,
        captainName: data.tripInfo.captainname,
        totalCrew: parseInt(data.tripInfo.totalcrew),
        itinerary: data.tripInfo.itinerary,
        typeOfOperation: data.tripInfo.typeofoperation,
        flightType: data.tripInfo.flightype,
        passengerCargoDetail: data.tripInfo.passengercargodetails,
        tripRequest: data.tripInfo.triprequest,
        schedule: data.schedule,
        permission: data.permission,
        groundHandler: data.groundHandler,
        fuel: data.fuel,
        remark: data.remark,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: CREATE_TRIPSHEET_SUCCESS,
        payload: res.data.data,
      });
      // dispatch(setAlert(true, 'success', 'Tripsheet Created Successfully'));
      dispatch(openModal(true, 'SuccessMessage', 'sm', data.tripInfo));
    } else {
      dispatch({
        type: CREATE_TRIPSHEET_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: CREATE_TRIPSHEET_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// gET Tripsheet
export const getTripsheet = (tripNo) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRIPSHEET_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.TRIPSHEET}/${tripNo}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: GET_TRIPSHEET_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_TRIPSHEET_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_TRIPSHEET_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Remove Tripsheet From State
export const removeTripsheetFromState = () => async (dispatch) => {
  dispatch({
    type: REMOVE_TRIPSHEET_FROM_STATE,
  });
};

// Update Tripsheet
export const updateTripsheet = (data, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TRIPSHEET_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.TRIPSHEET}/${id}`,
      {
        flightRequest: data.tripInfo.flightrequest,
        version: data.tripInfo.version,
        customer: data.tripInfo.customer,
        operator: data.tripInfo.operator,
        registration: data.tripInfo.registration,
        aircraftType: data.tripInfo.aircrafttype,
        captainName: data.tripInfo.captainname,
        totalCrew: parseInt(data.tripInfo.totalcrew),
        itinerary: data.tripInfo.itinerary,
        typeOfOperation: data.tripInfo.typeofoperation,
        flightType: data.tripInfo.flightype,
        passengerCargoDetail: data.tripInfo.passengercargodetails,
        tripRequest: data.tripInfo.triprequest,
        schedule: data.schedule,
        permission: data.permission,
        groundHandler: data.groundHandler,
        fuel: data.fuel,
        remark: data.remark,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_TRIPSHEET_SUCCESS,
        payload: res.data.data,
      });
      dispatch(setAlert(true, 'success', 'Tripsheet Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_TRIPSHEET_FAIL,
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
      type: UPDATE_TRIPSHEET_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};
