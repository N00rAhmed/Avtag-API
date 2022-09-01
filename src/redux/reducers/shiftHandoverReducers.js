import {
  CREATE_SHIFT_HANDOVER_REQUEST,
  CREATE_SHIFT_HANDOVER_SUCCESS,
  CREATE_SHIFT_HANDOVER_FAIL,
  GET_SHIFT_HANDOVER_REQUEST,
  GET_SHIFT_HANDOVER_SUCCESS,
  GET_SHIFT_HANDOVER_FAIL,
  DELETE_SHIFT_HANDOVER_SUCCESS,
  UPDATE_SHIFT_HANDOVER_SUCCESS,
  REMOVE_SHIFT_HANDOVER_FROM_STATE
} from '../constants/shiftHandoverConstants';

export const shiftHandoverReducer = (state = {shiftHandovers:[], success: false}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SHIFT_HANDOVER_REQUEST:
      return { loading: true, success: false };
    case GET_SHIFT_HANDOVER_SUCCESS:
      return {
        loading: false,
        success: true,
        shiftHandovers: payload,
    };
    case DELETE_SHIFT_HANDOVER_SUCCESS:
      const {shiftHandovers} = state
      return {
        loading: false,
        success: true,
        // shiftHandovers: shiftHandovers.filter(shfHand => shfHand._id !==payload ),
    };
    case CREATE_SHIFT_HANDOVER_SUCCESS: {
      const {shiftHandovers} = state
      return {
        loading: false,
        success: true,
      };
    }
    case UPDATE_SHIFT_HANDOVER_SUCCESS: {
      const {shiftHandovers} = state
      return {
        loading: false,
        success: true,
      };
    }

    case GET_SHIFT_HANDOVER_FAIL:
    case REMOVE_SHIFT_HANDOVER_FROM_STATE:
      return {
        loading: false,
        success: false,
        error: payload,
        shiftHandovers: null,
      };
    default:
      return state;
  }
};

