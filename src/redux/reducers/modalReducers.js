import { OPEN_MODAL } from '../constants/modalConstants';

const initialState = {
  modalOpen: false,
  modalName: '',
  modalSize: 'md',
  modalData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalOpen, modalName, modalSize, modalData } = action;
      return {
        ...state,
        modalOpen,
        modalName,
        modalSize,
        modalData,
      };
    default:
      return state;
  }
};
