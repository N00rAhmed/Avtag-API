import React, { useEffect } from 'react';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';

import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { Status } from '../TripSheetData';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
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

const Fuel = ({fuel}) => {
  // Material UI
  const classes = useStyles();
  // RHF
  const {
    register,
    control,
    handleSubmit,
    setValue,
    errors,
    getValues,
    reset
  } = useFormContext();
  // Confirm Dialog
  const confirm = useConfirm();
  const onDelete = (index) => {
    confirm({
      title: (
        <div style={{ fontSize: '1.1rem' }}>
          Are you sure you want to delete Fuel?
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
  // Redux
  const dispatch = useDispatch();
  const { selectedFuelQuote } = useSelector((state) => state.fuelQuotations);

   // Load fuel for Update
   useEffect(() => {
    if(fuel && fuel.length !== 0) {
      reset({
        ...getValues(),
        fuel: fuel,
      });
    }
  },[reset, fuel, getValues])

  useEffect(() => {
    if (selectedFuelQuote && selectedFuelQuote.fuelQuote.quoteNo) {
      setValue(
        `fuel[${selectedFuelQuote.index}].quoteNo`,
        selectedFuelQuote.fuelQuote.quoteNo,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `fuel[${selectedFuelQuote.index}].location`,
        selectedFuelQuote.fuelQuote.icao,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `fuel[${selectedFuelQuote.index}].fuelSupplier`,
        selectedFuelQuote.fuelQuote.fuelSupplier,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        `fuel[${selectedFuelQuote.index}].fuelType`,
        selectedFuelQuote.fuelQuote.fuelType,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(`fuel[${selectedFuelQuote.index}].sector`, 'TBA', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(`fuel[${selectedFuelQuote.index}].ipAgent`, 'TBA', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(`fuel[${selectedFuelQuote.index}].status`, 'PENDING', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [setValue, selectedFuelQuote]);

  // Field Array
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'fuel',
  });

  return (
    <div>
      {/* <Grid container>
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
                  append({});
                })}
                type='submit'
              >
                <AddBoxIcon style={{ color: '#203764' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item md={8} xs={7}>
              <Typography className={classes.notification}>
                Notification :{' '}
                <span style={{ color: 'red' }}>
                  {errors.fuel ? (
                    Object.keys(errors.fuel).length !== 0 &&
                    errors.fuel.map((err) => {
                      if (err.quoteNo) {
                        return err.quoteNo.message;
                      } else if (err.location) {
                        return err.location.message;
                      } else if (err.fuelType) {
                        return err.fuelType.message;
                      } else if (err.fuelSupplier) {
                        return err.fuelSupplier.message;
                      } else if (err.sector) {
                        return err.sector.message;
                      } else if (err.ipAgent) {
                        return err.ipAgent.message;
                      } else if (err.status) {
                        return err.status.message;
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
                            openModal(true, 'PreviewFuel', 'md', data)
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
            QUOTE #
          </Grid>
          <Grid item md={1} xs={12}>
            LOCATION
          </Grid>
          <Grid item md={1} xs={12}>
            TYPE
          </Grid>
          <Grid item md={3} xs={12}>
            SUPPLIER
          </Grid>
          <Grid item md={1} xs={12}>
            SECTOR
          </Grid>
          <Grid item md={2} xs={12}>
            IP AGENT
          </Grid>
          <Grid item md={2} xs={12}>
            STATUS
          </Grid>
          <Grid item md={1} xs={12} align='center'>
            ACTION
          </Grid>
        </Grid>
      </Hidden>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.fuelList}>
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
                          openModal(true, 'SelectFuelQuote', 'md', data)
                        );
                      }}
                    >
                      <TextsmsIcon style={{ color: '#FF8000' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={8} xs={11}>
                    <Controller
                      name={`fuel[${index}].quoteNo`}
                      control={control}
                      rules={{
                        required: 'Please Select " Fuel Quote Number "',
                      }}
                      defaultValue={field.quoteNo || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='QUOTE'
                          onChange={onChange}
                          inputRef={register({
                            required: 'Please Select " Fuel Quote Number "',
                          })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={1} xs={12}>
                <Controller
                  name={`fuel[${index}].location`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Uplift Airport - ICAO "',
                  }}
                  defaultValue={field.location || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='LOCATION'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required:
                          'Please Insert " Fuel Uplift Airport - ICAO "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelType`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Type "',
                  }}
                  defaultValue={field.fuelType || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='TYPE'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Fuel Type "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='SUPPLIER'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Fuel Supplier Name "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Controller
                  name={`fuel[${index}].sector`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Uplift Sector "',
                  }}
                  defaultValue={field.sector || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='SECTOR'
                      name={name}
                      inputMaxLength={2}
                      value={value}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/gi, '');
                        onChange(value);
                      }}
                      key={field.id}
                      onBlur={onBlur}
                      inputRef={register({
                        required: 'Please Insert " Fuel Uplift Sector "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].ipAgent`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Into Plane Agent "',
                  }}
                  defaultValue={field.ipAgent || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='IP AGENT'
                      name={name}
                      value={value}
                      key={field.id}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register({
                        required: 'Please Insert " Into Plane Agent "',
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].status`}
                  control={control}
                  rules={{
                    required: 'Please Select " Fuel Confirmation Status "',
                  }}
                  defaultValue={field.status || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFSelect
                      name={name}
                      value={value}
                      key={field.id}
                      menuItem={Status}
                      onBlur={onBlur}
                      onChange={onChange}
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
              {/* <Grid item md={1} xs={12} align='center'>
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
              </Grid> */}
            </Grid>
          </li>
        );
      })}
    </div>
  );
};

export default Fuel;
