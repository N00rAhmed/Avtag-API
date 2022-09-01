import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import useSWR from 'swr';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';

import path from '../../../utils/path';
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import { container } from '../../../components/Common/CommonStyles';
import { openModal } from '../../../redux/actions/modalActions';
import { SelectFuelQuoteHeadCells } from '../TripSheetData';
import { getSelectedFuelQuote } from '../../../redux/actions/fuelQuotationActions';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
  },
  input: {
    ...theme.typography.para,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
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
    minHeight: '20px',
  },
  content: {
    marginTop: '50px',
  },
  flex: {
    flex: 1,
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
    color: 'white',
  },
  close: {
    cursor: 'pointer',
  },
  selectMiddle: {
    textAlign: 'center',
  },
  selectRight: {
    textAlign: 'right',
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
  preffered: {
    color: theme.palette.common.preffered,
    marginRight: '0.5rem',
  },
  nonPreffered: {
    color: theme.palette.common.secondaryColor,
    marginRight: '0.5rem',
  },
  tableCell: {
    width: 10,
  },
}));

const SelectFuelQuote = () => {
  // Material UI
  const classes = useStyles();
  // SWR
  const { data: fuelQuotes } = useSWR(path.FUELQUOTATION);
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  // Table
  const { TblContainer, TblHead } = DisplayTable([], SelectFuelQuoteHeadCells);

  // const onSearchICAOIATAkeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     const userValue = e.target.value;
  //   }
  // };

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Fuel Quote's
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <CancelIcon
                onClick={() => {
                  dispatch(openModal(false, ''));
                }}
                fontSize='large'
                className={classes.close}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container direction='column'>
          <Grid item xs={12}>
            <TblContainer>
              <TblHead />
              <TableBody>
                {fuelQuotes &&
                  fuelQuotes.data.map((fuelQuote) => (
                    <TableRow key={fuelQuote._id}>
                      <TableCell className={classes.tableCell}>
                        {fuelQuote.quoteNo}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {fuelQuote.icao}
                      </TableCell>
                      <TableCell style={{ width: 200 }}>
                        {fuelQuote.fuelSupplier}
                      </TableCell>
                      <TableCell style={{ width: 200 }}>
                        {fuelQuote.customer}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        onClick={() => {
                          const data = {
                            index: modalData.index,
                            fuelQuote,
                          };
                          dispatch(getSelectedFuelQuote(data));
                          dispatch(openModal(false, ''));
                        }}
                      >
                        <LibraryAddCheckIcon style={{ color: '#FF8000' }} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </TblContainer>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default SelectFuelQuote;
