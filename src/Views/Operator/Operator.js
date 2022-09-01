import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import useSWR, { trigger } from 'swr';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useConfirm } from 'material-ui-confirm';

import { container } from '../../components/Common/CommonStyles';
import path from '../../utils/path';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import RHFAutoComplete from '../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';
import RHFDate from '../../components/RHF/RHFDate/RHFDate';
import { openModal } from '../../redux/actions/modalActions';
import {
  addOperator,
  updateOperator,
} from '../../redux/actions/operatorActions';

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

// Type Of Operations
const typeOfOperations = [
  'COMMERCIAL FLIGHT',
  'NON-COMMERCIAL FLIGHT',
  'PRIVATE FLIGHT',
];
// Available / Not Available
const AvailableNotAvailable = ['AVAILABLE', 'NOT AVAILABLE'];

const defaultValues = {
  airoperatingcertificate: Date.now(),
  certificateofairworthness: Date.now(),
  certificateofinsurance: Date.now(),
};

const Operator = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // SWR
  const { data: operators } = useSWR(path.ALLOPERATORS);
  const { data: countries } = useSWR(path.ALLCOUNTRIES);
  const { data: aircrafts } = useSWR(path.ALLAIRCRAFTS);
  // Redux
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.operator);
  // RHF
  const { handleSubmit, register, control, errors, reset, watch } = useForm({
    defaultValues,
  });
  const airoperatingcertificate = watch('airoperatingcertificate');
  const certificateofairworthness = watch('certificateofairworthness');
  const certificateofinsurance = watch('certificateofinsurance');
  // Confirm Dialog
  const confirm = useConfirm();
  // State
  const [selectedOperator, setSelectedOperator] = useState(null);
  // On Submit
  const onSubmit = (formData, e) => {
    if (formData.searchoperator !== '') {
      formData.id = selectedOperator._id;
      confirm({
        title: (
          <div style={{ fontSize: '1.1rem' }}>
            Are you sure you want to update operator information ?
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
          dispatch(updateOperator(formData));
        })
        .catch(() => {
          /* ... */
        });
    } else {
      dispatch(addOperator(formData));
    }
  };
  // Make call again to get all customer
  if (success) {
    trigger(path.ALLOPERATORS);
  }
  // Populate Form
  useEffect(() => {
    if (selectedOperator) {
      reset({
        operatorname: selectedOperator ? selectedOperator.operatorName : '',
        typeofoperations: selectedOperator
          ? selectedOperator.operationsType
          : '',
        aircraftprefix: selectedOperator ? selectedOperator.aircraftPrefix : '',
        registration: selectedOperator ? selectedOperator.registration : '',
        mtow: selectedOperator ? selectedOperator.mtow : '',
        zfw: selectedOperator ? selectedOperator.zfw : '',
        operatoricao: selectedOperator ? selectedOperator.operatorICAO : '',
        operatoriata: selectedOperator ? selectedOperator.operatorIATA : '',
        aircrafttype: selectedOperator ? selectedOperator.aircraftType : '',
        airlineoperatoraddress: selectedOperator
          ? selectedOperator.operatorAddress
          : '',
        airoperatingcertificate: selectedOperator
          ? selectedOperator.airOperatingCertificate
          : Date.now(),
        certificateofairworthness: selectedOperator
          ? selectedOperator.certificateOfAirworthness
          : Date.now(),
        certificateofinsurance: selectedOperator
          ? selectedOperator.certificateOfInsurance
          : Date.now(),
        certificateofregistration: selectedOperator
          ? selectedOperator.certificateOfRegistration
          : '',
        noisecertificate: selectedOperator
          ? selectedOperator.noiseCertificate
          : '',
      });
    }
  }, [selectedOperator, reset]);
  // Date Validation Icon
  const dateValidationIcon = (date) =>
    date >= new Date(new Date().toDateString()) ? (
      <Check
        style={{
          color: theme.palette.common.selectedMenuColor,
          marginTop: 5,
        }}
      />
    ) : (
      <Clear
        style={{
          color: theme.palette.common.secondaryColor,
          marginTop: 5,
        }}
      />
    );
  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Add Operator
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
                  Operator Details
                </Typography>
              </Grid>
              <Grid item md={4} xs={12}>
                <RHFAutoComplete
                  Options={operators && operators.data}
                  name='searchoperator'
                  optionLabel={(option) => option.operatorName.toUpperCase()}
                  disabled={operators && operators.data}
                  label='Select Operator'
                  inputRef={register()}
                  onChange={(event, newValue) => {
                    setSelectedOperator(null);
                    setSelectedOperator(newValue);
                    console.log(newValue);
                  }}
                />
              </Grid>
            </Grid>
            {/* 1st row end */}
            {/* 1st row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='operatorname'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Airline / Operator'
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
                  as={
                    <RHFSelect
                      error={errors.typeofoperations}
                      menuItem={typeOfOperations}
                      label='Type Of Operations'
                    />
                  }
                  name='typeofoperations'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Controller
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={countries && countries.data}
                      name='aircraftprefix'
                      disabled={countries && countries.data}
                      optionLabel={(option) => option.prefixCode}
                      renderOption={(option) =>
                        option.prefixCode + ' - ' + option.country
                      }
                      error={errors.aircraftprefix}
                      value={props.value || ''}
                      label='Aircraft Prefix'
                      onChange={(e, data) => {
                        if (data && data.prefixCode) {
                          onChange(data.prefixCode + ' - ' + data.country);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  onChange={([, data]) => data}
                  rules={{
                    required: 'this is required',
                  }}
                  name='aircraftprefix'
                  control={control}
                />
              </Grid>
            </Grid>
            {/* 1st row end */}
            {/* 2nd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='registration'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Registration'
                      rootHelperTextStyle={classes.input}
                      error={errors.registration}
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
                  name='mtow'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='MTOW'
                      error={errors.mtow}
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
                  name='zfw'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='ZFW'
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
            {/* 2nd row end */}
            {/* 3rd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Controller
                  name='operatoricao'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Operator ICAO'
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
                  name='operatoriata'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Operator IATA'
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
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={aircrafts && aircrafts.data}
                      name='aircrafttype'
                      disabled={aircrafts && aircrafts.data}
                      optionLabel={(option) => option.manufacture}
                      renderOption={(option) => option.manufacture}
                      error={errors.aircrafttype}
                      value={props.value || ''}
                      label='Aircraft Type'
                      onChange={(e, data) => {
                        if (data && data.icao) {
                          onChange(data.icao);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  onChange={([, data]) => data}
                  rules={{
                    required: 'this is required',
                  }}
                  name='aircrafttype'
                  control={control}
                />
              </Grid>
            </Grid>
            {/* 3rd row end */}
            {/* 4th row start */}
            <Grid item className={classes.space}>
              <Grid item xs={12}>
                <Controller
                  name='airlineoperatoraddress'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Airline / Operator Address'
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
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={4} xs={12}>
                <Grid item container direction='row' spacing={3}>
                  <Grid item xs={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFDate
                            helperText='Air Operating Certificate (Expiry Date)'
                            rootHelperTextStyle={classes.input}
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                        control={control}
                        name='airoperatingcertificate'
                        placeholder='Air Operating Certificate (Expiry Date)'
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    {dateValidationIcon(airoperatingcertificate)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} xs={12}>
                <Grid item container direction='row' spacing={3}>
                  <Grid item xs={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFDate
                            helperText='Certificate of Airworthness (Expiry Date)'
                            rootHelperTextStyle={classes.input}
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                        control={control}
                        name='certificateofairworthness'
                        placeholder='Certificate of Airworthness (Expiry Date)'
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    {dateValidationIcon(certificateofairworthness)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} xs={12}>
                <Grid item container direction='row' spacing={3}>
                  <Grid item xs={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFDate
                            helperText='Certificate of Insurance (Expiry Date)'
                            rootHelperTextStyle={classes.input}
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                        control={control}
                        name='certificateofinsurance'
                        placeholder='Certificate of Insurance (Expiry Date)'
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    {dateValidationIcon(certificateofinsurance)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 5th row end */}
            {/* 6th row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={6} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={AvailableNotAvailable}
                      label='Certificate of Registration'
                    />
                  }
                  name='certificateofregistration'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={AvailableNotAvailable}
                      label='Noise Certificate'
                    />
                  }
                  name='noisecertificate'
                  control={control}
                  defaultValue=''
                />
              </Grid>
            </Grid>
            {/* 6th row end */}
            {/* 10th row start */}
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
            {/* 10th row end */}
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default Operator;
