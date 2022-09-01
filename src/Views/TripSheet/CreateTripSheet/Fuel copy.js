import React, { useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import AutoCompleteSelect from '../../../components/AutoCompleteSelect/AutoCompleteSelect';
import SelectInput from '../../../components/Select/Select';
import { Status, QuoteNo, SectorNo } from '../TripSheetData';
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

const Fuel = ({ icons }) => {
  const classes = useStyles();
  const theme = useTheme();
  // Redux
  const dispatch = useDispatch();

  // Columns
  const [columns] = useState([
    {
      title: 'Quote #',
      field: 'quoteno',
      width: 180,
      autocomplete: QuoteNo,
      sorting: false,
      editComponent: (props) => (
        <AutoCompleteSelect
          Options={QuoteNo}
          {...props}
          textFieldStyles={classes.select}
          onChange={(e) => {
            props.onChange(e.target.innerText);
          }}
          getOptionLabel={(option) => option.name}
          textFieldValue={props.value}
          addButton
          addButtonText='Fuel Quote'
          addButtonClick={() => window.alert('new Quote')}
        />
      ),
    },
    {
      title: 'Location',
      field: 'location',
      width: 100,
      sorting: false,
    },
    {
      title: 'Type',
      field: 'type',
      width: 100,
      sorting: false,
    },
    {
      title: 'Supplier',
      field: 'supplier',
      width: 200,
      sorting: false,
    },
    {
      title: 'Sector',
      field: 'sector',
      width: 180,
      sorting: false,
      editComponent: (props) => (
        <AutoCompleteSelect
          Options={SectorNo}
          {...props}
          textFieldStyles={classes.select}
          onChange={(e) => {
            props.onChange(e.target.innerText);
          }}
          getOptionLabel={(option) => option.name}
          textFieldValue={props.value}
          addButton
          addButtonText='Fuel Sector'
          addButtonClick={() => window.alert('new Sector')}
        />
      ),
    },
    {
      title: 'IP Agent',
      field: 'ipagent',
      width: 200,
      sorting: false,
    },
    {
      title: 'Status',
      field: 'status',
      width: 100,
      sorting: false,
      editComponent: (props) => (
        <SelectInput
          menuItem={Status}
          value={props.value}
          name='fuelstatus'
          onChange={(e) => {
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
                    newData.quoteno === undefined ||
                    newData.quoteno === '' ||
                    newData.location === undefined ||
                    newData.location === '' ||
                    newData.type === undefined ||
                    newData.type === '' ||
                    newData.supplier === undefined ||
                    newData.supplier === '' ||
                    newData.sector === undefined ||
                    newData.sector === '' ||
                    newData.ipagent === undefined ||
                    newData.ipagent === '' ||
                    newData.status === undefined ||
                    newData.status === ''
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
                    newData.quoteno === undefined ||
                    newData.quoteno === '' ||
                    newData.location === undefined ||
                    newData.location === '' ||
                    newData.type === undefined ||
                    newData.type === '' ||
                    newData.supplier === undefined ||
                    newData.supplier === '' ||
                    newData.sector === undefined ||
                    newData.sector === '' ||
                    newData.ipagent === undefined ||
                    newData.ipagent === '' ||
                    newData.status === undefined ||
                    newData.status === ''
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

export default Fuel;
