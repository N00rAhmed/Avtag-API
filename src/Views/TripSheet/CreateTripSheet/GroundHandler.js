import React, { useEffect } from 'react';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextsmsIcon from '@material-ui/icons/Textsms';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { Status } from '../TripSheetData';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import { getPreferredGroundHandlerByICAO } from '../../../redux/actions/groundHandlerActions';
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
    width: '80px',
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
  addButtonVender: {
    fontSize: '0.8rem',
    borderRadius: 0,
    color: '#fff',
    fontWeight: 600,
    backgroundColor: '#FF8000',
    transition: 'all 400ms linear',
    width: '173px',
  },
}));

function GroundHandler({groundHandler}) {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { selectedGroundHandler } = useSelector(
    (state) => state.icaoGroundHandlers
  );

  console.log(selectedGroundHandler)

  // RHF
  const {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset
  } = useFormContext();
  // Confirm Dialog
  const confirm = useConfirm();

  const onDelete = (index) => {
    confirm({
      title: (
        <div style={{ fontSize: '1.1rem' }}>
          Are you sure you want to delete Ground Handler?
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

  // Load groundHandler for Update
  useEffect(() => {
    if(groundHandler && groundHandler.length !== 0) {
      reset({
        ...getValues(),
        groundHandler: groundHandler,
      });
    }
  },[reset, groundHandler, getValues])

  useEffect(() => {
    if (selectedGroundHandler && selectedGroundHandler.icaoIata) {
      setValue(
        `groundHandler[${selectedGroundHandler.index}].airport`,
        selectedGroundHandler.icaoIata,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `groundHandler[${selectedGroundHandler.index}].flightSupervisor`,
        'TBA'
      );
      setValue(
        `groundHandler[${selectedGroundHandler.index}].supervisorCell`,
        'TBA'
      );
      setValue(
        `groundHandler[${selectedGroundHandler.index}].handler`,
        selectedGroundHandler.groundHandlerName,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `groundHandler[${selectedGroundHandler.index}].vhfFreq`,
        selectedGroundHandler.vhfFreq,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `groundHandler[${selectedGroundHandler.index}].payment`,
        selectedGroundHandler.payment,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }
  }, [setValue, selectedGroundHandler]);

  // Field Array
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'groundHandler',
  });

  return (
    <div>
      <Grid container>
      <Grid item md={12} xs={12} align="right" style={{marginBottom:10}}>
          <Button
            color='primary'
            className={classes.addButtonVender}
            variant='contained'
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              const data ={
                modal: true
              }
              dispatch(
                openModal(true, 'GroundHandler', 'lg', data)
              );
            }}
          >
          Add Ground Handler
        </Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item md={8} xs={7}>
              <Typography className={classes.notification}>
                Notification :{' '}
                <span style={{ color: 'red' }}>
                  {errors.groundHandler ? (
                    Object.keys(errors.groundHandler).length !== 0 &&
                    errors.groundHandler.map((err) => {
                      if (err.sector) {
                        return err.sector.message;
                      } else if (err.airport) {
                        return err.airport.message;
                      } else if (err.status) {
                        return err.status.message;
                      } else if (err.handler) {
                        return err.handler.message;
                      } else if (err.flightSupervisor) {
                        return err.flightSupervisor.message;
                      } else if (err.supervisorCell) {
                        return err.supervisorCell.message;
                      } else if (err.vhfFreq) {
                        return err.vhfFreq.message;
                      } else if (err.payment) {
                        return err.payment.message;
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
              <Grid container direction='row'  >
                <Grid item md={6} xs={1}>
                  <RHFInput placeholder='SEARCH' searchIcon />
                </Grid>
                <Grid item md={6} xs={6}>
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
                            openModal(true, 'PreviewPermits', 'lg', data)
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
            STATUS
          </Grid>
          <Grid item md={1} xs={12}>
            AIRPORT
          </Grid>
          <Grid item md={2} xs={12}>
            GROUND HANDLER
          </Grid>
          <Grid item md={2} xs={12}>
            FLIGHT SUPERVISOR
          </Grid>
          <Grid item md={2} xs={12}>
            SUPERVISOR CELL
          </Grid>
          <Grid item md={2} xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item md={4} xs={1}>
                VHF
              </Grid>
              <Grid item md={8} xs={11}>
              PAYMENT
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1} xs={12} align='center'>
            ACTION
          </Grid>
        </Grid>
      </Hidden>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.groundhandlerList}>
            <Grid container spacing={2}>
            <Grid item md={1} xs={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={4} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='add'
                      onClick={(e) => {
                        e.preventDefault();
                        const data = {
                          index,
                        };
                        dispatch(
                          openModal(true, 'SelectGroundHandler', 'sm', data)
                        );
                      }}
                    >
                      <TextsmsIcon style={{ color: '#FF8000' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={8} xs={11}>
                    <Controller
                    name={`groundHandler[${index}].sector`}
                    control={control}
                    rules={{
                      required: 'Please Insert " Sector Number "',
                    }}
                    defaultValue={field.sector || ''}
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        name={name}
                        inputMaxLength={3}
                        inputTextAlign="center"
                        value={value}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^0-9-]/gi, '');
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
                </Grid>
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`groundHandler[${index}].status`}
                  control={control}
                  rules={{
                    required: 'Please Select " Permit Status "',
                  }}
                  defaultValue={field.status || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFSelect
                      name={name}
                      value={value}
                      key={field.id}
                      menuItem={Status}
                      // onBlur={() => {
                      //   setValue(
                      //     `groundHandler[${index}].flightSupervisor`,
                      //     'TBA'
                      //   );
                      //   setValue(
                      //     `groundHandler[${index}].supervisorCell`,
                      //     'TBA'
                      //   );
                      //   preferredGroundHandler &&
                      //     preferredGroundHandler[0] &&
                      //     setValue(
                      //       `groundHandler[${index}].airport`,
                      //       preferredGroundHandler &&
                      //         preferredGroundHandler[0] &&
                      //         `${preferredGroundHandler[0].icao}/${preferredGroundHandler[0].iata}`
                      //     );
                      //   setValue(
                      //     `groundHandler[${index}].handler`,
                      //     preferredGroundHandler &&
                      //       preferredGroundHandler[0] &&
                      //       preferredGroundHandler[0].handlerName,
                      //     {
                      //       shouldDirty: true,
                      //       // shouldValidate: true,
                      //     }
                      //   );
                      //   setValue(
                      //     `groundHandler[${index}].vhfFreq`,
                      //     preferredGroundHandler &&
                      //       preferredGroundHandler[0] &&
                      //       preferredGroundHandler[0].vhfFreq,
                      //     {
                      //       shouldDirty: true,
                      //       // shouldValidate: true,
                      //     }
                      //   );
                      //   setValue(
                      //     `groundHandler[${index}].payment`,
                      //     preferredGroundHandler &&
                      //       preferredGroundHandler[0] &&
                      //       preferredGroundHandler[0].payment,
                      //     {
                      //       shouldDirty: true,
                      //       // shouldValidate: true,
                      //     }
                      //   );
                      // }}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`groundHandler[${index}].airport`}
                  control={control}
                  rules={{
                    required:
                      'Please Insert " Ground Handling Airport - ICAO "',
                  }}
                  defaultValue={field.airport || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='AIRPORT'
                      name={name}
                      value={value}
                      key={field.id}
                      // onBlur={(e) => {
                      //   e.preventDefault();
                      //   dispatch(getPreferredGroundHandlerByICAO(value));
                      // }}
                      onChange={onChange}
                      inputRef={register({
                        required:
                          'Please Insert " Ground Handling Airport - ICAO "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`groundHandler[${index}].handler`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Ground Handler Name "',
                  }}
                  defaultValue={field.handler || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='GROUND HANDLER'
                      name={name}
                      value={value}
                      key={field.id}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Ground Handler Name "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`groundHandler[${index}].flightSupervisor`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Flight Supervisor "',
                  }}
                  defaultValue={field.flightSupervisor || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='FLIGHT SUPERVISOR'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Flight Supervisor "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`groundHandler[${index}].supervisorCell`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Flight Supervisor Cell "',
                  }}
                  defaultValue={field.supervisorCell || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='SUPERVISOR CELL'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required:
                          'Please Insert " Flight Supervisor Cell "',
                      })}
                    />
                  )}
                  />
              </Grid>
              <Grid item md={2} xs={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={4} xs={11}>
                    <Controller
                      name={`groundHandler[${index}].vhfFreq`}
                      control={control}
                      rules={{
                        required: 'Please Insert " Handler - VHF Frequency "',
                      }}
                      defaultValue={field.vhfFreq || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='VHF'
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({
                            required:
                              'Please Insert " Handler - VHF Frequency "',
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={8} xs={11}>
                  <Controller
                      name={`groundHandler[${index}].payment`}
                      control={control}
                      rules={{
                        required: 'Please Select " Payment Method "',
                      }}
                      defaultValue={field.payment || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFSelect
                          name={name}
                          value={value}
                          key={field.id}
                          menuItem={[
                            'ON CREDIT',
                            'PRE-PAYMENT',
                            'CREDIT CARD',
                            'N/A',
                          ]}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
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
    </div>
  );
}

export default GroundHandler;
