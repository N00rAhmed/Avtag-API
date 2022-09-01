/*eslint-disable*/
import React, { useState } from 'react';
// core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

// Styling
const useStyles = makeStyles((theme) => ({
  table: {
    //marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '500',
      fontSize: '0.8rem',
      color: theme.palette.common.whiteColor,
      backgroundColor: theme.palette.common.primaryColor,
    },
    '& tbody td': {
      fontWeight: '600',
      fontSize: '0.8rem',
    },
    '& tbody tr:hover': {
      cursor: 'pointer',
    },
  },
  select: {
    fontSize: '0.9rem',
  },
  caption: {
    fontSize: '0.9rem',
    color: theme.palette.common.primaryColor,
  },
  toolbar: {
    '& > p:nth-of-type(2)': {
      fontSize: '0.9rem',
      color: theme.palette.common.primaryColor,
    },
  },
}));

const DisplayTable = (records, headerCells, filterFn) => {
  // Material UI
  const classes = useStyles();
  // Pagination States
  const pages = [11, 22, 33, 44];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);

  // Table container
  const TblContainer = (props) => (
    <TableContainer component={Paper}>
      <Table className={classes.table}>{props.children}</Table>
    </TableContainer>
  );
  // Table Header
  const TblHead = (props) => (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
  // Handle Change Page
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  // Handle Change Rows Per Page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  // Table Pagination
  const TblPagination = (props) => (
    <TablePagination
      labelRowsPerPage='Trip Sheet Displayed'
      classes={{
        select: classes.select,
        toolbar: classes.toolbar,
        caption: classes.caption,
      }}
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  // Paging and Sorting afeter cahange
  const recordsAfterPagingAndSorting = () => {
    return filterFn
      .fn(records)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
};

export default DisplayTable;
