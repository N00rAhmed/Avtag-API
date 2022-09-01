import {
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
} from '../constants/customerConstants';

export const addCustomerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CUSTOMER_REQUEST:
      return { loading: true, success: false };
    case ADD_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
        customer: payload,
      };
    case ADD_CUSTOMER_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const updateCustomerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CUSTOMER_REQUEST:
      return { loading: true, success: false };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
        customer: payload,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
