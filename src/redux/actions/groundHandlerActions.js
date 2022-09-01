import {
  GET_ICAO_BY_COUNTRY_REQUEST,
  GET_ICAO_BY_COUNTRY_SUCCESS,
  GET_ICAO_BY_COUNTRY_FAIL,
  GET_GROUNDHANDLER_BY_ICAO_REQUEST,
  GET_GROUNDHANDLER_BY_ICAO_SUCCESS,
  GET_GROUNDHANDLER_BY_ICAO_FAIL,
  GET_GROUNDHANDLER_BY_IATA_REQUEST,
  GET_GROUNDHANDLER_BY_IATA_SUCCESS,
  GET_GROUNDHANDLER_BY_IATA_FAIL,
  GET_SELECTED_GROUNDHANDLER_BY_ICAO_OR_IATA,
  GET_PREFERRED_GROUNDHANDLER_REQUEST,
  GET_PREFERRED_GROUNDHANDLER_SUCCESS,
  GET_PREFERRED_GROUNDHANDLER_FAIL,
  ADD_GROUND_HANDLER_REQUEST,
  ADD_GROUND_HANDLER_SUCCESS,
  ADD_GROUND_HANDLER_FAIL,
  UPDATE_GROUND_HANDLER_REQUEST,
  UPDATE_GROUND_HANDLER_SUCCESS,
  UPDATE_GROUND_HANDLER_FAIL,
} from '../constants/groundHandlerConstants';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';
import { setAlert } from './alertActions';

// Get ICAO by Country
export const getICAOByCountry = (country) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ICAO_BY_COUNTRY_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.GROUNDHANDLER}/${country}`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_ICAO_BY_COUNTRY_FAIL,
          payload: res.data,
        });
      }
      dispatch({
        type: GET_ICAO_BY_COUNTRY_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_ICAO_BY_COUNTRY_FAIL,
      payload: err,
    });
  }
};

// Get Ground Handlers by ICAO
export const getGroundHandlersByICAO = (icao) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUNDHANDLER_BY_ICAO_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.GROUNDHANDLER}/?icao=${icao}&sort=-preferred`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_GROUNDHANDLER_BY_ICAO_FAIL,
          payload: res.data,
        });
      }
      dispatch({
        type: GET_GROUNDHANDLER_BY_ICAO_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_GROUNDHANDLER_BY_ICAO_FAIL,
      payload: err,
    });
  }
};

// Get Ground Handlers by IATA
export const getGroundHandlersByIATA = (iata) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUNDHANDLER_BY_IATA_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.GROUNDHANDLER}/?iata=${iata}&sort=-preferred`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_GROUNDHANDLER_BY_IATA_FAIL,
          payload: res.data,
        });
      }
      dispatch({
        type: GET_GROUNDHANDLER_BY_IATA_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_GROUNDHANDLER_BY_IATA_FAIL,
      payload: err,
    });
  }
};

// Get Selected Ground Handler by ICAO / IATA
export const getSelectedGroundHandlerByICAOOrIATA = (groundhandler) => async (
  dispatch
) => {
  console.log(groundhandler)
  dispatch({
    type: GET_SELECTED_GROUNDHANDLER_BY_ICAO_OR_IATA,
    payload: groundhandler,
  });
};

// Get Preferred Ground Handler by ICAO
export const getPreferredGroundHandlerByICAO = (icao) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PREFERRED_GROUNDHANDLER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(
      `${path.GROUNDHANDLER}/?icao=${icao}&select=icao,iata,handlerName,vhfFreq,payment&preferred=true`,
      config
    );
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_PREFERRED_GROUNDHANDLER_FAIL,
          payload: res.data,
        });
        dispatch(
          setAlert(
            true,
            'error',
            `No Preffered Ground Handler Found For ${icao}`
          )
        );
      }
      dispatch({
        type: GET_PREFERRED_GROUNDHANDLER_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_PREFERRED_GROUNDHANDLER_FAIL,
      payload: err,
    });
  }
};


// Update Preffered Ground Handler
export const updatePrefferedGroundHandler = ({ icao, handlerName }) => async (
  dispatch
) => {
  try {
    // dispatch({
    //   type: UPDATE_PREFFERED_GROUND_HANDLER_REQUEST,
    // });
    const res = await GLOBAL_AXIOS.put(
      `${path.GROUNDHANDLER}/${icao}/${handlerName}`,
      config
    );
    if (res.data.status === 200) {
      // dispatch({
      //   type: UPDATE_PREFFERED_GROUND_HANDLER_SUCCESS,
      // });
      dispatch(getGroundHandlersByICAO(icao));
      dispatch(
        setAlert(
          true,
          'success',
          'Preffered Ground Handler Updated Successfully'
        )
      );
    } else {
      // dispatch({
      //   type: UPDATE_PREFFERED_GROUND_HANDLER_FAIL,
      // });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    // dispatch({
    //   type: UPDATE_PREFFERED_GROUND_HANDLER_FAIL,
    // });
    dispatch(setAlert(true, 'error', err));
  }
};

// ADD Ground Handler
export const addGroundHandler = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_GROUND_HANDLER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.GROUNDHANDLER,
      {
        icao:data.icao,
        iata:data.iata,
        airport:data.airport,
        country:data.country,
        handlerAgent:data.handlerAgent,
        handlingType:data.handlingType,
        handlerName:data.handlerName,
        email:data.email,
        telephone:data.telephone,
        fax:data.fax,
        vhfFreq:data.vhfFreq,
        payment:data.payment,
        preferred:false,
        remark:data.remark,
        taxId:data.taxId,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_GROUND_HANDLER_SUCCESS,
        payload: res.data.data,
      });
      dispatch(
        setAlert(true, 'success', 'Ground Handler Added Successfully')
      );
    } else {
      dispatch({
        type: ADD_GROUND_HANDLER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_GROUND_HANDLER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Ground Handler
export const updateGroundHandler = (data, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_GROUND_HANDLER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      `${path.GROUNDHANDLER}/${id}`,
      {
        icao:data.icao,
        iata:data.iata,
        airport:data.airport,
        country:data.country,
        handlerAgent:data.handlerAgent,
        handlingType:data.handlingType,
        handlerName:data.handlerName,
        email:data.email,
        telephone:data.telephone,
        fax:data.fax,
        vhfFreq:data.vhfFreq,
        payment:data.payment,
        preferred:data.preferred,
        remark:data.remark,
        taxId:data.taxId,
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_GROUND_HANDLER_SUCCESS,
        payload: res.data.data,
      });
      dispatch(
        setAlert(true, 'success', 'Ground Handler Updated Successfully')
      );
    } else {
      dispatch({
        type: UPDATE_GROUND_HANDLER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_GROUND_HANDLER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

