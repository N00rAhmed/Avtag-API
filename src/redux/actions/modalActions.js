import { OPEN_MODAL } from '../constants/modalConstants';

export const openModal = (
  modalOpen = false,
  modalName = '',
  modalSize = 'md',
  modalData = {}
) => ({
  type: OPEN_MODAL,
  modalOpen,
  modalName,
  modalSize,
  modalData,
});
