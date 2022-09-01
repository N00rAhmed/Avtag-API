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
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TextsmsIcon from '@material-ui/icons/Textsms';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
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

const FlightWatch = () => {
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
                Flight Watch
              </Typography>
            </Grid>
            <Grid item container direction='row' >
              <Grid item md={12} xs={12}>
              <Grid item container direction='row'>
              <Grid item >
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{minWidth: '5px',height: '27px', borderRadius:"0%", backgroundColor:"#FF8000"}}
              >
                   <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:"center"
                  }}
                >
                   ...
                </div>
              </Button>
              </Grid>
              <Grid item md={11} xs={12}>
              <Controller
                  name='handlerName'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item >
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{minWidth: '5px',height: '27px', borderRadius:"0%"}}
              >
                   <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:"center"
                  }}
                >
                  <AddIcon
                    fontSize='small'
                    //className={classes.addButtonIcon}
                    //style={{marginRight:"5px"}}
                  />
                </div>
              </Button>
              </Grid>
              </Grid>
              </Grid>
            </Grid>
            <List component='nav' aria-label='ground handler' dense>
            <Fragment>
                  <ListItem button>
                    <ListItemText
                      primary='Lorem Ipsum is simply dummy text of the printing'
                      classes={{ primary: classes.input }}
                    />
                    <CloseIcon color='secondary'  />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                      classes={{ primary: classes.input }}
                    />
                    <CloseIcon color='secondary' />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                      classes={{ primary: classes.input }}
                    />
                    <CloseIcon color='secondary' />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."
                      classes={{ primary: classes.input }}
                    />
                    <CloseIcon color='secondary' />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
                      classes={{ primary: classes.input }}
                    />
                    <CloseIcon color='secondary' />
                  </ListItem>
                </Fragment>
            </List>
            
            
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
                   Create Flight Watch
                </div>
              </Button>
            </Grid>
          </Grid>
    </Fragment>
  );
};

export default FlightWatch;


