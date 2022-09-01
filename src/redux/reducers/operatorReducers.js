import {
  ADD_OPERATOR_REQUEST,
  ADD_OPERATOR_SUCCESS,
  ADD_OPERATOR_FAIL,
  UPDATE_OPERATOR_REQUEST,
  UPDATE_OPERATOR_SUCCESS,
  UPDATE_OPERATOR_FAIL,
} from '../constants/operatorConstants';

// ADD / UPDATE
export const operatorReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_OPERATOR_REQUEST:
    case UPDATE_OPERATOR_REQUEST:
      return { loading: true, success: false };
    case ADD_OPERATOR_SUCCESS:
    case UPDATE_OPERATOR_SUCCESS:
      return {
        loading: false,
        success: true,
        operator: payload,
      };
    case ADD_OPERATOR_FAIL:
    case UPDATE_OPERATOR_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
