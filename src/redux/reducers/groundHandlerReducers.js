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

// get ICAO by Country
export const getICAOByCountry = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ICAO_BY_COUNTRY_REQUEST:
      return { loading: true, success: false };
    case GET_ICAO_BY_COUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
        data: payload,
      };
    case GET_ICAO_BY_COUNTRY_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

// Add Ground Handler
export const addGroundHandler = (state = { loading: false,
  success: false, groundHandlerAdded: false}, action) => {
  const { type } = action;
  switch (type) {
    case ADD_GROUND_HANDLER_REQUEST:
      return { loading: true, success: false, groundHandlerAdded: false };
    case ADD_GROUND_HANDLER_SUCCESS:
      return {
        groundHandlerAdded: true,
        loading: false,
        success: true,
      };
    case ADD_GROUND_HANDLER_FAIL:
      return {
        loading: false,
        success: false,
        groundHandlerAdded: false,
      };
    default:
      return state;
  }
};

// update Ground Handler
export const updateGroundHandler = (state = { loading: false,
  success: false, groundHandlerUpdated: false}, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_GROUND_HANDLER_REQUEST:
      return { loading: true, success: false, groundHandlerUpdated: false };
    case UPDATE_GROUND_HANDLER_SUCCESS:
      return {
        groundHandlerUpdated: true,
        loading: false,
        success: true,
      };
    case UPDATE_GROUND_HANDLER_FAIL:
      return {
        loading: false,
        success: false,
        groundHandlerUpdated: false,
      };
    default:
      return state;
  }
};

// get Ground Handlers by ICAO/IATA
export const getGroundHandlersByICAOIATA = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUNDHANDLER_BY_ICAO_REQUEST:
    case GET_GROUNDHANDLER_BY_IATA_REQUEST:
    case GET_PREFERRED_GROUNDHANDLER_REQUEST:
      return { loading: true, success: false };
    case GET_GROUNDHANDLER_BY_ICAO_SUCCESS:
    case GET_GROUNDHANDLER_BY_IATA_SUCCESS:
      return {
        loading: false,
        success: true,
        data: payload,
      };
    case GET_SELECTED_GROUNDHANDLER_BY_ICAO_OR_IATA:
      return {
        loading: false,
        success: true,
        selectedGroundHandler: payload,
      };
    case GET_PREFERRED_GROUNDHANDLER_SUCCESS:
      return {
        loading: false,
        success: true,
        preferredGroundHandler: payload,
      };
    case GET_GROUNDHANDLER_BY_ICAO_FAIL:
    case GET_GROUNDHANDLER_BY_IATA_FAIL:
    case GET_PREFERRED_GROUNDHANDLER_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
