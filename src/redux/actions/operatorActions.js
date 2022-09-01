import {
  ADD_OPERATOR_REQUEST,
  ADD_OPERATOR_SUCCESS,
  ADD_OPERATOR_FAIL,
} from '../constants/operatorConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// ADD Operator
export const addOperator = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_OPERATOR_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.OPERATOR,
      {
        operatorName: data.operatorname,
        aircraftPrefix: data.aircraftprefix,
        registration: data.registration,
        operationsType: data.typeofoperations,
        mtow: data.mtow,
        zfw: data.zfw,
        operatorICAO: data.operatoricao,
        operatorIATA: data.operatoriata,
        aircraftType: data.aircrafttype,
        operatorAddress: data.airlineoperatoraddress,
        airOperatingCertificate: data.airoperatingcertificate,
        certificateOfAirworthness: data.certificateofairworthness,
        certificateOfInsurance: data.certificateofinsurance,
        certificateOfRegistration: data.certificateofregistration,
        noiseCertificate: data.noisecertificate,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_OPERATOR_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Operator Added Successfully'));
    } else {
      dispatch({
        type: ADD_OPERATOR_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_OPERATOR_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update
export const updateOperator = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_OPERATOR_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.OPERATOR}/${data.id}`,
      {
        operatorName: data.operatorname,
        aircraftPrefix: data.aircraftprefix,
        registration: data.registration,
        operationsType: data.typeofoperations,
        mtow: data.mtow,
        zfw: data.zfw,
        operatorICAO: data.operatoricao,
        operatorIATA: data.operatoriata,
        aircraftType: data.aircrafttype,
        operatorAddress: data.airlineoperatoraddress,
        airOperatingCertificate: data.airoperatingcertificate,
        certificateOfAirworthness: data.certificateofairworthness,
        certificateOfInsurance: data.certificateofinsurance,
        certificateOfRegistration: data.certificateofregistration,
        noiseCertificate: data.noisecertificate,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: ADD_OPERATOR_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Operator Added Successfully'));
    } else {
      dispatch({
        type: ADD_OPERATOR_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_OPERATOR_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};
