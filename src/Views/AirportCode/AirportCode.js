import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import useSWR from 'swr';

import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
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
    ...theme.typography.mainButton,
  },
  addButtonIcon: {
    ...theme.typography.mainButtonIcon,
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

const AirportCode = () => {
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
          <Grid item container direction='row' className={classes.space}>
          <Grid item md={8} xs={12}/>
          <Grid item md={4} xs={12} >
              <Controller
                name='searchICAO'
                control={control}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    rootHelperTextStyle={classes.input}
                    placeholder="Airport Code Search By : ICAO, IATA"
                    inputFieldHeight={30}
                    inputTextSize={17}
                    name={name}
                    // inputTextTransform="capitalize"
                    onKeyDown={onSearchICAOIATAkeyPress}
                    rootInputBackgroundColor='#e7f9f9'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={register()}
                  />
                )}
              />
          </Grid>
            </Grid>
            {(selectedAirport!== null && selectedAirport.icao !== undefined) &&
            <>
                <Grid item md={12} xs={12} className={classes.headingSpace}>
                    <Typography
                        className={classes.primaryHeading}
                    >
                        <span style={{fontWeight:"bolder"}}>{`${selectedAirport.icao} - ${selectedAirport.airportName && capitalize(selectedAirport.airportName.toLowerCase())}`}</span>
                    </Typography>
                </Grid>
                <Grid item md={12} xs={12} className={classes.headingSpace}>
                    <Typography
                        className={classes.secondaryHeading}
                    >
                        <span style={{fontWeight:"bolder"}}>{`Located in ${selectedAirport.cityName && capitalize(selectedAirport.cityName.toLowerCase())}, ${selectedAirport.countryName && capitalize(selectedAirport.countryName.toLowerCase())}`}</span>
                    </Typography>
                </Grid>
                <Grid item md={12} xs={12} className={classes.space}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <span style={{color:"red", fontWeight:"bolder"}}>{`ICAO - ${selectedAirport.icao}, IATA - ${selectedAirport.iata}`}</span>
                    </Typography>
                </Grid>
            </>}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={classes.secondaryHeading}
                style={{
                  borderBottom:`2px solid ${theme.palette.common.primaryColor}`
                }}
              >
                Country Information
              </Typography>
            </Grid>
            <Grid item container  className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>                            City :</pre> <span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.cityName && capitalize(selectedAirport.cityName.toLowerCase())}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>                       State : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.stateName && capitalize(selectedAirport.stateName.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>                     Country :</pre> <span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.countryName && capitalize(selectedAirport.countryName.toLowerCase())}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}><span style={{color:"red"}}>           Country FIR</span> : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.countryName && capitalize(selectedAirport.countryName.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>                          ICAO : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.icao}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>                        IATA : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.iata}</span>
                    </Typography>
                </Grid>
            </Grid>
            {/* 2nd row end */}
            {/* 3rd row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={classes.secondaryHeading}
                style={{
                    borderBottom:`2px solid ${theme.palette.common.primaryColor}`
                }}
              >
                Airport Technical Information
              </Typography>
            </Grid>
            <Grid item container  className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>      Longest Runway : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.longestRunway}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        Custom Available : <span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.customsAvailable && capitalize(selectedAirport.customsAvailable.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container  className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>       Airport of Entry : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.airportOfEntry && capitalize(selectedAirport.airportOfEntry.toLowerCase())}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>        Fire Category : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.fireCategory && capitalize(selectedAirport.fireCategory.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container  className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        Airport Open 24 Hr : <span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.airportOpenHour && capitalize(selectedAirport.airportOpenHour.toLowerCase())}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>       Fuel Available : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.fuelAvailable && capitalize(selectedAirport.fuelAvailable.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container  className={classes.space}>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>             Airport Type : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.airportType && capitalize(selectedAirport.airportType.toLowerCase())}</span>
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography
                        className={classes.tertiaryHeading}
                    >
                        <pre className={classes.preStyle}>              Crew Visa : </pre><span style={{fontWeight:"normal"}}>{selectedAirport && selectedAirport.crewVisa && capitalize(selectedAirport.crewVisa.toLowerCase())}</span>
                    </Typography>
                </Grid>
            </Grid>
          </Grid>
    </Fragment>
  );
};

export default AirportCode;
