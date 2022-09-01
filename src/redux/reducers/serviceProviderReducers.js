import {
  GET_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
  GET_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
  GET_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
  UPDATE_PREFFERED_SERVICE_PROVIDER_REQUEST,
  UPDATE_PREFFERED_SERVICE_PROVIDER_SUCCESS,
  UPDATE_PREFFERED_SERVICE_PROVIDER_FAIL,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_REQUEST,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS,
  GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_FAIL,
  GET_SELECTED_SERVICE_PROVIDER_BY_COUNTRY,
  UPDATE_SERVICE_PROVIDER_REQUEST,
  UPDATE_SERVICE_PROVIDER_SUCCESS,
  UPDATE_SERVICE_PROVIDER_FAIL,
  ADD_SERVICE_PROVIDER_REQUEST,
  ADD_SERVICE_PROVIDER_SUCCESS,
  ADD_SERVICE_PROVIDER_FAIL,
} from '../constants/serviceProviderConstants';

// Get Service Provider by Country
export const getServiceProviderByCountry = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SERVICE_PROVIDER_BY_COUNTRY_REQUEST:
      return { loading: true, success: false };
    case GET_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
        country: payload,
      };
    case GET_SERVICE_PROVIDER_BY_COUNTRY_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

// Add Service Provider
export const addServiceProvider = (state = { loading: false,
  success: false, serviceProviderAdded: false}, action) => {
  const { type } = action;
  switch (type) {
    case ADD_SERVICE_PROVIDER_REQUEST:
      return { loading: true, success: false, serviceProviderAdded: false };
    case ADD_SERVICE_PROVIDER_SUCCESS:
      return {
        serviceProviderAdded: true,
        loading: false,
        success: true,
      };
    case ADD_SERVICE_PROVIDER_FAIL:
      return {
        loading: false,
        success: false,
        serviceProviderAdded: false,
      };
    default:
      return state;
  }
};

// Update Service Provider
export const updateServiceProvider = (state = { loading: false,
  success: false, serviceProviderUpdated: false}, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_SERVICE_PROVIDER_REQUEST:
      return { loading: true, success: false, serviceProviderUpdated: false };
    case UPDATE_SERVICE_PROVIDER_SUCCESS:
      return {
        serviceProviderUpdated: true,
        loading: false,
        success: true,
        
      };
    case UPDATE_SERVICE_PROVIDER_FAIL:
      return {
        loading: false,
        success: false,
        serviceProviderUpdated: false,
      };
    default:
      return state;
  }
};


// Service Provider
export const serviceProviderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PREFFERED_SERVICE_PROVIDER_REQUEST:
    case GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_REQUEST:
      return { loading: true, success: false };
    case UPDATE_PREFFERED_SERVICE_PROVIDER_SUCCESS:
      return {
        loading: false,
        success: true,
        updatePrefferedServiceProvider: true,
      };
    case GET_SELECTED_SERVICE_PROVIDER_BY_COUNTRY:
      return {
        loading: false,
        success: true,
        selectedServiceProvider: payload,
      };
    case GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
        prefferedServiceProvider: payload,
      };
    case UPDATE_PREFFERED_SERVICE_PROVIDER_FAIL:
    case GET_PREFFERED_SERVICE_PROVIDER_BY_COUNTRY_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};
