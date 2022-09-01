import React, { Fragment, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextsmsIcon from '@material-ui/icons/Textsms';
import AppBar from '@material-ui/core/AppBar';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';

import { container } from '../../components/Common/CommonStyles';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import { openModal } from '../../redux/actions/modalActions';
import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
    fontWeight: 500,
  },
  input: {
    ...theme.typography.para,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
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
  close: {
    cursor: 'pointer',
  },
  selectMiddle: {
    textAlign: 'center',
  },
  selectRight: {
    textAlign: 'right',
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
  blockOverflightList:{
    listStyleType:"none",
    marginTop:"10px",
    marginBottom:"10px",
  },
}));

const HotelReservation = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  // RHF
  // RHF
  const {
    register,
    control,
    handleSubmit,
    setValue,
    errors,
    getValues,
    reset
  } = useForm();

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


  // Field Array
  const { fields, append, remove, insert  } = useFieldArray({
    control,
    name: 'schedule',
  });

  useEffect(() => {
    if(fields && fields.length ===0) {
      append({})
    }
  },[onDelete])

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Create Hotel Reservation
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <CancelIcon
                onClick={() => dispatch(openModal(false, ''))}
                fontSize='large'
                className={classes.close}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container direction='column'>
        <Typography
          className={classes.secondaryHeading}
          style={{
            borderBottom:`2px solid ${theme.palette.common.primaryColor}`,
            marginBottom:'20px'
          }}
        >
          Customer Information
        </Typography>
        <Grid item container spacing={2} >
            <Grid item md={4} xs={12}>
                <Grid container direction='row' >
                    <Grid item md={11} xs={12}>
                        <Controller
                        name='searchICAO'
                        control={control}
                        defaultValue=''
                        render={({ onChange, onBlur, value, name }) => (
                            <RHFInput
                            rootHelperTextStyle={classes.input}
                            name={name}
                            helperText='Trip #'
                            //onKeyDown={onSearchICAOIATAkeyPress}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                            />
                        )}
                        />
                    </Grid>
                    <Grid item md={1} xs={12}>
                    <IconButton
                            size='small'
                            aria-label='add'
                        >
                            <TextsmsIcon style={{ color: '#FF8000' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={2} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Sector'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
            <Grid item md={4} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Hotel Name'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
            <Grid item md={2} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Status'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
        </Grid>
        <Grid item container spacing={2} >
            <Grid item md={4} xs={12}>
            <Controller
              name='searchICAO'
              control={control}
              defaultValue=''
              render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                  rootHelperTextStyle={classes.input}
                  name={name}
                  helperText='Operator/Customer'
                  //onKeyDown={onSearchICAOIATAkeyPress}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputRef={register()}
                  />
              )}
              />
            </Grid>
            <Grid item md={2} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Registration'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
            <Grid item md={4} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Location'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
            <Grid item md={2} xs={12} className={classes.space}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Aircraft Type'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
        </Grid>
        <Typography
          className={classes.secondaryHeading}
          style={{
            borderBottom:`2px solid ${theme.palette.common.primaryColor}`,
            marginBottom:'20px'
          }}
        >
          Crew Information
        </Typography>
        {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.blockOverflightList} >
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
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
                        placeholder='Crew Name'
                        onChange={onChange}
                        inputRef={register({
                          required: 'Please Select " Fuel Quote Number "',
                        })}
                      />
                    )}
                  />
              </Grid>
              <Grid item md={2} xs={12}>
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
                        placeholder='Confirmation #'
                        onChange={onChange}
                        inputRef={register({
                          required: 'Please Select " Fuel Quote Number "',
                        })}
                      />
                    )}
                  />
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
                      placeholder='Rooms'
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
                  name={`fuel[${index}].location`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Uplift Airport - ICAO "',
                  }}
                  defaultValue={field.location || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Guest'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].location`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Uplift Airport - ICAO "',
                  }}
                  defaultValue={field.location || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Room Rate'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelType`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Type "',
                  }}
                  defaultValue={field.fuelType || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Transport'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Check In Date'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Local Time'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Check Out Date'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Local Time'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name={`fuel[${index}].fuelSupplier`}
                  control={control}
                  rules={{
                    required: 'Please Insert " Fuel Supplier Name "',
                  }}
                  defaultValue={field.fuelSupplier || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      placeholder='Transport'
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
                <Grid container direction='row' spacing={3}>
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
       <Grid item md={12} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Additional Remarks'
                        multiline={true}
                        rows={4}
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
        <Grid item xs={12} align='right'>
            <Button
            type='submit'
            color='primary'
            className={classes.addButton}
            variant='contained'
            >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:"center"
                }}
            >
            Save
            </div>
            </Button>
         </Grid>
    </Grid>
    </div>
</Fragment>
  );
};

export default HotelReservation;
