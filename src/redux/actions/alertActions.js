import { SET_ALERT } from '../constants/alertConstants';

export const setAlert = (
  alertOpen,
  alertType = 'success',
  alertMessage = ''
) => ({
  type: SET_ALERT,
  alertOpen,
  alertType,
  alertMessage,
});
