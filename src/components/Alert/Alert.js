import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { setAlert } from '../../redux/actions/alertActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const CustomizedAlerts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { alertOpen, alertType, alertMessage } = useSelector(
    (state) => state.alert
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlert(false, alertType, alertMessage));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          color={alertType}
          style={{ fontSize: '1rem' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedAlerts;
