import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import IconButton from '@material-ui/core/IconButton';
import TextsmsIcon from '@material-ui/icons/Textsms';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useSWR from 'swr';

import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import RHFDate from '../../components/RHF/RHFDate/RHFDate';
import { getIcaoIata } from '../../redux/actions/airportActions';
import Loader from '../../components/Loader/Loader';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  headingSpace: {
    marginBottom: '3px !important',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
    fontWeight: 500,
  },
  
  input: {
    ...theme.typography.para,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  customButton:{
    width:"100%",
    height:30
  },
  tertiaryHeading: {
    ...theme.typography.tertiaryHeading,
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
  },
  preStyle: {
    display: 'inline',
    margin: 0,
  },
}));

const MovementControl = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // Redux
  const dispatch = useDispatch();
  const { airport, loading } = useSelector((state) => state.airportData);
  // RHF
  const { register, control } = useForm();
// State
const [selectedAirport, setselectedSelectedAirport] = useState(null);

  const onSearchICAOIATAkeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const userValue = e.target.value;
      if (userValue.length === 4) {
        dispatch(getIcaoIata(userValue));
      } else if (userValue.length === 3) {
        dispatch(getIcaoIata(userValue));
      } else if (userValue.length === 2) {
        dispatch(getIcaoIata(userValue));
      }
    }
  };

  console.log(selectedAirport)

    useEffect(() => {
    if (airport && airport && airport[0]) {
        setselectedSelectedAirport(airport[0])
    }

    }, [airport]);

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
          <Grid container direction='column'>
          <Loader open={loading} title="Loading" />
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={classes.secondaryHeading}
                style={{
                  borderBottom:`2px solid ${theme.palette.common.primaryColor}`
                }}
              >
                Flight Details
              </Typography>
            </Grid>
            <Grid item container  spacing={3}>
                <Grid item md={3} xs={12}>
                <Grid container direction='row' >
                <Grid item md={11} xs={12}>
                  <Controller
                    name='searchICAO'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        helperText="Trip Sheet Number"
                        name={name}
                        onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={1} xs={12}>
                <IconButton
                      size='small'
                      aria-label='add'
                    >
                      <TextsmsIcon style={{ color: '#FF8000' }} />
                    </IconButton>
                </Grid>
                </Grid>
                 
                </Grid>
                <Grid item md={3} xs={12}>
                <Controller
                as={
                  <RHFSelect
                    menuItem={['NEW VENDER', 'UPDATE VENDER']}
                    label='Movement Type'
                  />
                }
                name='venderType'
                control={control}
                defaultValue=''
              />
                
                </Grid>
            </Grid>
            <Grid item container  spacing={3}>
                <Grid item md={3} xs={12}>
                  <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Operator / Airline"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
                <Grid item md={3} xs={12}>
                <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Customer"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
            </Grid>
            <Grid item container  spacing={3} className={classes.space}>
                <Grid item md={3} xs={12}>
                  <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Registration"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
                <Grid item md={3} xs={12}>
                <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Aircraft Type"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
            </Grid>
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={`${classes.secondaryHeading} ${classes.space}`}
                style={{
                    borderBottom:`2px solid ${theme.palette.common.primaryColor}`
                }}
              >
                Flight Time
              </Typography>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item md={3} xs={12}>
                  <Grid item container direction='row' spacing={2}>
                    <Grid item md={6} xs={12}>
                      <Controller
                        name='searchICAO'
                        control={control}
                        defaultValue=''
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            rootHelperTextStyle={classes.input}
                            helperText="Actual Departure Time"
                            name={name}
                            onKeyDown={onSearchICAOIATAkeyPress}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Controller
                            render={({ onChange, onBlur, value, name }) => (
                              <RHFDate
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
                  </Grid>
                </Grid>
                <Grid item md={3} xs={12}>
                <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Crew On Board"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item md={3} xs={12}>
                  <Grid item container direction='row' spacing={2}>
                    <Grid item md={6} xs={12}>
                      <Controller
                        name='searchICAO'
                        control={control}
                        defaultValue=''
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            rootHelperTextStyle={classes.input}
                            helperText="Flight Time"
                            name={name}
                            onKeyDown={onSearchICAOIATAkeyPress}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                    <Button
                      type='submit'
                      color='primary'
                      style={{ backgroundColor: '#FF8000' }}
                      className={classes.customButton}
                      variant='contained'
                    >
                      Calculate
                    </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={3} xs={12}>
                <Controller
                  name='searchICAO'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootHelperTextStyle={classes.input}
                      helperText="Passenger On Board"
                      name={name}
                      onKeyDown={onSearchICAOIATAkeyPress}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
                </Grid>
            </Grid>
            <Grid item container  spacing={3} className={classes.space}>
                <Grid item md={3} xs={12}>
                  <Grid item container direction='row' spacing={2}>
                    <Grid item md={6} xs={12}>
                      <Controller
                        name='searchICAO'
                        control={control}
                        defaultValue=''
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            rootHelperTextStyle={classes.input}
                            helperText="Estimated Departure Time"
                            name={name}
                            onKeyDown={onSearchICAOIATAkeyPress}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Controller
                            render={({ onChange, onBlur, value, name }) => (
                              <RHFDate
                                rootHelperTextStyle={classes.input}
                                name={name}
                                value={value}
                                onBlur={onBlur}
                                iconSize="small"
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
                  </Grid>
                </Grid>
            </Grid>
            <Grid item md={12}>
            <Button
                type='submit'
                color='primary'
                fullWidth
                className={classes.addButton}
                variant='contained'
                style={{width:"100%"}}
              >
                   <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:"center"
                  }}
                >
                  <SendIcon
                    fontSize='small'
                    className={classes.addButtonIcon}
                    style={{marginRight:"5px"}}
                  />
                   Send Movement
                </div>
              </Button>
            </Grid>
          </Grid>
    </Fragment>
  );
};

export default MovementControl;


