import {
  CREATE_SHIFT_REQUEST,
  CREATE_SHIFT_SUCCESS,
  CREATE_SHIFT_FAIL,
  GET_SHIFT_REQUEST,
  GET_SHIFT_SUCCESS,
  GET_SHIFT_FAIL,
  DELETE_SHIFT_SUCCESS,
  UPDATE_SHIFT_SUCCESS,
  REMOVE_SHIFT_FROM_STATE
} from '../constants/shiftConstants';


export const shiftReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SHIFT_REQUEST:
      return { loading: true, success: false };
    case GET_SHIFT_SUCCESS:
      return {
        loading: false,
        success: true,
        shifts: payload,
    };
    case DELETE_SHIFT_SUCCESS:
      const {shifts} = state
      return {
        loading: false,
        success: true,
        shifts: shifts.filter(shift => shift._id !==payload ),
    };
    case CREATE_SHIFT_SUCCESS: {
      const {shifts} = state
      return {
        loading: false,
        success: true,
        shifts: [...shifts, payload],
      };
    }
    case UPDATE_SHIFT_SUCCESS: {
      const {shifts} = state
      return {
        loading: false,
        success: true,
        shifts: shifts.map(shift => shift._id ===payload._id ? {...payload} : shift ),
      };
    }

    case GET_SHIFT_FAIL:
    case REMOVE_SHIFT_FROM_STATE:
      return {
        loading: false,
        success: false,
        error: payload,
        shifts: null,
      };
    default:
      return state;
  }
};

