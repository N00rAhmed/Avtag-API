import {
  GET_ICAO_IATA_REQUEST,
  GET_ICAO_IATA_SUCCESS,
  GET_ICAO_IATA_FAIL,
  CLEAR_ICAO_IATA,
} from '../constants/airportConstants';

// Get ICAO/IATA
export const getIcaoIataReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ICAO_IATA_REQUEST:
      return { loading: true, success: false };
    case GET_ICAO_IATA_SUCCESS:
      return {
        loading: false,
        success: true,
        airport: payload,
      };
    case GET_ICAO_IATA_FAIL:
    case CLEAR_ICAO_IATA:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
