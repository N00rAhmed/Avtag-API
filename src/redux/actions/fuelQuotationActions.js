import {
  ADD_FUEL_QUOTATION_REQUEST,
  ADD_FUEL_QUOTATION_SUCCESS,
  ADD_FUEL_QUOTATION_FAIL,
  GET_SELECTED_FUEL_QUOTE,
} from '../constants/fuelQuotationConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// ADD Fuel Quotation
export const addFuelQuotation = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_FUEL_QUOTATION_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.FUELQUOTATION,
      {
        icao: data.icao,
        iata: data.iata,
        airport: data.airport,
        country: data.country,
        fuelSupplier: data.fuelSupplier,
        actualPrice: parseFloat(data.actualPrice),
        supplierUnitValue: data.supplierUnitValue,
        markUp: parseFloat(data.markUp),
        supplierMinUpliftSurcharges: data.supplierMinUpliftSurcharges,
        customer: data.customer,
        offerPrice: parseFloat(data.offerPrice),
        customerUnitValue: data.customerUnitValue,
        minUplift: data.minUplift,
        customerMinUpliftSurcharges: data.customerMinUpliftSurcharges,
        flightType: data.flightType,
        fuelType: data.fuelType,
        effectiveDate: data.effectiveDate,
        expireDate: data.expireDate,
        tax: data.tax,
        remark: data.remark,
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_FUEL_QUOTATION_SUCCESS,
        payload: res.data.data,
      });
      dispatch(setAlert(true, 'success', 'Fuel Quotation Added Successfully'));
    } else {
      dispatch({
        type: ADD_FUEL_QUOTATION_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_FUEL_QUOTATION_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Get Selected Fuel Quote
export const getSelectedFuelQuote = (fuelQuote) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_FUEL_QUOTE,
    payload: fuelQuote,
  });
};
