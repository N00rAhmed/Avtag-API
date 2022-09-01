import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';
import useSWR, { trigger } from 'swr';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import { useConfirm } from 'material-ui-confirm';

import { container } from '../../components/Common/CommonStyles';
import path from '../../utils/path';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import RHFAutoComplete from '../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';
import {
  addCustomer,
  updateCustomer,
} from '../../redux/actions/customerActions';
import { openModal } from '../../redux/actions/modalActions';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
  },
  input: {
    ...theme.typography.para,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: theme.palette.common.whiteColor,
    border: '0',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...container,
    minHeight: '20px',
  },
  content: {
    marginTop: '50px',
  },
  flex: {
    flex: 1,
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
    color: 'white',
  },
  close: {
    cursor: 'pointer',
  },
  selectMiddle: {
    textAlign: 'center',
  },
  selectRight: {
    textAlign: 'right',
  },
  paper: {
    padding: '0px',
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '460px',
    fontSize: '1rem',
    borderBottom: `4px solid ${theme.palette.common.primaryColor}`,
  },
}));

// Disbursment
const disbursment = Array.from(Array(22), (e, i) => i);
// Customer type
const customerType = [
  'CHARTER OPERATOR',
  'SCHEDULE AIRLINE',
  'PRIVATE OWNER',
  'CHARTER BROKER',
  'SERVICE PROVIDER',
  'MILITRY AIRCRAFT',
];

const Customer = () => {
  // Material-UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // SWR
  const { data } = useSWR(path.ALLCUSTOMERS);
  const { data: countries } = useSWR(path.ALLCOUNTRIES);
  // Redux
  const dispatch = useDispatch();
  const { success: customerAddedSuccessfully } = useSelector(
    (state) => state.addCustomer
  );
  const { success: customerUpdatedSuccessfully } = useSelector(
    (state) => state.updateCustomer
  );
  // RHF
  const { handleSubmit, register, control, errors, reset } = useForm();
  // Confirm Dialog
  const confirm = useConfirm();
  // State
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // Make call again to get all customer
  if (customerAddedSuccessfully || customerUpdatedSuccessfully) {
    trigger(path.ALLCUSTOMERS);
  }

  const onSubmit = (formData, e) => {
    if (formData.searchcustomer !== '') {
      formData.id = selectedCustomer._id;
      confirm({
        title: (
          <div style={{ fontSize: '1.1rem' }}>
            Are you sure you want to update customer information ?
          </div>
        ),
        dialogProps: {
          classes: { paper: classes.paper },
        },
        confirmationText: 'Confirm',
        cancellationButtonProps: {
          color: 'secondary',
          variant: 'contained',
          style: { fontSize: '0.8rem' },
        },
        confirmationButtonProps: {
          color: 'primary',
          variant: 'contained',
          style: { fontSize: '0.8rem' },
        },
      })
        .then(() => {
          dispatch(updateCustomer(formData));
        })
        .catch(() => {
          /* ... */
        });
    } else {
      dispatch(addCustomer(formData));
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      reset({
        customerdomain: selectedCustomer ? selectedCustomer.customerDomain : '',
        customerid: selectedCustomer ? selectedCustomer._id : '',
        customername: selectedCustomer ? selectedCustomer.customerName : '',
        vatno: selectedCustomer ? selectedCustomer.vatNumber : '',
        country: selectedCustomer ? selectedCustomer.country : '',
        status: selectedCustomer ? selectedCustomer.status : '',
        customertype: selectedCustomer ? selectedCustomer.customerType : '',
        disbursment: selectedCustomer ? selectedCustomer.disbursment : 0,
        creditdays: selectedCustomer ? selectedCustomer.creditDays : 0,
        operationmanager: selectedCustomer
          ? selectedCustomer.operation.name
          : '',
        operationtelecell: selectedCustomer
          ? selectedCustomer.operation.contactNo
          : '',
        operationemail: selectedCustomer
          ? selectedCustomer.operation.email
          : '',
        operationemailrecipents: selectedCustomer
          ? selectedCustomer.operation.emailRecipents
          : '',
        financemanager: selectedCustomer
          ? selectedCustomer.accounting.name
          : '',
        accountingtelecell: selectedCustomer
          ? selectedCustomer.accounting.contactNo
          : '',
        accountingemail: selectedCustomer
          ? selectedCustomer.accounting.email
          : '',
        invoiceemailreceipents: selectedCustomer
          ? selectedCustomer.accounting.emailRecipents
          : '',
        billingaddress: selectedCustomer
          ? selectedCustomer.accounting.address
          : '',
        beneficiaryname: selectedCustomer
          ? selectedCustomer.banking.beneficiaryName
          : '',
        bankname: selectedCustomer ? selectedCustomer.banking.bankName : '',
        swiftcode: selectedCustomer ? selectedCustomer.banking.swiftCode : '',
        accountno: selectedCustomer ? selectedCustomer.banking.accountNo : '',
        ibanno: selectedCustomer ? selectedCustomer.banking.ibanNo : '',
        currency: selectedCustomer ? selectedCustomer.banking.currency : '',
        invoicecurrency: selectedCustomer
          ? selectedCustomer.banking.invoiceCurrency
          : '',
      });
    }
  }, [selectedCustomer, reset]);

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Add Customer
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <CancelIcon
                onClick={() => dispatch(openModal(false, ''))}
                fontSize='large'
                className={classes.close}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <form
          style={{ padding: 0, margin: 0 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container direction='column'>
            {/* 1st row start */}
            <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
              <Grid item md={8} xs={12}>
                <Typography className={classes.secondaryHeading}>
                  Customer Details
                </Typography>
              </Grid>
              <Grid item md={4} xs={12}>
                {data && data.data && (
                  <RHFAutoComplete
                    Options={data && data.data}
                    name='searchcustomer'
                    optionLabel={(option) => option.customerName.toUpperCase()}
                    //value={autocompleteValue}
                    disabled={data && data.data}
                    label='Select Customer'
                    inputRef={register()}
                    onChange={(event, newValue) => {
                      setSelectedCustomer(null);
                      setSelectedCustomer(newValue);
                      console.log(newValue);
                    }}
                  />
                )}
              </Grid>
            </Grid>
            {/* 1st row end */}
            {/* 2nd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='customerdomain'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Customer Domain (example:  www.flytag.co)'
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='customername'
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue=''
                  control={control}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Customer Name'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.customername}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='vatno'
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='VAT #'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.vatno}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* 2nd row end */}
            {/* 3rd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='status'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFSelect
                      label='Status'
                      name={name}
                      value={value}
                      menuItem={['CONTRACTED', 'NON-CONTRACTED']}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={errors.status}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='customertype'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFSelect
                      label='Customer Type'
                      name={name}
                      value={value}
                      menuItem={customerType}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={errors.customertype}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12} className={classes.space}>
                <Grid item container direction='row' spacing={!matchesSM && 3}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      as={
                        <RHFSelect
                          error={errors.disbursment}
                          menuItem={disbursment}
                          label='Disbursment'
                          selectFieldStyle={classes.selectMiddle}
                        />
                      }
                      name='disbursment'
                      rules={{
                        required: 'this is required',
                      }}
                      control={control}
                      defaultValue=''
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Grid item container direction='row' spacing={2}>
                      <Grid item md={7} xs={10}>
                        <Controller
                          as={
                            <RHFSelect
                              error={errors.creditdays}
                              menuItem={[0, 3, 7, 14, 30, 45, 60, 90]}
                              label='Credit Days'
                              selectFieldStyle={classes.selectRight}
                            />
                          }
                          name='creditdays'
                          rules={{
                            required: 'this is required',
                          }}
                          control={control}
                          defaultValue=''
                        />
                      </Grid>
                      <Grid item md={5} xs={2}>
                        <Typography
                          style={{
                            color: theme.palette.common.primaryColor,
                            fontWeight: 'bold',
                            paddingTop: 4,
                          }}
                        >
                          DAYS
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 3rd row end */}
            {/* 4th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12} className={classes.space}>
                <Controller
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={countries && countries.data}
                      name='country'
                      disabled={countries && countries.data}
                      optionLabel={(option) => option.country}
                      error={errors.country}
                      value={props.value || ''}
                      label='Select Country'
                      onChange={(e, data) => {
                        if (data && data.country) {
                          onChange(data.country);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  onChange={([, data]) => data}
                  name='country'
                  control={control}
                />
              </Grid>
              <Grid item md={4} sm={false} />
              <Grid item md={4} sm={false} />
            </Grid>
            {/* 4th row end */}
            {/* 4th row start */}
            <Grid item md={12} xs={12}>
              <Typography className={classes.secondaryHeading}>
                Operational Information
              </Typography>
            </Grid>
            {/* 4th row end */}
            {/* 5th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='operationmanager'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'this is required',
                  }}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Operation Manager'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.operationmanager}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='operationtelecell'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'this is required',
                  }}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Tele / Cell'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.operationtelecell}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='operationemail'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'this is required',
                  }}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Email'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.operationemail}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* 5th row end */}
            {/* 6th row start */}
            <Grid item xs={12} className={classes.space}>
              <Controller
                name='operationemailrecipents'
                control={control}
                defaultValue=''
                rules={{
                  required: 'this is required',
                }}
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Email Recipents'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.operationemailrecipents}
                    inputRef={register({ required: 'required' })}
                  />
                )}
              />
            </Grid>
            {/* 6th row end */}
            {/* 7th row start */}
            <Grid item md={12} xs={12}>
              <Typography className={classes.secondaryHeading}>
                Accounting Information
              </Typography>
            </Grid>
            {/* 7th row end */}
            {/* 8th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='financemanager'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Finance Manager'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.financemanager}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='accountingtelecell'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Tele / Cell'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.accountingtelecell}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='accountingemail'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Email'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.accountingemail}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* 8th row end */}
            {/* 9th row start */}
            <Grid item xs={12}>
              <Controller
                name='invoiceemailreceipents'
                control={control}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Invoice Email Receipents'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.invoiceemailreceipents}
                    inputRef={register()}
                  />
                )}
              />
            </Grid>
            {/* 9th row end */}
            {/* 10th row start */}
            <Grid item xs={12} className={classes.space}>
              <Controller
                name='billingaddress'
                control={control}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Billing Address'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.billingaddress}
                    inputRef={register()}
                  />
                )}
              />
            </Grid>
            {/* 10th row end */}
            {/* 11th row start */}
            <Grid item md={12} xs={12}>
              <Typography className={classes.secondaryHeading}>
                Banking Information
              </Typography>
            </Grid>
            {/* 11th row end */}
            {/* 12th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='beneficiaryname'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Beneficiary Name'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.beneficiaryname}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='bankname'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Bank Name'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.bankname}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='swiftcode'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Swift Code'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.swiftcode}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* 12th row end */}
            {/* 13th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='accountno'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Account #'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.accountno}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  name='ibanno'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='IBAN #'
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      rootHelperTextStyle={classes.input}
                      error={errors.ibanno}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12} className={classes.space}>
                <Grid item container direction='row' spacing={!matchesSM && 3}>
                  <Grid item md={6} xs={12}>
                    <Controller
                      render={({ onChange, ...props }) => (
                        <RHFAutoComplete
                          Options={countries && countries.data}
                          name='currency'
                          disabled={countries && countries.data}
                          optionLabel={(option) => option.country}
                          renderOption={(option) =>
                            option.country +
                            ' - ' +
                            option.currency +
                            ' - ' +
                            option.currencyCode
                          }
                          error={errors.country}
                          value={props.value || ''}
                          label='Currency'
                          onChange={(e, data) => {
                            if (data && data.currencyCode) {
                              onChange(data.currencyCode);
                            } else {
                              onChange(e.target.value);
                            }
                          }}
                        />
                      )}
                      defaultValue=''
                      onChange={([, data]) => data}
                      name='currency'
                      control={control}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      render={({ onChange, ...props }) => (
                        <RHFAutoComplete
                          Options={countries && countries.data}
                          name='invoicecurrency'
                          disabled={countries && countries.data}
                          optionLabel={(option) => option.country}
                          renderOption={(option) =>
                            option.country +
                            ' - ' +
                            option.currency +
                            ' - ' +
                            option.currencyCode
                          }
                          error={errors.country}
                          value={props.value || ''}
                          label='Invoice Currency'
                          onChange={(e, data) => {
                            if (data && data.currencyCode) {
                              onChange(data.currencyCode);
                            } else {
                              onChange(e.target.value);
                            }
                          }}
                        />
                      )}
                      defaultValue=''
                      onChange={([, data]) => data}
                      name='invoicecurrency'
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 13th row end */}
            {/* 11th row start */}

            <Grid item xs={12} align='right'>
              <Button
                type='submit'
                color='primary'
                className={classes.addButton}
                variant='contained'
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SaveIcon
                    fontSize='small'
                    className={classes.addButtonIcon}
                  />
                  Save
                </div>
              </Button>
            </Grid>

            {/* 11th row end */}
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default Customer;
