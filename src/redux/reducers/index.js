import { combineReducers } from 'redux';

import alert from './alertReducers';
import modal from './modalReducers';
import {
  userRegisterReducer,
  userLoginReducer,
  loadUserReducer,
} from './userReducers';
import { addCustomerReducer, updateCustomerReducer } from './customerReducers';
import { getStaffProfileReducer } from './staffProfileReducers';
import { operatorReducer } from './operatorReducers';
import { createTripsheetReducer, getTripsheetReducer, updateTripsheetReducer } from './tripsheetReducers';
import { getIcaoIataReducer } from './airportReducers';
import { serviceProviderReducer, getServiceProviderByCountry, addServiceProvider, updateServiceProvider } from './serviceProviderReducers';
import { fuelProviderReducer } from './fuelProviderReducers';
import { fuelQuotationReducer } from './fuelQuotationReducers';
import { shiftReducer } from './shiftReducers';
import { shiftHandoverReducer } from './shiftHandoverReducers';
import {
  getGroundHandlersByICAOIATA,
  getICAOByCountry,
  addGroundHandler,
  updateGroundHandler
} from './groundHandlerReducers';

export default combineReducers({
  alert,
  modal,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  currentUser: loadUserReducer,
  addCustomer: addCustomerReducer,
  updateCustomer: updateCustomerReducer,
  operator: operatorReducer,
  createTripsheet: createTripsheetReducer,
  getTripsheet: getTripsheetReducer,
  updateTripsheet: updateTripsheetReducer,
  airportData: getIcaoIataReducer,
  serviceProvider: serviceProviderReducer,
  countryICAOS: getICAOByCountry,
  icaoGroundHandlers: getGroundHandlersByICAOIATA,
  fuelProvider: fuelProviderReducer,
  fuelQuotations: fuelQuotationReducer,
  getServiceProviderByCountry: getServiceProviderByCountry,
  addServiceProvider: addServiceProvider,
  addGroundHandler: addGroundHandler,
  updateGroundHandler: updateGroundHandler,
  updateServiceProvider: updateServiceProvider,
  getStaffProfiles: getStaffProfileReducer,
  shift: shiftReducer,
  shiftHandover: shiftHandoverReducer,
  
});
