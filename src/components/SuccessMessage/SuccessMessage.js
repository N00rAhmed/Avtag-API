import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { openModal } from '../../redux/actions/modalActions';

// Styling
const useStyles = makeStyles((theme) => ({
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
  header: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottom: `2px solid grey`,
    paddingBottom: 8
  },
  tagLine: {
    fontSize: '1rem',
    color: 'blue',
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  description: {
    fontSize: '1.1rem',
    color: theme.palette.common.primaryColor,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
}));

const SuccessMessage = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  return (
    <Fragment>
      <div className={classes.header}>Trip Sheet Successfully Saved !!!</div>
      <div className={classes.tagLine}>
        <span style={{ borderBottom: `1px solid grey`, paddingBottom: 3 }}>
          Your trip sheet has been successfully saved
        </span>
      </div>
      <div className={classes.description}>
        Operator:{' '}
        {modalData && modalData.operator && modalData.operator.toUpperCase()}
      </div>
      <div className={classes.description}>
        Customer:{' '}
        {modalData && modalData.customer && modalData.customer.toUpperCase()}
      </div>
      <div className={classes.description}>
        Registration:{' '}
        {modalData &&
          modalData.registration &&
          modalData.registration.toUpperCase()}
      </div>
      <div className={classes.description}>
        Itinerary:{' '}
        {modalData && modalData.itinerary && modalData.itinerary.toUpperCase()}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to='/admin/tripsheet'>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            onClick={() => dispatch(openModal(false, ''))}
          >
            Click Here To Return To Dashboard
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default SuccessMessage;
