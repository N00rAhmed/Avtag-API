import {
  CREATE_STAFF_PROFILE_REQUEST,
  CREATE_STAFF_PROFILE_SUCCESS,
  CREATE_STAFF_PROFILE_FAIL,
  GET_STAFF_PROFILE_REQUEST,
  GET_STAFF_PROFILE_SUCCESS,
  GET_STAFF_PROFILE_FAIL,
  DELETE_STAFF_PROFILE_SUCCESS,
  UPDATE_STAFF_PROFILE_SUCCESS,
  REMOVE_STAFF_PROFILE_FROM_STATE
} from '../constants/staffProfileConstants';


// Get Staff Profile
export const getStaffProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STAFF_PROFILE_REQUEST:
      return { loading: true, success: false };
    case GET_STAFF_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        staffProfiles: payload,
    };
    case DELETE_STAFF_PROFILE_SUCCESS:
      const {staffProfiles} = state
      return {
        loading: false,
        success: true,
        staffProfiles: staffProfiles.filter(stfProf => stfProf._id !==payload ),
    };
    case CREATE_STAFF_PROFILE_SUCCESS: {
      const {staffProfiles} = state
      return {
        loading: false,
        success: true,
        staffProfiles: [...staffProfiles, payload],
      };
    }
    case UPDATE_STAFF_PROFILE_SUCCESS: {
      const {staffProfiles} = state
      return {
        loading: false,
        success: true,
        staffProfiles: staffProfiles.map(stfProf => stfProf._id ===payload._id ? {...payload} : stfProf ),
      };
    }
      
    // case REMOVE_staffProfile_FROM_STATE:
    //     return {
    //       loading: false,
    //       success: true,
    //       staffProfiles: null,
    //     };
    case GET_STAFF_PROFILE_FAIL:
    case REMOVE_STAFF_PROFILE_FROM_STATE:
      return {
        loading: false,
        success: false,
        error: payload,
        staffProfiles: null,
      };
    default:
      return state;
  }
};

