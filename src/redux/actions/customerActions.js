import {
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
} from '../constants/customerConstants';
import { setAlert } from './alertActions';
import path from '../../utils/path';
import { config } from '../../utils/config';
import GLOBAL_AXIOS from '../../utils/GLOBAL_AXIOS';

// ADD Customer
export const addCustomer = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CUSTOMER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.post(
      path.CUSTOMER,
      {
        customerDomain: data.customerdomain,
        customerName: data.customername,
        vatNumber: data.vatno,
        country: data.country,
        status: data.status,
        disbursment: parseInt(data.disbursment),
        creditDays: parseInt(data.creditdays),
        customerType: data.customertype,
        operation: {
          name: data.operationmanager,
          contactNo: data.operationtelecell,
          email: data.operationemail,
          emailRecipents: data.operationemailrecipents,
        },
        accounting: {
          name: data.financemanager,
          contactNo: data.accountingtelecell,
          email: data.accountingemail,
          emailRecipents: data.invoiceemailreceipents,
          address: data.billingaddress,
        },
        banking: {
          beneficiaryName: data.beneficiaryname,
          bankName: data.bankname,
          swiftCode: data.swiftcode,
          accountNo: data.accountno,
          ibanNo: data.ibanno,
          currency: data.currency,
          invoiceCurrency: data.invoicecurrency,
        },
      },
      config
    );
    if (res.data.status === 201) {
      dispatch({
        type: ADD_CUSTOMER_SUCCESS,
        payload: res.data.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Customer Added Successfully'));
    } else {
      dispatch({
        type: ADD_CUSTOMER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.error));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: ADD_CUSTOMER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};

// Update Customer
export const updateCustomer = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMER_REQUEST,
    });
    const res = await GLOBAL_AXIOS.put(
      `${path.CUSTOMER}/${data.id}`,
      {
        customerDomain: data.customerdomain,
        customerName: data.customername,
        vatNumber: data.vatno,
        country: data.country,
        status: data.status,
        disbursment: parseInt(data.disbursment),
        creditDays: parseInt(data.creditdays),
        customerType: data.customertype,
        operation: {
          name: data.operationmanager,
          contactNo: data.operationtelecell,
          email: data.operationemail,
          emailRecipents: data.operationemailrecipents,
        },
        accounting: {
          name: data.financemanager,
          contactNo: data.accountingtelecell,
          email: data.accountingemail,
          emailRecipents: data.invoiceemailreceipents,
          address: data.billingaddress,
        },
        banking: {
          beneficiaryName: data.beneficiaryname,
          bankName: data.bankname,
          swiftCode: data.swiftcode,
          accountNo: data.accountno,
          ibanNo: data.ibanno,
          currency: data.currency,
          invoiceCurrency: data.invoicecurrency,
        },
      },
      config
    );
    if (res.data.status === 200) {
      dispatch({
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      console.log(res);
      dispatch(setAlert(true, 'success', 'Customer Updated Successfully'));
    } else {
      dispatch({
        type: UPDATE_CUSTOMER_FAIL,
        payload: res.data,
      });
      dispatch(setAlert(true, 'error', res.data));
    }
  } catch (error) {
    const err = error.response.data.error
      ? error.response.data.error
      : error.message;
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: err,
    });
    dispatch(setAlert(true, 'error', err));
  }
};
