import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Edit from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import useSWR from 'swr';

import { openModal } from '../../redux/actions/modalActions';
import path from '../../utils/path';
import DisplayTable from '../../components/DisplayTable/DisplayTable';
import { FuelDashboardHeadCells } from './HotelReservationData';

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

const BlockOverflightDashboard = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  // SWR
  const { data: fuelQuotations } = useSWR(path.FUELQUOTATION);
  // Table
  const { TblContainer, TblHead } = DisplayTable([], FuelDashboardHeadCells);
  return (
    <Grid container direction='column' spacing={3}>
      {/* 1st row start */}
      <Grid item md={12} xs={12} align='right'>
        <Button
          color='primary'
          className={`${classes.addButton} ${classes.buttonsSpace}`}
          variant='contained'
          type='submit'
          onClick={() => dispatch(openModal(true, 'HotelReservation', 'md'))}
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
            Create Hotel Reservation
          </div>
        </Button>
      </Grid>
      {/* 1st row end */}
      <Grid item xs={12}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {fuelQuotations &&
              fuelQuotations.data.map((fuelData) => (
                <TableRow key={fuelData._id}>
                  <TableCell className={classes.tableCell}>
                    {fuelData.icao}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.quoteNo}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {fuelData.customer}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.offerPrice}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {fuelData.fuelSupplier}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.markUp}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.actualPrice}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.effectiveDate}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {fuelData.expireDate}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Edit style={{ color: '#203764' }} />
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
