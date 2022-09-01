import React, { useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import SelectInput from '../../../components/Select/Select';
import { Payment } from '../TripSheetData';
import { setAlert } from '../../../redux/actions/alertActions';

// Styling
const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.para,
  },
  select: {
    ...theme.typography.select,
    padding: 0,
    margin: 0,
  },
}));

const GroundHandler = ({ icons }) => {
  const classes = useStyles();
  const theme = useTheme();
  // Redux
  const dispatch = useDispatch();

  // Columns
  const [columns] = useState([
    {
      title: 'Sector',
      field: 'sector',
      width: 80,
      sorting: false,
    },
    {
      title: 'Airport',
      field: 'airport',
      //width: 100,
      sorting: false,
    },
    {
      title: 'Ground Handler',
      field: 'groundHandler',
      width: 200,
      sorting: false,
    },
    {
      title: 'Flight Supervisor',
      field: 'flightSupervisor',
      width: 200,
      sorting: false,
    },
    {
      title: 'Supervisor Cell',
      field: 'supervisorCell',
      width: 150,
      sorting: false,
    },
    {
      title: 'VHF',
      field: 'vhf',
      width: 80,
      sorting: false,
    },
    {
      title: 'Payment',
      field: 'payment',
      width: 150,
      sorting: false,
      editComponent: (props) => (
        <SelectInput
          menuItem={Payment}
          value={props.value}
          name='handlingpayment'
          onTableValueChange={(e) => {
            props.onChange(e.target.value);
          }}
          selectFieldStyle={classes.select}
        />
      ),
    },
  ]);
  // Data
  const [data, setData] = useState([]);
  return useMemo(
    () => {
      // The rest of your rendering logic
      return (
        <MaterialTable
          components={{
            Container: (props) => (
              <div className='triptable'>{props.children}</div>
            ),
          }}
          //className={classes.field}
          style={{ backgroundColor: '#808080' }}
          title=''
          options={{
            headerStyle: {
              ...theme.typography.tableHeader,
            },

            //search: false,
            paging: false,
            actionsColumnIndex: -1,
            showEmptyDataSourceMessage: false,
            showSelectAllCheckbox: true,
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
          icons={icons}
          columns={columns}
          data={data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (
                    newData.sector === undefined ||
                    newData.sector === '' ||
                    newData.airport === undefined ||
                    newData.airport === '' ||
                    newData.groundHandler === undefined ||
                    newData.groundHandler === '' ||
                    newData.flightSupervisor === undefined ||
                    newData.flightSupervisor === '' ||
                    newData.supervisorCell === undefined ||
                    newData.supervisorCell === '' ||
                    newData.payment === undefined ||
                    newData.payment === '' ||
                    newData.vhf === undefined ||
                    newData.vhf === ''
                  ) {
                    dispatch(
                      setAlert(true, 'error', 'All Fields are Required')
                    );
                    reject();
                    return;
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
                    newData.sector === undefined ||
                    newData.sector === '' ||
                    newData.airport === undefined ||
                    newData.airport === '' ||
                    newData.groundHandler === undefined ||
                    newData.groundHandler === '' ||
                    newData.flightSupervisor === undefined ||
                    newData.flightSupervisor === '' ||
                    newData.supervisorCell === undefined ||
                    newData.supervisorCell === '' ||
                    newData.payment === undefined ||
                    newData.payment === '' ||
                    newData.vhf === undefined ||
                    newData.vhf === ''
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
      );
    },
    // eslint-disable-next-line
    [data]
  );
};

export default GroundHandler;
