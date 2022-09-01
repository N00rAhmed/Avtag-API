/*eslint-disable*/
import React, { useState, useEffect, memo } from 'react';
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
// core components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Input as In } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';

import { openModal } from '../../../redux/actions/modalActions';
import { setAlert } from '../../../redux/actions/alertActions';
import { createTripsheet } from '../../../redux/actions/tripsheetActions';
import { getIcaoIata } from '../../../redux/actions/airportActions';
import path from '../../../utils/path';
import { TripRequest, Version, FlightCategory } from '../TripSheetData';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import FlightSchedule from './FlightSchedule';
import TripAccordian from './TripAccordian';
import FlightPermission from './FlightPermission';
import GroundHandler from './GroundHandler';
import Fuel from './Fuel';
import Remark from './Remark';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
  },
  input: {
    ...theme.typography.para,
  },
  selectOption: {
    ...theme.typography.selectOption,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    ...theme.typography.para,
    margin: 2,
    backgroundColor: theme.palette.common.primaryColor,
    color: theme.palette.common.whiteColor,
  },
  chipSelectedOption: {
    backgroundColor: `${theme.palette.common.optionHoverColor} !important`,
  },
  chipIcon: {
    //fill: theme.palette.common.secondaryColor,
  },
}));

const totalCrew = Array.from(Array(22), (e, i) => i + 1);

const CreateTripSheet = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Redux
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tripsheet);
  // SWR
  const { data: customer } = useSWR(path.ALLCUSTOMERS);
  const { data: operator } = useSWR(path.ALLOPERATORS);

  // RHF
  const { handleSubmit, register, control, errors, watch, setValue } = useForm({
    reValidateMode: 'onSubmit',
  });
  const schedule = useForm({
    reValidateMode: 'onSubmit',
  });
  const permission = useForm({
    reValidateMode: 'onSubmit',
  });
  const groundHandler = useForm({
    reValidateMode: 'onSubmit',
  });
  const fuel = useForm({
    reValidateMode: 'onSubmit',
  });
  const remark = useForm({
    reValidateMode: 'onSubmit',
  });

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    handleSubmit((data) => (formData.tripInfo = data))();
    schedule.handleSubmit((data) => (formData.schedule = data.schedule))();
    permission.handleSubmit(
      (data) => (formData.permission = data.permission)
    )();
    groundHandler.handleSubmit(
      (data) => (formData.groundHandler = data.groundHandler)
    )();
    fuel.handleSubmit((data) => (formData.fuel = data.fuel))();
    remark.handleSubmit((data) => (formData.remark = data.remark))();
    // Schedule
    if (
      schedule.errors.schedule &&
      Object.keys(schedule.errors.schedule).length !== 0
    ) {
      dispatch(setAlert(true, 'error', 'Re-check Empty Fields111'));
    }
    // Permission
    else if (
      permission.errors.permission &&
      Object.keys(permission.errors.permission).length !== 0
    ) {
      dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    }
    // Ground Handler
    else if (
      groundHandler.errors.groundHandler &&
      Object.keys(groundHandler.errors.groundHandler).length !== 0
    ) {
      dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    }
    // Fuel
    else if (fuel.errors.fuel && Object.keys(fuel.errors.fuel).length !== 0) {
      dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    }
    // Fuel
    else if (
      remark.errors.remark &&
      Object.keys(remark.errors.remark).length !== 0
    ) {
      dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    } else {
      setTimeout(() => {
        dispatch(createTripsheet(formData));
      }, 3000);
    }
  };

  // Errors
  // Schedule
  if (
    schedule.errors.schedule &&
    Object.keys(schedule.errors.schedule).length !== 0
  ) {
    dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    // schedule.clearErrors();
  }
  // Permission
  else if (
    permission.errors.permission &&
    Object.keys(permission.errors.permission).length !== 0
  ) {
    dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    // permission.clearErrors();
  }
  // Ground Handler
  else if (
    groundHandler.errors.groundHandler &&
    Object.keys(groundHandler.errors.groundHandler).length !== 0
  ) {
    dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    // groundHandler.clearErrors();
  }
  // Fuel
  else if (fuel.errors.fuel && Object.keys(fuel.errors.fuel).length !== 0) {
    dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    //fuel.clearErrors();
  }
  // Fuel
  else if (
    remark.errors.remark &&
    Object.keys(remark.errors.remark).length !== 0
  ) {
    dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
    //remark.clearErrors();
  }

  const flightrequest = watch('flightrequest');
  // Multiple Select Box
  const [tripRequest, setTripRequest] = useState([]);

  const handleTripRequestChange = (event) => {
    setTripRequest(event.target.value);
    setValue('triprequest', event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
        <Grid item xs={12} sm={12} md={7}>
          <Grid item xs={12}>
            <Typography className={classes.secondaryHeading}>
              Trip Information
            </Typography>
          </Grid>
          <Grid container item direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item xs={6}>
              <FormControl component='fieldset'>
                <FormHelperText
                  style={{ marginBottom: -10 }}
                  classes={{
                    root: classes.input,
                  }}
                >
                  Flight Request
                </FormHelperText>
                <Controller
                  as={
                    <RadioGroup row>
                      <FormControlLabel
                        value='Normal'
                        control={
                          <Radio
                            size='small'
                            color='primary'
                            style={{
                              color:
                                flightrequest === 'Normal' &&
                                theme.palette.common.selectedMenuColor,
                            }}
                          />
                        }
                        label='Normal'
                        classes={{
                          label: classes.input,
                        }}
                      />
                      <FormControlLabel
                        value='Urgent'
                        control={
                          <Radio
                            size='small'
                            color='primary'
                            style={{
                              color:
                                flightrequest === 'Urgent' &&
                                theme.palette.common.secondaryColor,
                            }}
                          />
                        }
                        label='Urgent'
                        classes={{
                          label: classes.input,
                        }}
                      />
                    </RadioGroup>
                  }
                  name='flightrequest'
                  defaultValue='Normal'
                  control={control}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Controller
                as={
                  <RHFSelect
                    error={errors.version}
                    menuItem={Version}
                    label='Select Version'
                  />
                }
                name='version'
                rules={{
                  required: 'this is required',
                }}
                control={control}
                defaultValue=''
              />
            </Grid>
          </Grid>
          <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item md={6} xs={12}>
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={customer ? customer.data : [{ customerName: '' }]}
                    name='customer'
                    button
                    buttonText='Register New AirLine Customer'
                    buttonClick={() => {
                      dispatch(openModal(true, 'Customer'));
                    }}
                    disabled={customer && customer.data}
                    optionLabel={(option) => option.customerName.toUpperCase()}
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
            <Grid item md={6} xs={12}>
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={operator ? operator.data : [{ operatorName: '' }]}
                    name='operator'
                    button
                    buttonText='Register New AirLine Operator'
                    buttonClick={() => {
                      dispatch(openModal(true, 'Operator'));
                    }}
                    disabled={operator && operator.data}
                    optionLabel={(option) =>
                      option.operatorName
                        ? option.operatorName.toUpperCase() +
                          ' - ' +
                          option.registration +
                          ' - ' +
                          option.aircraftType
                        : 'No Data'
                    }
                    error={errors.operator}
                    value={props.value || ''}
                    label='Select Operator'
                    onChange={(e, data) => {
                      if (data && data.operatorName) {
                        onChange(data.operatorName);
                        setValue('registration', data.registration, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        setValue('aircrafttype', data.aircraftType, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        setValue('typeofoperation', data.operationsType, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
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
                name='operator'
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item md={6} xs={12}>
              <Controller
                name='registration'
                control={control}
                rules={{
                  required: 'this is required',
                }}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Aircraft Registration'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.registration}
                    inputRef={register({ required: 'required' })}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name='aircrafttype'
                control={control}
                rules={{
                  required: 'this is required',
                }}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Aircraft Type'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.aircrafttype}
                    inputRef={register({ required: 'required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item md={6} xs={12}>
              <Grid item container direction='row' spacing={matchesSM ? 0 : 2}>
                <Grid item md={7} xs={12}>
                  <Controller
                    name='captainname'
                    control={control}
                    rules={{
                      required: 'this is required',
                    }}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        helperText='Captain Name'
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        rootHelperTextStyle={classes.input}
                        error={errors.captainname}
                        inputRef={register({ required: 'required' })}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={5} xs={12}>
                  <Controller
                    as={
                      <RHFSelect
                        error={errors.totalcrew}
                        menuItem={totalCrew}
                        label='Total Crew'
                      />
                    }
                    name='totalcrew'
                    rules={{
                      required: 'this is required',
                    }}
                    control={control}
                    defaultValue=''
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name='itinerary'
                control={control}
                rules={{
                  required: 'this is required',
                }}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Itinerary'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.itinerary}
                    inputRef={register({ required: 'required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item md={6} xs={12}>
              <Controller
                name='typeofoperation'
                control={control}
                rules={{
                  required: 'this is required',
                }}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Type Of Operation'
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    rootHelperTextStyle={classes.input}
                    error={errors.typeofoperation}
                    inputRef={register({ required: 'required' })}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                as={
                  <RHFSelect
                    error={errors.flightype}
                    menuItem={FlightCategory}
                    label='Flight Type'
                  />
                }
                name='flightype'
                rules={{
                  required: 'this is required',
                }}
                control={control}
                defaultValue=''
              />
            </Grid>
          </Grid>

          <Grid item md={12} xs={12} className={matchesSM ? '' : classes.space}>
            <Controller
              name='passengercargodetails'
              control={control}
              rules={{
                required: 'this is required',
              }}
              defaultValue=''
              render={({ onChange, onBlur, value, name }) => (
                <RHFInput
                  helperText='Passenger / Cargo Details'
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  rootHelperTextStyle={classes.input}
                  error={errors.passengercargodetails}
                  inputRef={register({ required: 'required' })}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Hidden smDown>
            <Grid item xs={false} md={12}>
              <Typography
                className={classes.secondaryHeading}
                style={{ color: '#fff' }}
              >
                Trip Request
              </Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={10}>
            <Controller
              as={
                <FormControl
                  fullWidth
                  error={errors.triprequest ? true : false}
                >
                  <Select
                    multiple
                    name='triprequest'
                    inputProps={{
                      classes: {
                        icon: classes.chipIcon,
                      },
                    }}
                    value={tripRequest}
                    onChange={handleTripRequestChange}
                    input={<In id='select-multiple-chip' />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {TripRequest.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                        classes={{
                          root: classes.selectOption,
                          selected: classes.chipSelectedOption,
                        }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText
                    style={{ marginTop: -2 }}
                    classes={{
                      root: classes.input,
                    }}
                  >
                    Select Request
                  </FormHelperText>
                </FormControl>
              }
              name='triprequest'
              rules={{
                required: 'this is required',
              }}
              control={control}
              defaultValue=''
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...schedule}>
          <TripAccordian heading='Flight Schedule'>
            <FlightSchedule />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...permission}>
          <TripAccordian heading='Flight Permission'>
            <FlightPermission />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...groundHandler}>
          <TripAccordian heading='Ground Handler'>
            <GroundHandler />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...fuel}>
          <TripAccordian heading='Fuel'>
            <Fuel />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...remark}>
          <TripAccordian heading='Remark'>
            <Remark />
          </TripAccordian>
        </FormProvider>
      </Grid>
      {/* 
      <TripAccordianPanels /> */}
      <Grid item xs={12} align='right' style={{ paddingTop: 15 }}>
        <form style={{ padding: 0, margin: 0 }}>
          <Button
            color='primary'
            className={classes.addButton}
            variant='contained'
            type='submit'
            onClick={formSubmit}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {loading ? (
                <CircularProgress
                  size={20}
                  color='primary'
                  className={classes.addButtonIcon}
                />
              ) : (
                <SaveIcon fontSize='small' className={classes.addButtonIcon} />
              )}
              Save
            </div>
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default CreateTripSheet;
