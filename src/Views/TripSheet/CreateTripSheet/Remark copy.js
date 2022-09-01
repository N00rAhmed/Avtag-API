import React, { useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch } from 'react-redux';

import SelectInput from '../../../components/Select/Select';
import { setAlert } from '../../../redux/actions/alertActions';
import { openModal } from '../../../redux/actions/modalActions';

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
  addButton: {
    ...theme.typography.mainButton,
  },
  addButtonIcon: {
    ...theme.typography.mainButtonIcon,
  },
}));

const Remarks = [
  'ALL PERMISSION NUMBER MUST BE INSERTED IN “FLIGHT PLAN ITEM 18”',
  'PLEASE INFORM US IMMEDIATELY IF CHANGE IN “SCHEDULE”, DOF, ETD/ETA & PASSENGER INFO”',
  'IF EN-ROUTE OVERFLIGHT COUNTRIES ENTRY / EXIT POINT CHANGE “IMMEDIATELY INFORM US”',
  'IT IS AN OPERATOR RESPONSIBILITY TO CHECK ALL EFFECTIVE NOTAMS TO ALL ORIGIN/DESTINATION BEFORE FLIGHT DEPARTURE.',
  'PASSENGER TRANSPORT ARRANGED | CAR : MERCEDES-BENZ S-CLASS',
  'CREW HOTEL RESERVATION " PLEASE FIND ATTACHED HOTEL BOOKING CONFIRMATION"',
  'CREW HOTEL ACCOMODATION PAYMENT WILL BE PAID DIRECTLY BY CREW',
  'PLEASE SEND US ON TIME AIRCRAFT DEPARTURE MOVEMENT FROM ORIGIN TO UPDATE AIRCRAFT SECURITY AGENCY AT DESTINATION.',
];

const OperationalRemark = ({ icons, setModalName, setOpenModal }) => {
  const classes = useStyles();
  const theme = useTheme();
  // Redux
  const dispatch = useDispatch();

  // Columns
  const [columns] = useState([
    {
      title: 'Remark',
      field: 'remark',
      width: 800,
      editComponent: (props) => (
        <SelectInput
          menuItem={Remarks}
          value={props.value || ''}
          onTableValueChange={(e) => {
            props.onChange(e.target.value);
          }}
          selectFieldStyle={classes.select}
        />
      ),
      sorting: false,
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
          style={{ backgroundColor: '#808080' }}
          title={
            <Button
              color='primary'
              className={classes.addButton}
              variant='contained'
              onClick={() => {
                dispatch(openModal(true, 'OperationalRemark'));
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AddCircleOutlineIcon className={classes.addButtonIcon} />
                Add Operational Remark
              </div>
            </Button>
          }
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
          icons={icons}
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
                  if (newData.remark === undefined || newData.remark === '') {
                    dispatch(
                      setAlert(true, 'error', 'All Fields are Required')
                    );
                    reject();
                    return;
                  } else if (hasMatch) {
                    dispatch(
                      setAlert(true, 'error', 'All Fields are Required')
                    );
                    reject();
                  } else {
                    setData([...data, newData]);
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

export default OperationalRemark;
