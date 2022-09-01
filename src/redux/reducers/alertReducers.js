import { SET_ALERT } from '../constants/alertConstants';

const initialState = {
  alertOpen: false,
  alertType: 'info',
  alertMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      const { alertOpen, alertMessage, alertType } = action;
      return {
        ...state,
        alertOpen,
        alertType,
        alertMessage,
      };
    default:
      return state;
  }
};
