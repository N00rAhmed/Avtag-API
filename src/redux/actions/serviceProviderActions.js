import {
  GET_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
  GET_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
  GET_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
  ADD_SERVICE_PROVIDER_REQUEST,
  ADD_SERVICE_PROVIDER_SUCCESS,
  ADD_SERVICE_PROVIDER_FAIL,
  UPDATE_SERVICE_PROVIDER_REQUEST,
  UPDATE_SERVICE_PROVIDER_SUCCESS,
  UPDATE_SERVICE_PROVIDER_FAIL,
  UPDATE_PREFFERED_SERVICE_PROVIDER_REQUEST,
  UPDATE_PREFFERED_SERVICE_PROVIDER_SUCCESS,
  UPDATE_PREFFERED_SERVICE_PROVIDER_FAIL,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
  GET_SELECTED_SERVICE_PROVIDER_BY_COUNTRY,
} from '../constants/serviceProviderConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// Get Service Provider by Country
export const getServiceProviderByCountry = (country) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.SERVICEPROVIDER}/${country}`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
          payload: res.data,
        });
      }
      dispatch({
        type: GET_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
      payload: err,
    });
  }
};

// Get Selected Service Provider by Country
export const getSelectedServiceProviderByCountry = (serviceProvider) => async (
  dispatch
) => {
  dispatch({
    type: GET_SELECTED_SERVICE_PROVIDER_BY_COUNTRY,
    payload: serviceProvider,
  });
};

// Get Preffered Service Provider by Country
export const getPrefferedServiceProviderByCountry = (country) => async (
  dispatch
) => {
  try {
    dispatch({
      type: GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      `${path.SERVICEPROVIDER}/${country}`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
          payload: res.data,
        });
        dispatch(
          setAlert(
            true,
            'error',
            `No Preffered Service Provider Found For ${country}`
          )
        );
      }
      dispatch({
        type: GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
      payload: err,
    });
  }
};

// ADD Service Provider
export const addServiceProvider = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SERVICE_PROVIDER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.SERVICEPROVIDER,
      {
        serviceProviderCode: data.serviceProviderCode,
        serviceProviderName: data.serviceProviderName,
        preffered: false,
        country: data.country,
        vatNo: data.vatNo,
        serviceProviderType: data.serviceProviderType,
        email: data.email,
        aftnSita: data.aftnSita,
        telephone: data.telephone,
        faxNumber: data.faxNumber,
        currency: data.currency,
        requestMethod: data.requestMethod,
        remark: data.remark,
        normal: data.normal,
        revision: data.revision,
        urgent: data.urgent,
        caaFees: data.caaFees,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_SERVICE_PROVIDER_SUCCESS,
        payload: res.data.data,
      });
      dispatch(
        setAlert(true, 'success', 'Service Provider Added Successfully')
      );
    } else {
      dispatch({
        type: ADD_SERVICE_PROVIDER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_SERVICE_PROVIDER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Service Provider
export const updateServiceProvider = (data, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SERVICE_PROVIDER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.SERVICEPROVIDER}/${id}`,
      {
        serviceProviderCode: data.serviceProviderCode,
        serviceProviderName: data.serviceProviderName,
        preffered: data.preffered,
        country: data.country,
        vatNo: data.vatNo,
        serviceProviderType: data.serviceProviderType,
        email: data.email,
        aftnSita: data.aftnSita,
        telephone: data.telephone,
        faxNumber: data.faxNumber,
        currency: data.currency,
        requestMethod: data.requestMethod,
        remark: data.remark,
        normal: data.normal,
        revision: data.revision,
        urgent: data.urgent,
        caaFees: data.caaFees,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_SERVICE_PROVIDER_SUCCESS,
        payload: res.data.data,
      });
      dispatch(
        setAlert(true, 'success', 'Service Provider Updated Successfully')
      );
    } else {
      dispatch({
        type: UPDATE_SERVICE_PROVIDER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_SERVICE_PROVIDER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Preffered Service Provider
export const updatePrefferedServiceProvider = ({ id, country }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: UPDATE_PREFFERED_SERVICE_PROVIDER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      `${path.SERVICEPROVIDER}/${id}/${country}`,
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_PREFFERED_SERVICE_PROVIDER_SUCCESS,
      });

      dispatch(
        setAlert(
          true,
          'success',
          'Preffered Service Provider Updated Successfully'
        )
      );
      dispatch(getServiceProviderByCountry(country));
    } else {
      dispatch({
        type: UPDATE_PREFFERED_SERVICE_PROVIDER_FAIL,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_PREFFERED_SERVICE_PROVIDER_FAIL,
    });
    dispatch(setAlert(true, 'error', err));
  }
};
