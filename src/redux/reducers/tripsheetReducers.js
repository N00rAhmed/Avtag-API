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

// Create Trip Sheet
export const createTripsheetReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TRIPSHEET_REQUEST:
      return { loading: true, success: false };
    case CREATE_TRIPSHEET_SUCCESS:
      return {
        loading: false,
        success: true,
        tripsheet: payload,
      };
    case REMOVE_TRIPSHEET_FROM_STATE:
      return {
        loading: false,
        success: true,
        tripsheet: null,
      };
    case CREATE_TRIPSHEET_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

// Get Trip Sheet
export const getTripsheetReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRIPSHEET_REQUEST:
      return { loading: true, success: false };
    case GET_TRIPSHEET_SUCCESS:
      return {
        loading: false,
        success: true,
        tripsheet: payload,
      };
    case REMOVE_TRIPSHEET_FROM_STATE:
        return {
          loading: false,
          success: true,
          tripsheet: null,
        };
    case GET_TRIPSHEET_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

// Update Trip Sheet
export const updateTripsheetReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRIPSHEET_REQUEST:
      return { loading: true, success: false };
    case UPDATE_TRIPSHEET_SUCCESS:
      return {
        loading: false,
        success: true,
        tripsheet: payload,
      };
    case REMOVE_TRIPSHEET_FROM_STATE:
        return {
          loading: false,
          success: true,
          tripsheet: null,
        };
    case UPDATE_TRIPSHEET_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
