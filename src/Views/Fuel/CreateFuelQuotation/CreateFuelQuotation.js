import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useSWR from 'swr';

import { container } from '../../../components/Common/CommonStyles';
import path from '../../../utils/path';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import RHFDate from '../../../components/RHF/RHFDate/RHFDate';
import { openModal } from '../../../redux/actions/modalActions';
import { addFuelQuotation } from '../../../redux/actions/fuelQuotationActions';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import {
  getIcaoIata,
  clearIcaoIata,
} from '../../../redux/actions/airportActions';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
    fontWeight: 500,
    borderBottom: `2px solid ${theme.palette.common.primaryColor}`,
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
    backgroundColor: theme.palette.primary.primaryColor,
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
  item: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  checkBoxSpace: {
    paddingLeft: '0px !important',
  },
  airportDescription: {
    ...theme.typography.h3,
  },
}));

const defaultValues = {
  effectiveDate: Date.now(),
  expireDate: Date.now(),
};

const CreateFuelUplift = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // Redux
  const dispatch = useDispatch();
  const { airport, loading } = useSelector((state) => state.airportData);
  // State
  const [checkBoxValue, setcheckBoxValue] = useState(false);
  // SWR
  const { data: fuelProviders } = useSWR(path.FUELPROVIDER);
  const { data: customer } = useSWR(path.ALLCUSTOMERS);
  // RHF
  const {
    handleSubmit,
    register,
    control,
    errors,
    getValues,
    setValue,
    reset,
  } = useForm({ defaultValues });
  // Mount
  useEffect(() => {
    if (checkBoxValue) {
      reset({
        ...getValues(),
        minUplift: '1000 USG',
        customerMinUpliftSurcharges: '75 USD',
      });
    }
    if (!checkBoxValue) {
      reset({
        ...getValues(),
        minUplift: '',
        customerMinUpliftSurcharges: '',
      });
    }
  }, [checkBoxValue, getValues, reset]);
  const handleCheckboxChange = () => setcheckBoxValue(!checkBoxValue);

  // On Submit
  const onSubmit = (formData, e) => {
    formData.icao =
      airport && airport[0] && airport[0].icao ? airport[0].icao : '----';
    formData.iata =
      airport && airport[0] && airport[0].iata ? airport[0].iata : '---';
    formData.airport =
      airport && airport[0] && airport[0].airportName
        ? airport[0].airportName
        : 'Not Found';
    formData.country =
      airport && airport[0] && airport[0].countryName
        ? airport[0].countryName
        : 'Not Found';
    formData.effectiveDate = new Date(
      formData.effectiveDate
    ).toLocaleDateString('en-US');
    formData.expireDate = new Date(formData.expireDate).toLocaleDateString(
      'en-US'
    );
    dispatch(addFuelQuotation(formData));
  };
  // To Capatilize the data
  const capitalize = (str) => {
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  };

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Fuel Quotation
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <CancelIcon
                onClick={() => {
                  dispatch(openModal(false, ''));
                  airport && airport[0] && dispatch(clearIcaoIata());
                }}
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
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Airport Information
              </Typography>
              {loading && <LinearProgress />}
            </Grid>
            {/* 1st row end */}
            {/* 2nd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12} className={classes.space}>
                <Controller
                  name='icao_iata'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='ICAO / IATA'
                      rootHelperTextStyle={classes.input}
                      error={errors.icao_iata}
                      name={name}
                      value={value}
                      onBlur={(e) => {
                        e.preventDefault();
                        dispatch(getIcaoIata(value));
                      }}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={10} xs={12} className={classes.space}>
                <Grid item container direction='column' align='right'>
                  <Grid item md={12}>
                    <Typography
                      className={classes.airportDescription}
                      color='secondary'
                    >
                      {airport &&
                        airport[0] &&
                        `ICAO - ${airport[0].icao}, IATA - ${
                          airport[0].iata
                        } | Airport :  ${
                          airport[0].airportName
                            ? capitalize(airport[0].airportName.toLowerCase())
                            : 'Not Found'
                        }`}
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography color='secondary'>
                      {airport &&
                        airport[0] &&
                        `City -  ${
                          airport[0].cityName
                            ? capitalize(airport[0].cityName.toLowerCase())
                            : 'Not Found'
                        }, Province : ${
                          airport[0].stateName
                            ? capitalize(airport[0].stateName.toLowerCase())
                            : 'Not Found'
                        } | Country : ${
                          airport[0].stateName
                            ? capitalize(airport[0].countryName.toLowerCase())
                            : 'Not Found'
                        }`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 2nd row end */}
            {/* 3rd row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Supplier Offer Price
              </Typography>
            </Grid>
            {/* 3rd row end */}
            {/* 4th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12} className={classes.space}>
                <Controller
                  as={
                    <RHFSelect
                      error={errors.fuelSupplier}
                      menuItem={
                        fuelProviders &&
                        fuelProviders.data &&
                        fuelProviders.data[0]
                          ? fuelProviders.data.map((i) => i.fuelProvider)
                          : ['NO DATA FOUND']
                      }
                      label='Fuel Supplier'
                    />
                  }
                  name='fuelSupplier'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='actualPrice'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Actual Price'
                      rootInputBackgroundColor='#CCFFFF'
                      inputTextAlign='center'
                      error={errors.actualPrice}
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={() => {
                        let offerPriceValue = getValues('markUp')
                          ? parseFloat(value) + parseFloat(getValues('markUp'))
                          : parseFloat(value);

                        setValue('offerPrice', offerPriceValue.toFixed(2));
                      }}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={[
                        'USD / USG ( Per US Gallon Price )',
                        'USD / LTR ( Per Liter Price )',
                        'USC / LTR ( Per Liter Price )',
                        'USD / MT ( Per Metric Ton Price )',
                        'EUR / USG ( Per US Gallon Price )',
                        'EUR / LTR ( Per Liter Price )',
                        'EUR / MT ( Per Metric Ton Price )',
                      ]}
                      label='Unit Value'
                    />
                  }
                  name='supplierUnitValue'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='markUp'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Markup'
                      inputTextAlign='center'
                      rootInputBackgroundColor='#CCFFFF'
                      error={errors.markUp}
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={() => {
                        let offerPriceValue = getValues('actualPrice')
                          ? parseFloat(getValues('actualPrice')) +
                            parseFloat(value)
                          : parseFloat(value);

                        setValue('offerPrice', offerPriceValue.toFixed(2));
                      }}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='supplierMinUpliftSurcharges'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Min Uplift Surcharge'
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
            </Grid>
            {/* 4th row end */}
            {/* 5th row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Customer Offer Price
              </Typography>
            </Grid>
            {/* 5th row end */}
            {/* 6th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12} className={classes.space}>
                {/* <Controller
                  name='customer'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Customer'
                      rootHelperTextStyle={classes.input}
                      error={errors.customer}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                /> */}
                <Controller
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={
                        customer ? customer.data : [{ customerName: '' }]
                      }
                      name='customer'
                      disabled={customer && customer.data}
                      optionLabel={(option) =>
                        option.customerName.toUpperCase()
                      }
                      error={errors.customer}
                      value={props.value || ''}
                      label='Select Customer'
                      onChange={(e, data) => {
                        if (data && data.customerName) {
                          onChange(data.customerName);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  rules={{
                    required: 'this is required',
                  }}
                  onChange={([, data]) => data}
                  name='customer'
                  control={control}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='offerPrice'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Offer Price'
                      error={errors.offerPrice}
                      inputTextAlign='center'
                      rootInputBackgroundColor='#CCFFFF'
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
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={[
                        'USD / USG ( Per US Gallon Price )',
                        'USD / LTR ( Per Liter Price )',
                        'USC / LTR ( Per Liter Price )',
                        'USD / MT ( Per Metric Ton Price )',
                        'EUR / USG ( Per US Gallon Price )',
                        'EUR / LTR ( Per Liter Price )',
                        'EUR / MT ( Per Metric Ton Price )',
                      ]}
                      label='Unit Value'
                    />
                  }
                  name='customerUnitValue'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Grid item container direction='row' spacing={!matchesSM && 3}>
                  <Grid item md={2} xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='medium'
                          name='checkBoxValue'
                          checked={checkBoxValue}
                          classes={{ root: classes.checkBoxSpace }}
                          onChange={handleCheckboxChange}
                        />
                      }
                    />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <Controller
                      name='minUplift'
                      control={control}
                      defaultValue=''
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          helperText='Min Uplift'
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
                </Grid>
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='customerMinUpliftSurcharges'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Min Uplift Surcharge'
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
            </Grid>

            {/* 7th row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Uplift Information
              </Typography>
            </Grid>
            {/* 7th row end */}
            {/* 8th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={[
                        'Commercial International Flight',
                        'Private International Flight',
                        'Domestic Flight',
                      ]}
                      label='Flight Type'
                    />
                  }
                  name='flightType'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={['Jet A1', 'Avgas / 100LL', 'TC - 1']}
                      label='Fuel Type'
                    />
                  }
                  name='fuelType'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFDate
                        helperText='Effective Date'
                        rootHelperTextStyle={classes.input}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                    control={control}
                    name='effectiveDate'
                    // defaultValue={Date.now()}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={2} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFDate
                        helperText='Expiry Date'
                        rootHelperTextStyle={classes.input}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                    control={control}
                    name='expireDate'
                    // defaultValue={Date.now()}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            {/* 8th row end */}
            {/* 9th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={6} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={[
                        'ALL INCLUSIVE',
                        'BELOW DTF NOT INCLUDED IN ABOVE OFFERED FUEL PRICE',
                      ]}
                      label='Tax / Into Plan Fees'
                    />
                  }
                  name='tax'
                  control={control}
                  defaultValue=''
                />
              </Grid>
            </Grid>
            {/* 9th row end */}
            {/* 10th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={12} xs={12}>
                <Controller
                  name='remark'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Remark'
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
            </Grid>
            {/* 10th row end */}
            {/* 11th row start */}
            <Grid item>
              <Grid item xs={12} align='right'>
                <Button
                  color='primary'
                  className={classes.addButton}
                  variant='contained'
                  type='submit'
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
            </Grid>
            {/* 11th row end */}
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateFuelUplift;
