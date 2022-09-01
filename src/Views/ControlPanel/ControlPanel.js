import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { openModal } from '../../redux/actions/modalActions';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
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
  buttonsSpace: {
    marginRight: '10px',
  },
  tableCell: {
    width: 10,
  },
}));

const ControlPanel = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  return (
    <Grid container direction='column' spacing={3}>
      {/* 1st row start */}
      <Grid item md={12} xs={12} align='left'>
        <Button
          color='primary'
          className={`${classes.addButton} ${classes.buttonsSpace}`}
          variant='contained'
          type='submit'
          onClick={() => dispatch(openModal(true, 'StaffProfile', 'md'))}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AddCircleOutlineIcon
              fontSize='small'
              className={classes.addButtonIcon}
            />
            Create Staff Profile
          </div>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ControlPanel;