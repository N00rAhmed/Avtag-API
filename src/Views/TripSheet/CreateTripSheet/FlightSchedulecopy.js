import React from 'react';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import RHFDate from '../../../components/RHF/RHFDate/RHFDate';
import { ScheduleRemark } from '../TripSheetData';
import { getIcaoIata } from '../../../redux/actions/airportActions';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';

const useStyles = makeStyles((theme) => ({
  scheduleList: {},
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

function FlightSchedule() {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { airport, loading } = useSelector((state) => state.airportData);

  // RHF
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useFormContext();

  // Field Array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedule',
  });

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
      {loading && <LinearProgress />}
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container justify='flex-end' spacing={1}>
            <Grid item md={2} xs={5}>
              <RHFInput placeholder='SEARCH' searchIcon />
            </Grid>
            <Grid item>
              <IconButton
                size='small'
                aria-label='add'
                onClick={handleSubmit((data) => {
                  console.log(data);
                  append({});
                })}
                type='submit'
              >
                <AddBoxIcon style={{ color: '#203764' }} />
              </IconButton>
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
                    required: 'this is required',
                  }}
                  defaultValue={field.sector || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      name={name}
                      //error={errors.schedule && errors.schedule[index].sector}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      placeholder='Sector'
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].callSign`}
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue={field.callsign || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='CallSign'
                      name={name}
                      //error={errors.schedule && errors.schedule[index].callsign}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
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
                        // error={
                        //   errors.schedule &&
                        //   errors.schedule[index].departuredate
                        // }
                        inputRef={register({ required: 'required' })}
                      />
                    )}
                    control={control}
                    name={`schedule[${index}].departureDate`}
                    placeholder='Departure Date'
                    rules={{
                      required: 'this is required',
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
                    required: 'this is required',
                  }}
                  defaultValue={field.dicao || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ICAO'
                      name={name}
                      //error={errors.schedule && errors.schedule[index].dicao}
                      value={value}
                      key={field.id}
                      onBlur={(e) => {
                        e.preventDefault();
                        dispatch(getIcaoIata(value));
                      }}
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].etd`}
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue={field.etd || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ETD'
                      name={name}
                      key={field.id}
                      //error={errors.schedule && errors.schedule[index].etd}
                      value={value}
                      onBlur={() => {
                        setValue(
                          `schedule[${index}].dIcao`,
                          airport && airport[0] && airport[0].combo,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].aIcao`}
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue={field.aicao || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ICAO'
                      name={name}
                      //error={errors.schedule && errors.schedule[index].aicao}
                      value={value}
                      key={field.id}
                      onBlur={() => {
                        dispatch(getIcaoIata(value));
                      }}
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`schedule[${index}].eta`}
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue={field.eta || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='ETA'
                      name={name}
                      key={field.id}
                      //error={errors.schedule && errors.schedule[index].eta}
                      onBlur={() => {
                        setValue(
                          `schedule[${index}].aIcao`,
                          airport && airport[0] && airport[0].combo,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      value={value}
                      onChange={onChange}
                      inputRef={register({ required: 'required' })}
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
                        //minDate={AllWatchedValues[index].departuredate}
                        value={value}
                        onChange={onChange}
                        // error={
                        //   errors.schedule && errors.schedule[index].arrivaldate
                        // }
                        inputRef={register({ required: 'required' })}
                      />
                    )}
                    control={control}
                    name={`schedule[${index}].arrivalDate`}
                    rules={{
                      required: 'this is required',
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
                      //error={errors.schedule && errors.schedule[index].remark}
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
                    required: 'this is required',
                  }}
                />
              </Grid>
              <Grid item md={1} xs={12} align='center'>
                <IconButton
                  size='small'
                  aria-label='delete'
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
                  <DeleteIcon style={{ color: '#CC0000' }} />
                </IconButton>
              </Grid>
            </Grid>
          </li>
        );
      })}
    </div>
  );
}

export default FlightSchedule;
