/*eslint-disable*/
import React, { memo, useState } from 'react';
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
// core components

import Grid from '@material-ui/core/Grid';
import useSWR, {trigger} from 'swr';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import SearchBar from 'material-ui-search-bar';
import Edit from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom'
import DraftsIcon from '@material-ui/icons/Drafts';
import HistoryIcon from '@material-ui/icons/History';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';

import path from '../../../utils/path';
import DisplayTable from '../../../components/DisplayTable/DisplayTable';
import { TripsheetDashboardHeadCells } from '../TripSheetData';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
  },
  addButton: {
    ...theme.typography.mainButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
  },
  input: {
    ...theme.typography.para,
  },
  selectOption: {
    ...theme.typography.selectOption,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    ...theme.typography.para,
    margin: 2,
    backgroundColor: theme.palette.common.primaryColor,
    color: theme.palette.common.whiteColor,
  },
  chipSelectedOption: {
    backgroundColor: `${theme.palette.common.optionHoverColor} !important`,
  },
  chipIcon: {
    //fill: theme.palette.common.secondaryColor,
  },
  tableCell: {
    width: 10,
    paddingRight: 4,
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
  },
}));

const TripSheetDashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  // State
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // SWR
  const { data: alltripsheets } = useSWR(path.TRIPSHEET);
  // Table
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = DisplayTable(
    (alltripsheets && alltripsheets.data) || [],
    TripsheetDashboardHeadCells,
    filterFn
  );
  // Handle Search
  const handleSearch = (e) => {
    let target = e;
    setFilterFn({
      fn: (items) => {
        if (target === '') return items;
        else
          return items.filter((x) => x.customer.toLowerCase().includes(target));
      },
    });
  };
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        <SearchBar
          placeholder='Search Trip Sheet'
          onChange={handleSearch}
          style={{
            margin: '0 0 0 auto',
            //maxWidth: 285,
          }}
        />
      </Grid>
      {/* <Grid item xs={12} align='right' style={{ paddingTop: 15 }}>
        <Button
          color='primary'
          className={classes.addButton}
          variant='contained'
          type='submit'
          onClick={() => trigger(path.TRIPSHEET)}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <RefreshIcon fontSize='small' className={classes.addButtonIcon} />
            Refresh
          </div>
        </Button>
      </Grid> */}
      <Grid item xs={12}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {alltripsheets &&
              recordsAfterPagingAndSorting().map((tripData) => (
                <TableRow key={tripData._id} style={{height: '1px !important'}}>
                  <TableCell className={classes.tableCell}>
                    {tripData.tripSheetNo}
                  </TableCell>
                  <TableCell style={{ width: 180 }}>
                    {tripData.operator}
                  </TableCell>
                  <TableCell style={{ width: 180 }}>
                    {tripData.customer}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {tripData.registration}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {tripData.itinerary}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {tripData.version}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {tripData.tripRequest.map((tReq, i) => (
                      <Chip
                        key={`${tReq}-${i}`}
                        style={{ margin: 2, backgroundColor: tReq[0] ==='O' ? '#E7C4C4' :tReq[0] ==='L' ? '#FFAAAA' :tReq[0] ==='A' ? 'yellow' :'#F5DFDD'  }}
                        variant='outlined'
                        size='small'
                        label={tReq[0]}
                      />
                    ))}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Link to={`/admin/updatetripsheet/${tripData.tripSheetNo}`}>
                      <Edit style={{ color: '#75C502' }} />
                    </Link>
                    <Link to={`/admin/updatetripsheet/${tripData.tripSheetNo}`}>
                      <DraftsIcon style={{ color: '#75C502' }} />
                    </Link>
                    <Link to={`/admin/updatetripsheet/${tripData.tripSheetNo}`}>
                      <HistoryIcon style={{ color: '#75C502' }} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Grid>
    </Grid>
  );
};

export default memo(TripSheetDashboard);
