/*eslint-disable*/
import React, { useState, useEffect, memo } from 'react';
import {Prompt} from 'react-router-dom'
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
import { useConfirm } from 'material-ui-confirm';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';

import { openModal } from '../../../redux/actions/modalActions';
import { setAlert } from '../../../redux/actions/alertActions';
import { createTripsheet, getTripsheet, removeTripsheetFromState, updateTripsheet } from '../../../redux/actions/tripsheetActions';
import { getIcaoIata } from '../../../redux/actions/airportActions';
import Loader from '../../../components/Loader/Loader';
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

const totalCrew = Array.from(Array(22), (e, i) => i + 1);

const CreateTripSheet = ({match}) => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Redux
  const dispatch = useDispatch();
  const { loading: getTripsheetLoading, tripsheet } = useSelector((state) => state.getTripsheet);
  const { loading: createTripsheetLoading, } = useSelector((state) => state.createTripsheet);
  const { loading: updateTripsheetLoading, } = useSelector((state) => state.updateTripsheet);
  // SWR
  const { data: customer } = useSWR(path.ALLCUSTOMERS);
  const { data: operator } = useSWR(path.ALLOPERATORS);

  // RHF
  const { handleSubmit, register, control, errors, watch, setValue } = useForm({
    reValidateMode: 'onSubmit',
  });
  const schedule = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false
  });
  const {...permission} = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValue:{
      permission: [{
        sector:'1'
      }]
    }
  });
  const groundHandler = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });
  const fuel = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
  });
  const remark = useForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
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

    setTimeout(() => {
      if(tripsheet && match.params.id !== undefined) {
        dispatch(updateTripsheet(formData, tripsheet._id));
      } else {
        dispatch(createTripsheet(formData));
      }
    }, 3000);
  };

  const flightrequest = watch('flightrequest');
  // Multiple Select Box
  const [tripRequest, setTripRequest] = useState([]);

  useEffect(() => {
    if(tripsheet && match.params.id !== undefined) {
      setValue('version',tripsheet.version)
      setValue('customer',tripsheet.customer)
      setValue('operator',tripsheet.operator)
      setValue('aircrafttype',tripsheet.aircraftType)
      setValue('registration',tripsheet.registration)
      setValue('captainname',tripsheet.captainName)
      setValue('totalcrew',tripsheet.totalCrew)
      setValue('itinerary',tripsheet.itinerary)
      setValue('typeofoperation',tripsheet.typeOfOperation)
      setValue('flightype',tripsheet.flightType)
      setValue('passengercargodetails',tripsheet.passengerCargoDetail)
      setValue('triprequest',tripsheet.tripRequest || [])
      setTripRequest(tripsheet.tripRequest || [])
    }
  },[tripsheet])

  useEffect(() => {
    if(match.params.id) {
      dispatch(getTripsheet(match.params.id));
    }
    return () => dispatch(removeTripsheetFromState())
  },[])

  const handleTripRequestChange = (event) => {
    setTripRequest(event.target.value);
    setValue('triprequest', event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Grid container direction='column' spacing={1}>
      <Loader open={createTripsheetLoading || updateTripsheetLoading} />
      <Loader open={getTripsheetLoading} title="Loading" />
      <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
        <Grid item xs={12} sm={12} md={7}>
          <Grid item xs={12}>
            <Typography className={classes.secondaryHeading}>
              Trip Information
            </Typography>
          </Grid>
          <Grid container item direction='row' spacing={matchesSM ? 0 : 3}>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                component='fieldset'
                style={{ backgroundColor: '#eee', paddingLeft: 10 }}
              >
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
                <FormHelperText
                  style={{ marginTop: -10 }}
                  classes={{
                    root: classes.input,
                  }}
                >
                  Flight Request
                </FormHelperText>
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
          <Grid item xs={12} md={12}>
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
        <Grid item xs={12} sm={12} md={4}>
          {/* <Hidden smDown>
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
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...schedule}>
          <TripAccordian heading='Flight Schedule'>
            <FlightSchedule schedule={tripsheet && tripsheet.schedule} />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...permission}>
          <TripAccordian heading='Flight Permission'>
            <FlightPermission permission={tripsheet && tripsheet.permission} />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...groundHandler}>
          <TripAccordian heading='Ground Handler'>
            <GroundHandler groundHandler={tripsheet && tripsheet.groundHandler}  />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...fuel}>
          <TripAccordian heading='Fuel'>
            <Fuel fuel={tripsheet && tripsheet.fuel} />
          </TripAccordian>
        </FormProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormProvider {...remark}>
          <TripAccordian heading='Remark'>
            <Remark remark={tripsheet && tripsheet.remark} />
          </TripAccordian>
        </FormProvider>
      </Grid>
      {/* 
      <TripAccordianPanels /> */}
      <Grid item xs={12} align='right' style={{ paddingTop: 15 }}>
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
            {createTripsheetLoading ? (
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
      </Grid>
    </Grid>
  );
};

export default CreateTripSheet;
