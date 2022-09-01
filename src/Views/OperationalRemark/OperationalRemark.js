import React, { Fragment, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';

import { container } from '../../components/Common/CommonStyles';
import { TripIcons } from '../TripSheet/CreateTripSheet/Icons';
import { setAlert } from '../../redux/actions/alertActions';

// Styling
const useStyles = makeStyles((theme) => ({
  addButton: {
    ...theme.typography.mainButton,
  },
  addButtonIcon: {
    ...theme.typography.mainButtonIcon,
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
}));

const OperationalRemark = () => {
  // Material ui
  const classes = useStyles();
  const theme = useTheme();
  // Redux
  const dispatch = useDispatch();
  // State
  // Columns
  const [columns] = useState([
    {
      title: 'Remark',
      field: 'remark',
      width: 800,
      sorting: false,
    },
  ]);
  // Data
  const [data, setData] = useState([]);
  return useMemo(
    () => {
      // The rest of your rendering logic
      return (
        <Fragment>
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.container}>
              <div className={classes.flex}>
                <Typography className={classes.primaryHeading}>
                  Add Operational Remark
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <MaterialTable
              components={{
                Container: (props) => (
                  <div className='triptable'>{props.children}</div>
                ),
              }}
              style={{ backgroundColor: '#808080' }}
              title=''
              options={{
                headerStyle: {
                  ...theme.typography.tableHeader,
                },
                paging: false,
                actionsColumnIndex: -1,
                showEmptyDataSourceMessage: false,
                loadingType: 'linear',
                actionsCellStyle: {
                  ...theme.typography.tableRow,
                },
                rowStyle: (rowData) => {
                  return {
                    ...theme.typography.tableRow,
                  };
                },
              }}
              icons={TripIcons}
              columns={columns}
              data={Array.from(data)}
              editable={{
                onRowAdd: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      var hasMatch =
                        data.filter(function (val) {
                          return val.remark === newData.remark;
                        }).length > 0;
                      if (
                        newData.remark === undefined ||
                        newData.remark === ''
                      ) {
                        dispatch(
                          setAlert(true, 'error', 'All Fields are Required')
                        );
                        reject();
                        return;
                      } else if (hasMatch) {
                        reject();
                      } else {
                        setData([...data, newData]);
                        resolve();
                      }
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (
                        newData.remark === undefined ||
                        newData.remark === ''
                      ) {
                        dispatch(
                          setAlert(true, 'error', 'All Fields are Required')
                        );
                        reject();
                        return;
                      }

                      resolve();
                      if (oldData) {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);

                        resolve();
                      }
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);
                      resolve();
                    }, 1000);
                  }),
              }}
            />
          </div>
        </Fragment>
      );
    },
    // eslint-disable-next-line
    [data]
  );
};

export default OperationalRemark;
