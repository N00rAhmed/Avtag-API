import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';

import { container } from '../../Common/CommonStyles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.primaryColor,
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
    minHeight: '30px',
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7rem',
    },
  },
  dateHeading: {
    fontSize: '1rem',
    color: theme.palette.common.whiteColor,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      marginRight: 15,
    },
  },
  timeHeading: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      marginRight: 15,
    },
    color: theme.palette.common.whiteColor,
  },
}));

export default function Navbar(props) {
  // Material UI
  const classes = useStyles();
  // Redux
  const { name, email } = useSelector((state) => state.currentUser.userInfo);
  // State
  const [localAndUtcDateAndTime, setLocalAndUtcDateAndTime] = useState('');
  let currentDate = new Date();
  let month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][currentDate.getMonth()];
  let utcMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][currentDate.getUTCMonth()];
  //let formatDate = `${weekday}, ${currentDate.getDate()}-${month}-${currentDate.getFullYear()}`;
  let localTime = currentDate.toTimeString().slice(0, 5);
  let UTCTime = currentDate.toUTCString().slice(-12, -7);
  //let formatTime = `${localTime} LOCAL | ${UTCTime.replace(':', '')} UTC`;
  let uTCDateTime = `${currentDate.getUTCDate()}-${utcMonth}-${currentDate.getFullYear()} ${UTCTime}`;
  let localDateTime = `${currentDate.getDate()}-${month}-${currentDate.getFullYear()} ${localTime}`;
  let localAndUTCDateTime = `${uTCDateTime} (UTC) | ${localDateTime} (LOCAL)`;

  useEffect(
    () => {
      const interval = setInterval(() => {
        let currentDate = new Date();
        // let formatDate = `${currentDate.getDate()}-${month}-${currentDate.getFullYear()}`;
        let localTime = currentDate.toTimeString().slice(0, 5);
        let UTCTime = currentDate.toUTCString().slice(-12, -7);
        let uTCDateTime = `${currentDate.getUTCDate()}-${utcMonth}-${currentDate.getFullYear()} ${UTCTime}`;
        let localDateTime = `${currentDate.getDate()}-${month}-${currentDate.getFullYear()} ${localTime}`;
        // let formatTime = `${localTime} LOCAL | ${UTCTime.replace(':', '')} UTC`;
        let localAndUTCDateTime = `${uTCDateTime} (UTC) | ${localDateTime} (LOCAL)`;
        // setDate(formatDate);
        // setTime(formatTime);
        setLocalAndUtcDateAndTime(localAndUTCDateTime);
      }, 60000);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line
    []
  );

  // To Capatilize the data
  const capitalize = (str) => {
    const words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  };

  // get Route Name
  function makeBrand() {
    let name;
    [...props.routes, ...props.tRoutes, ...props.flightQuotesRoutes].map(
      (prop) => {
        if (window.location.href.indexOf(prop.layout + prop.urlPath) !== -1) {
          name = prop.name;
        }
        return null;
      }
    );
    return name;
  }
  return (
    <AppBar className={classes.appBar}>
      <Helmet>
        <title>{makeBrand()}</title>
      </Helmet>
      <Toolbar className={classes.container}>
        <Grid container>
          <Grid item xs={6} style={{ paddingTop: 15 }}>
            <div>
              <Typography className={classes.primaryHeading}>
                {makeBrand()}
              </Typography>
            </div>
          </Grid>

          <Grid item xs={6}>
            <Grid container direction='column' align='right'>
              <Typography className={classes.dateHeading}>
                {`Login : ${name && capitalize(name.toLowerCase())} | ${
                  email && email
                }`}
              </Typography>
              <Typography className={classes.timeHeading}>
                {localAndUtcDateAndTime !== ''
                  ? localAndUtcDateAndTime
                  : localAndUTCDateTime}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Hidden mdUp implementation='css'>
          <IconButton
            size='small'
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
