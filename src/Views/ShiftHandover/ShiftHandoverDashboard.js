import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch,useSelector } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { useConfirm } from 'material-ui-confirm';
import useSWR from 'swr';

import { openModal } from '../../redux/actions/modalActions';
import path from '../../utils/path';
import DisplayTable from '../../components/DisplayTable/DisplayTable';
import { FuelDashboardHeadCells } from './ShiftHandoverData';

import {
  deleteShiftHandover
} from '../../redux/actions/shiftHandoverActions';

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

const BlockOverflightDashboard = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalName } = useSelector((state) => state.modal);
  const { success } = useSelector((state) => state.shiftHandover);
  // SWR
  const { data: shiftHandovers, mutate } = useSWR(path.SHIFTHANDOVER);
  // Confirm Dialog
  const confirm = useConfirm();


  useEffect(() => {
    mutate()
  },[modalName, success])
  // Table
  const { TblContainer, TblHead } = DisplayTable([], FuelDashboardHeadCells);


  const deleteSelectedShift = (id) => {
    confirm({
      title: (
        <div style={{ fontSize: '1.1rem' }}>
          Are you sure you want to delete Shift Handover?
        </div>
      ),
      dialogProps: {
        classes: { paper: classes.paper },
      },
      confirmationText: 'Confirm',
      cancellationButtonProps: {
        color: 'secondary',
        variant: 'contained',
        style: { fontSize: '0.8rem' },
      },
      confirmationButtonProps: {
        color: 'primary',
        variant: 'contained',
        style: { fontSize: '0.8rem' },
      },
    })
      .then(() => {
        dispatch(deleteShiftHandover(id))
      })
      .catch(() => {
        /* ... */
      });
  };

  return (
    <Grid container direction='column' spacing={3}>
      {/* 1st row start */}
      <Grid item md={12} xs={12} align='right'>
        <Button
          color='primary'
          className={`${classes.addButton} ${classes.buttonsSpace}`}
          variant='contained'
          type='submit'
          onClick={() => {
            const data = false
            dispatch(openModal(true, 'ShiftHandover', 'md', data))
          }}
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
            Create Shift Handover
          </div>
        </Button>
        <Button
          color='primary'
          className={classes.addButton}
          variant='contained'
          type='submit'
          onClick={() => dispatch(openModal(true, 'ShiftHandoverPreference', 'md'))}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SettingsIcon
              fontSize='small'
              className={classes.addButtonIcon}
            />
            Preference
          </div>
        </Button>
      </Grid>
      {/* 1st row end */}
      <Grid item xs={12}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {shiftHandovers && shiftHandovers.data.length !== 0 && 
              shiftHandovers.data.map((shift) => (
                <TableRow key={shift._id}>
                  <TableCell className={classes.tableCell}>
                    {shift.shiftType}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {shift.shiftTiming}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {shift.staffName}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {shift.jobTitle}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {shift.prepareTime}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {shift.prepareDate}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Edit style={{ color: '#203764' }} onClick={() => {
                        const data = shift
                        dispatch(
                          openModal(true, 'ShiftHandover', 'md', data)
                        );
                    }} />
                    <DeleteIcon onClick={() => deleteSelectedShift(shift._id)} style={{ color: '#CC0000' }} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
      </Grid>
    </Grid>
  );
};

export default BlockOverflightDashboard;
