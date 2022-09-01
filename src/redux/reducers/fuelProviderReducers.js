import {
  ADD_FUEL_PROVIDER_REQUEST,
  ADD_FUEL_PROVIDER_SUCCESS,
  ADD_FUEL_PROVIDER_FAIL,
  UPDATE_FUEL_PROVIDER_REQUEST,
  UPDATE_FUEL_PROVIDER_SUCCESS,
  UPDATE_FUEL_PROVIDER_FAIL,
} from '../constants/fuelProviderConstants';

export const fuelProviderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FUEL_PROVIDER_REQUEST:
    case UPDATE_FUEL_PROVIDER_REQUEST:
      return { loading: true, success: false };
    case ADD_FUEL_PROVIDER_SUCCESS:
    case UPDATE_FUEL_PROVIDER_SUCCESS:
      return {
        loading: false,
        success: true,
        fuelProvider: payload,
      };
    case ADD_FUEL_PROVIDER_FAIL:
    case UPDATE_FUEL_PROVIDER_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
