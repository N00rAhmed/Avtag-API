import {
  ADD_FUEL_QUOTATION_REQUEST,
  ADD_FUEL_QUOTATION_SUCCESS,
  ADD_FUEL_QUOTATION_FAIL,
  GET_SELECTED_FUEL_QUOTE,
} from '../constants/fuelQuotationConstants';

export const fuelQuotationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FUEL_QUOTATION_REQUEST:
      return { loading: true, success: false };
    case ADD_FUEL_QUOTATION_SUCCESS:
      return {
        loading: false,
        success: true,
        fuelQuotation: payload,
      };
    case GET_SELECTED_FUEL_QUOTE:
      return {
        loading: false,
        success: true,
        selectedFuelQuote: payload,
      };
    case ADD_FUEL_QUOTATION_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
