import {
  GET_ICAO_IATA_REQUEST,
  GET_ICAO_IATA_SUCCESS,
  GET_ICAO_IATA_FAIL,
  CLEAR_ICAO_IATA,
} from '../constants/airportConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// Get ICAO/IATA
export const getIcaoIata = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ICAO_IATA_REQUEST,
    });
    const res = await GLOBAL_AXIOS.get(`${path.ALLAIRPORTS}/${data}`, config);
    if (res.data.status === 200) {
      if (res.data.data[0] === undefined) {
        dispatch({
          type: GET_ICAO_IATA_FAIL,
          payload: res.data,
        });
        dispatch(setAlert(true, 'error', 'Please enter correct ICAO / IATA'));
      }
      dispatch({
        type: GET_ICAO_IATA_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: GET_ICAO_IATA_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Clear ICAO /IATA
export const clearIcaoIata = () => ({
  type: CLEAR_ICAO_IATA,
});
