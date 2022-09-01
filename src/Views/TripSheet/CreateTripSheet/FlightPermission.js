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
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import TextsmsIcon from '@material-ui/icons/Textsms';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useConfirm } from 'material-ui-confirm';

import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import { PermitType, Status } from '../TripSheetData';
import { openModal } from '../../../redux/actions/modalActions';

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    width: '260px',
  },
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
  addButtonVender: {
    fontSize: '0.8rem',
    borderRadius: 0,
    color: '#fff',
    fontWeight: 600,
    backgroundColor: '#FF8000',
    transition: 'all 400ms linear',
    width: '173px',
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
  checkBoxSpace: {
    paddingLeft: '0px !important',
  },
}));

function FlightPermission({permission}) {
  // Material UI
  const classes = useStyles();

  // Redux
  const dispatch = useDispatch();
  const {  loading } = useSelector((state) => state.airportData);
  const { selectedServiceProvider } = useSelector(
    (state) => state.serviceProvider
  );
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
          Are you sure you want to delete permit?
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

    // Load permission for Update
    useEffect(() => {
      if(permission && permission.length !== 0) {
        
        reset({
          ...getValues(),
          permission: permission,
        });
      }
    },[reset, permission, getValues])

  useEffect(() => {
    if (selectedServiceProvider && selectedServiceProvider.serviceProviderName) {
      setValue(
        `permission[${selectedServiceProvider.index}].vender`,
        `${selectedServiceProvider.serviceProviderCode} - ${selectedServiceProvider.serviceProviderName}`,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `permission[${selectedServiceProvider.index}].airport`,
        selectedServiceProvider.country,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }
  }, [selectedServiceProvider, setValue]);
  useEffect(() => {
    if (selectedGroundHandler && selectedGroundHandler.groundHandlerName){
      setValue(
        `permission[${selectedGroundHandler.index}].vender`,
        selectedGroundHandler.groundHandlerName,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `permission[${selectedGroundHandler.index}].airport`,
        selectedGroundHandler.icaoIata,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }
  }, [setValue, selectedGroundHandler]);

  // Field Array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permission',
  });

  return (
    <div>
      {loading && <LinearProgress />}
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
                openModal(true, 'ServiceProvider', 'lg', data)
              );
            }}
          >
          Add Service Provider
        </Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item md={8} xs={7}>
              <Typography className={classes.notification}>
                Notification :{' '}
                <span style={{ color: 'red' }}>
                  {errors.permission ? (
                    Object.keys(errors.permission).length !== 0 &&
                    errors.permission.map((err) => {
                      if (err.sector) {
                        return err.sector.message;
                      } else if (err.permitType) {
                        return err.permitType.message;
                      } else if (err.airport) {
                        return err.airport.message;
                      } else if (err.status) {
                        return err.status.message;
                      } else if (err.permitNo) {
                        return err.permitNo.message;
                      } else if (err.entry) {
                        return err.entry.message;
                      } else if (err.exit) {
                        return err.exit.message;
                      } else if (err.vender) {
                        return err.vender.message;
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
          <Grid item md={2} xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item md={2} xs={1}>
                SEC
              </Grid>
              <Grid item md={10} xs={11}>
                PERMIT TYPE
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item md={1} xs={12}>
            PERMIT TYPE
          </Grid> */}
          <Grid item md={2} xs={12}>
            COUNTRY | AIRPORT
          </Grid>
          <Grid item md={1} xs={12}>
            STATUS
          </Grid>
          <Grid item md={2} xs={12}>
            PERMIT #
          </Grid>
          <Grid item md={2} xs={12}>
            <Grid container direction='row' spacing={1}>
              <Grid item md={6} xs={1}>
                ENTRY
              </Grid>
              <Grid item md={6} xs={11}>
                EXIT
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item md={1} xs={12}>
            ENTRY
          </Grid>
          <Grid item md={1} xs={12}>
            EXIT
          </Grid> */}
          <Grid item md={2} xs={12}>
            PROVIDER
          </Grid>
          <Grid item md={1} xs={12} align='center'>
            ACTION
          </Grid>
        </Grid>
      </Hidden>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.permissionList}>
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={2} xs={1}>
                    <Controller
                      name={`permission[${index}].sector`}
                      control={control}
                      rules={{
                        required: 'Please Insert " Sector Number "',
                      }}
                      defaultValue={field.sector || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          inputMaxLength={3}
                          value={value}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9-]/gi, '');
                            onChange(value);
                          }}
                          key={field.id}
                          onBlur={onBlur}
                          inputRef={register({
                            required: 'Please Insert " Sector Number "',
                          })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item md={10} xs={11}>
                    <Controller
                      name={`permission[${index}].permitType`}
                      control={control}
                      rules={{
                        required: 'Please Select " Permit Type "',
                      }}
                      defaultValue={field.permitType || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFSelect
                          name={name}
                          value={value}
                          key={field.id}
                          menuItem={PermitType}
                          onBlur={onBlur}
                          onChange={(e) => {
                            onChange(e.target.value);
                            setValue(`permission[${index}].country`, '');
                            setValue(`permission[${index}].airport`, '');
                            setValue(`permission[${index}].entry`, '-');
                            setValue(`permission[${index}].exit`, '-');
                            setValue(`permission[${index}].permitNo`, '');
                            setValue(`permission[${index}].vender`, '');
                            setValue(`permission[${index}].status`, '');
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={2} xs={12}>
                <Grid container direction='row' spacing={3}>
                    <Grid item md={2} xs={1}>
                      <IconButton
                        size='small'
                        aria-label='save'
                        onClick={(e) => {
                          e.preventDefault();
                          const data = {
                            index,
                            permitType:getValues(`permission[${index}].permitType`)
                          };
                          dispatch(
                            openModal(
                              true,
                              'SelectLandingPermit',
                              'sm',
                              data
                            )
                          );
                        }}
                      >
                        <TextsmsIcon style={{ color: '#FF8000' }} />
                      </IconButton>
                    </Grid>
                    <Grid item md={10} xs={12}>
                    <Controller
                        name={`permission[${index}].airport`}
                        control={control}
                        rules={{
                          required: 'Please Select " Country | Airport "',
                        }}
                        defaultValue={field.airport || ''}
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            name={name}
                            value={value}
                            key={field.id}
                            placeholder='SELECT PERMIT TYPE'
                            onChange={onChange}
                            inputRef={register({
                              required: 'Please Select " Country | Airport "',
                            })}
                          />
                        )}
                      />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`permission[${index}].status`}
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
                      onChange={(e) => {
                        if (e.target.value !== 'CONFIRMED') {
                          setValue(
                            `permission[${index}].permitNo`,
                            e.target.value,
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        } else {
                          setValue(`permission[${index}].permitNo`, '', {
                            shouldDirty: true,
                          });
                        }

                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`permission[${index}].permitNo`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Approved Permit Number "',
                  }}
                  defaultValue={field.permitNo || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      name={name}
                      value={value}
                      key={field.id}
                      placeholder='Permit #'
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Approved Permit Number "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Grid container direction='row' spacing={1}>
                  <Grid item md={6} xs={1}>
                    <Controller
                      name={`permission[${index}].entry`}
                      control={control}
                      rules={{
                        required: 'Please Insert " Entry Point "',
                      }}
                      defaultValue={field.entry || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='Entry'
                          onChange={onChange}
                          inputRef={register({
                            required: 'Please Insert " Entry Point "',
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={11}>
                    <Controller
                      name={`permission[${index}].exit`}
                      control={control}
                      rules={{
                        required: 'Please Insert " Exit Point "',
                      }}
                      defaultValue={field.exit || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='Exit'
                          onChange={onChange}
                          inputRef={register({
                            required: 'Please Insert " Exit Point "',
                          })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={2} xs={12}>
                  <Controller
                    name={`permission[${index}].vender`}
                    control={control}
                    rules={{
                      required: 'Please Insert " Service Provider "',
                    }}
                    defaultValue={field.vender || ''}
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        name={name}
                        value={value}
                        key={field.id}
                        onBlur={onBlur}
                        //placeholder='Vender'
                        onChange={onChange}
                        inputRef={register({
                          required: 'Please Insert " Service Provider "',
                        })}
                      />
                    )}
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
                      type='submit'
                      onClick={handleSubmit((data) => {
                        append({});
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

export default FlightPermission;