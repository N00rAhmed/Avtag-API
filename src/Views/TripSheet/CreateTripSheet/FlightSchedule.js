import React,{useEffect} from 'react';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useSWR from 'swr';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';

import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import path from '../../../utils/path';
import RHFDate from '../../../components/RHF/RHFDate/RHFDate';
import { ScheduleRemark } from '../TripSheetData';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import AutoCompleteSelect from '../../../components/AutoCompleteSelect/AutoCompleteSelect';
import { openModal } from '../../../redux/actions/modalActions';

const useStyles = makeStyles((theme) => ({
  scheduleList: {},
  notification: {
    color: theme.palette.common.primaryColor,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  startButton: {
    color: theme.palette.common.primaryColor,
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: '0.8rem',
    borderRadius: 0,
    color: '#fff',
    fontWeight: 600,
    backgroundColor: 'green',
    transition: 'all 400ms linear',
    width: '30px',
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
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

// const schedule = [
//   {
//     sector: '10',
//     callsign: 'MAT1001',
//     departuredate: '11/10/2020',
//     dicao: 'OPKC',
//     etd: '1500',
//     arrivaldate: '11/09/2020',
//     aicao: 'OERK',
//     eta: '1600',
//     remark: 'FERRY',
//   },
//   {
//     sector: '2',
//     callsign: 'MAT1001',
//     departuredate: '11/10/2020',
//     dicao: 'OPKC',
//     etd: '1500',
//     arrivaldate: '11/09/2020',
//     aicao: 'OERK',
//     eta: '1600',
//     remark: 'FERRY',
//   },
//   {
//     sector: '3',
//     callsign: 'MAT1001',
//     departuredate: '11/10/2020',
//     dicao: 'OPKC',
//     etd: '1500',
//     arrivaldate: '11/09/2020',
//     aicao: 'OERK',
//     eta: '1600',
//     remark: 'FERRY',
//   },
//   {
//     sector: '4',
//     callsign: 'MAT1001',
//     departuredate: '11/10/2020',
//     dicao: 'OPKC',
//     etd: '1500',
//     arrivaldate: '11/09/2020',
//     aicao: 'OERK',
//     eta: '1600',
//     remark: 'FERRY',
//   },
// ];

function FlightSchedule({schedule}) {
  // Material UI
  const classes = useStyles();
  // SWR
  const { data: airports } = useSWR(path.ALLAIRPORTS);
    // Redux
    const dispatch = useDispatch();
  // RHF
  const {
    register,
    control,
    handleSubmit,
    getValues,
    errors,
    reset
  } = useFormContext();

  // Load Schedule for Update
  useEffect(() => {
    if(schedule && schedule.length !== 0) {
      reset({
        ...getValues(),
        schedule: schedule,
      });
    }
  },[reset, schedule, getValues])

  // Confirm Dialog
  const confirm = useConfirm();
  // Field Array
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'schedule',
  });

  // if (errors.schedule && Object.keys(errors.schedule).length !== 0) {
  //   errors.schedule.map((err) => {
  //     if (err.sector && err.sector) {
  //       dispatch(setAlert(true, 'error', err.sector));
  //     }
  //     if (err.dIcao && err.dIcao.message) {
  //       dispatch(setAlert(true, 'error', err.dIcao.message));
  //     } else if (err.aIcao && err.aIcao.message) {
  //       dispatch(setAlert(true, 'error', err.aIcao.message));
  //     } else {
  //       dispatch(setAlert(true, 'error', 'Re-check Empty Fields'));
  //     }
  //   });
  // }

  const onDelete = (index) => {
    confirm({
      title: (
        <div style={{ fontSize: '1.1rem' }}>
          Are you sure you want to delete schedule?
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
        remove(index);
      })
      .catch(() => {
        /* ... */
      });
  };

  // Component Mount
  // useEffect(() => {
  //   if (fields.length === 0) {
  //     append({});
  //   }
  // }, [fields, append]);

  // useEffect(() => {
  //   if (fields) trigger('schedule');
  // }, [fields, trigger]);

  return (
    <div>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item md={8} xs={7}>
              <Typography className={classes.notification}>
                Notification :{' '}
                <span style={{ color: 'red' }}>
                  {errors.schedule ? (
                    Object.keys(errors.schedule).length !== 0 &&
                    errors.schedule.map((err) => {
                      if (err.sector) {
                        return err.sector.message;
                      } else if (err.callSign) {
                        return err.callSign.message;
                      } else if (err.departureDate) {
                        return err.departureDate.message;
                      } else if (err.dIcao && err.dIcao.message) {
                        return err.dIcao.message;
                      } else if (err.etd) {
                        return err.etd.message;
                      } else if (err.aIcao && err.aIcao.message) {
                        return err.aIcao.message;
                      } else if (err.eta) {
                        return err.eta.message;
                      } else if (err.arrivalDate) {
                        return err.arrivalDate.message;
                      } else if (err.remark) {
                        return err.remark.message;
                      } else {
                        return 'Re-Check all fields';
                      }
                    })
                  ) : (
                    <span style={{ color: 'green' }}>No Errors</span>
                  )}
                </span>
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid container direction='row' spacing={1}>
                <Grid item md={7} xs={1}>
                  <RHFInput placeholder='SEARCH' searchIcon />
                </Grid>
                <Grid item md={5} xs={6}>
                  <Grid container direction='row' align='right'>
                    <Grid item md={6} xs={1}>
                      <Button
                        color='primary'
                        disabled={fields.length > 0}
                        className={classes.addButton}
                        variant='contained'
                        type='submit'
                        onClick={() => append({})}
                      >
                        Start
                      </Button>
                    </Grid>
                    <Grid item md={6} xs={11}>
                      <Button
                        color='primary'
                        className={classes.addButton}
                        variant='contained'
                        disabled={fields.length === 0}
                        aria-label='preview'
                        onClick={handleSubmit((data) => {
                          dispatch(
                            openModal(true, 'PreviewFlightSchedules', 'lg', data)
                          );
                        })}
                      >
                        <VisibilityIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid
          container
          spacing={2}
          style={{ backgroundColor: '#808080', marginTop: 10 }}
        >
          <Grid item md={1} xs={12}>
            SECTOR
          </Grid>
          <Grid item md={1} xs={12}>
            CALLSIGN
          </Grid>
          <Grid item md={2} xs={12}>
            DEPARTURE DATE
          </Grid>
          <Grid item md={1} xs={12}>
            ICAO
          </Grid>
          <Grid item md={1} xs={12}>
            ETD
          </Grid>
          <Grid item md={1} xs={12}>
            ICAO
          </Grid>
          <Grid item md={1} xs={12}>
            ETA
          </Grid>
          <Grid item md={2} xs={12}>
            ARRIVAL DATE
          </Grid>
          <Grid item md={1} xs={12}>
            REMARKS
          </Grid>
          <Grid item md={1} xs={12} align='center'>
            ACTION
          </Grid>
        </Grid>
      </Hidden>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.scheduleList}>
            <Grid container spacing={2}>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].sector`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Sector Number "',
                  }}
                  defaultValue={field.sector || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      name={name}
                      // error={errors.schedule && errors.schedule[index].sector}
                      inputMaxLength={2}
                      value={value}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/gi, '');
                        onChange(value);
                      }}
                      key={field.id}
                      onBlur={onBlur}
                      placeholder='Sector'
                      inputRef={register({
                        required: 'Please Insert " Sector Number "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].callSign`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Call Sign "',
                  }}
                  defaultValue={field.callSign || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='CallSign'
                      name={name}
                      //error={errors.schedule && errors.schedule[index].callSign}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Call Sign "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFDate
                        iconSize='small'
                        name={name}
                        format='dd-MMM-yyyy'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        key={field.id}
                        inputRef={register({ required: 'required' })}
                      />
                    )}
                    control={control}
                    name={`schedule[${index}].departureDate`}
                    placeholder='Departure Date'
                    rules={{
                      required: 'Please Select " Departure Date "',
                    }}
                    defaultValue={field.departuredate || Date.now()}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].dIcao`}
                  control={control}
                  rules={{
                    required: 'Please Select " Departure ICAO "',
                    minLength: {
                      value: 5,
                      message: 'Please Select " Departure ICAO "',
                    },
                  }}
                  defaultValue={field.dIcao || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <AutoCompleteSelect
                      Options={airports ? airports.data : [{ combo: '' }]}
                      name={`schedule[${index}].dIcao`}
                      key={field.id}
                      disabled={airports && airports.data}
                      value={value || ''}
                      textFieldValue={value || ''}
                      placeholder='ICAO'
                      onChange={(e, data) => {
                        if (data && data.combo) {
                          onChange(data.combo);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].etd`}
                  control={control}
                  rules={{
                    required:
                      'Please Insert " Correct ETD | Estimated Time Of Departure  "',
                    minLength: {
                      value: 4,
                      message:
                        'Please Insert " Correct ETD | Estimated Time Of Departure  "',
                    },
                  }}
                  defaultValue={field.etd || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ETD'
                      name={name}
                      key={field.id}
                      inputMaxLength={4}
                      //error={errors.schedule && errors.schedule[index].etd}
                      value={value}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/gi, '');
                        onChange(value);
                      }}
                      inputRef={register({
                        required:
                          'Please Insert " Correct ETD | Estimated Time Of Departure  "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].aIcao`}
                  control={control}
                  rules={{
                    required: 'Please Select " Arrival ICAO "',
                    minLength: {
                      value: 5,
                      message: 'Please Select " Arrival ICAO "',
                    },
                  }}
                  defaultValue={field.aIcao || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <AutoCompleteSelect
                      Options={airports ? airports.data : [{ combo: '' }]}
                      name={`schedule[${index}].aIcao`}
                      key={field.id}
                      disabled={airports && airports.data}
                      value={value || ''}
                      textFieldValue={value || ''}
                      placeholder='ICAO'
                      onChange={(e, data) => {
                        if (data && data.combo) {
                          onChange(data.combo);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].eta`}
                  control={control}
                  rules={{
                    required:
                      'Please Insert " Correct ETA | Estimated Time Of Arrival "',
                    minLength: {
                      value: 4,
                      message:
                        'Please Insert " Correct ETA | Estimated Time Of Arrival "',
                    },
                  }}
                  defaultValue={field.eta || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ETA'
                      name={name}
                      inputMaxLength={4}
                      key={field.id}
                      value={value}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/gi, '');
                        onChange(value);
                      }}
                      inputRef={register({
                        required:
                          'Please Insert " Correct ETA | Estimated Time Of Arrival "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFDate
                        name={name}
                        key={field.id}
                        iconSize='small'
                        format='dd-MMM-yyyy'
                        minDate={getValues(`schedule[${index}].departureDate`)}
                        value={value}
                        onChange={onChange}
                        inputRef={register({
                          required: 'Please Select " Arrival Date "',
                        })}
                      />
                    )}
                    control={control}
                    name={`schedule[${index}].arrivalDate`}
                    rules={{
                      required: 'Please Select " Arrival Date "',
                    }}
                    defaultValue={field.arrivaldate || Date.now()}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={1} xs={12}>
                <Controller
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={ScheduleRemark}
                      name={`schedule[${index}].remark`}
                      disabled={ScheduleRemark}
                      key={field.id}
                      inputMaxLength='7'
                      optionLabel={(option) => option.name}
                      value={props.value || ''}
                      placeholder='Remarks'
                      onChange={(e, data) => {
                        if (data && data.name) {
                          onChange(data.name);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue={field.remark || ''}
                  onChange={([, data]) => data}
                  name={`schedule[${index}].remark`}
                  control={control}
                  rules={{
                    required: 'Please Select " Remark "',
                  }}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Grid container direction='row' spacing={3}>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='save'
                      onClick={handleSubmit((data) => {})}
                    >
                      <SaveIcon style={{ color: 'green' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='add'
                      onClick={handleSubmit((data) => {
                        insert(index + 1, {});
                      })}
                    >
                      <AddBoxIcon style={{ color: '#203764' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='delete'
                      onClick={() => {
                        onDelete(index);
                      }}
                    >
                      <DeleteIcon style={{ color: '#CC0000' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </li>
        );
      })}
      {/* {fields.length !== 0 && (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item md={12} xs={12} align='right'>
            <Button
              color='primary'
              className={classes.addButton}
              variant='contained'
              type='submit'
              onClick={handleSubmit((data) => {})}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      )} */}
    </div>
  );
}

export default FlightSchedule;
