import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { container } from '../../Common/CommonStyles';
import logo from '../../../assets/img/avtagfooter.png';

const useStyles = makeStyles((theme) => ({
  container: {
    ...container,
    minHeight: '53px',
    // marginTop: '50px',
    marginBottom: 0,
    backgroundColor: theme.palette.common.primaryColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: 50,
  },
  footerText: {
    fontSize: '1rem',
    color: theme.palette.common.whiteColor,

    paddingRight: 5,
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={logo} className={classes.img} alt='Footer logo' />

      <Typography className={classes.footerText}>
        Copyright © Avtag Pro. All Rights Reserved.
      </Typography>
    </div>
  );
};

export default Footer;
