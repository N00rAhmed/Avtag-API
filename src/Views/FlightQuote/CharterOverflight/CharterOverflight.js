import React, { useEffect } from 'react';
import { useFieldArray, Controller, useForm } from 'react-hook-form';
import { makeStyles,useTheme } from '@material-ui/core/styles';
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
import { Status } from '../../TripSheet/TripSheetData';
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
  fuelList:{
    listStyleType:"none",
    marginTop:"10px"
  },
  space: {
    marginBottom: '10px',
  },
  headingSpace: {
    marginBottom: '3px !important',
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
  customButton:{
    width:"100%",
    height:30
  },
  tertiaryHeading: {
    ...theme.typography.tertiaryHeading,
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
  },
  preStyle: {
    display: 'inline',
    margin: 0,
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
  // Redux
  const dispatch = useDispatch();
  const theme = useTheme();
  //const { selectedFuelQuote } = useSelector((state) => state.fuelQuotations);

  //  // Load fuel for Update
  //  useEffect(() => {
  //   if(fuel && fuel.length !== 0) {
  //     reset({
  //       ...getValues(),
  //       fuel: fuel,
  //     });
  //   }
  // },[reset, fuel, getValues])

  // useEffect(() => {
  //   if (selectedFuelQuote && selectedFuelQuote.fuelQuote.quoteNo) {
  //     setValue(
  //       `fuel[${selectedFuelQuote.index}].quoteNo`,
  //       selectedFuelQuote.fuelQuote.quoteNo,
  //       {
  //         shouldDirty: true,
  //         shouldValidate: true,
  //       }
  //     );
  //     setValue(
  //       `fuel[${selectedFuelQuote.index}].location`,
  //       selectedFuelQuote.fuelQuote.icao,
  //       {
  //         shouldDirty: true,
  //         shouldValidate: true,
  //       }
  //     );
  //     setValue(
  //       `fuel[${selectedFuelQuote.index}].fuelSupplier`,
  //       selectedFuelQuote.fuelQuote.fuelSupplier,
  //       {
  //         shouldDirty: true,
  //         shouldValidate: true,
  //       }
  //     );
  //     setValue(
  //       `fuel[${selectedFuelQuote.index}].fuelType`,
  //       selectedFuelQuote.fuelQuote.fuelType,
  //       {
  //         shouldDirty: true,
  //         shouldValidate: true,
  //       }
  //     );
  //     setValue(`fuel[${selectedFuelQuote.index}].sector`, 'TBA', {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     });
  //     setValue(`fuel[${selectedFuelQuote.index}].ipAgent`, 'TBA', {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     });
  //     setValue(`fuel[${selectedFuelQuote.index}].status`, 'PENDING', {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     });
  //   }
  // }, [setValue, selectedFuelQuote]);



  // Field Array
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'fuel',
  });

  useEffect(() => {
    if(fields && fields.length ===0) {
      append({})
    }
  },[onDelete])

  return (
    <div>
      <Grid item md={12} xs={12} className={classes.space}>
        <Typography
          className={classes.secondaryHeading}
          style={{
            borderBottom:`2px solid ${theme.palette.common.primaryColor}`
          }}
        >
          Flight Details
        </Typography>
        </Grid>
        <Grid item container spacing={2} style={{marginTop:"10px", marginBottom:"30px"}}>
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
                        placeholder='Customer/Operator Name'
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
                        placeholder='Permit Type'
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
                  <Button
                  type='submit'
                  color='primary'
                  fullWidth
                  className={classes.addButton}
                  variant='contained'
                  style={{width:"80%"}}
                  onClick={() => {
                    dispatch(
                      openModal(true, 'UpdateCharterOverflightCharges', 'md')
                    );
                  }}
                >
                    <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:"center"
                    }}
                  >
                    Update Charges
                  </div>
                </Button>
                
                </Grid>
            </Grid>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.fuelList} >
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <Grid container direction='row'>
                <Grid item md={11} xs={11}>
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
                          placeholder='Country'
                          onChange={onChange}
                          inputRef={register({
                            required: 'Please Select " Fuel Quote Number "',
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='add'
                      onClick={(e) => {
                        e.preventDefault();
                        const data = {
                          index,
                        };
                        // dispatch(
                        //   openModal(true, 'SelectFuelQuote', 'md', data)
                        // );
                      }}
                    >
                      <TextsmsIcon style={{ color: '#FF8000' }} />
                    </IconButton>
                  </Grid>
                  
                </Grid>
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
                      placeholder='Charges'
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
                      placeholder='CAA Fees'
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
                      placeholder='Lead Time'
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
                <Grid container direction='row' spacing={3} justify="center">
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
      <Grid
      justify="flex-end"
      md={11}
      container 
    >
      <Grid item md={3} style={{marginTop:"30px"}}>
          <Button
              type='submit'
              color='primary'
              fullWidth
              className={classes.addButton}
              variant='contained'
              style={{width:"100%"}}
            >
                <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:"center"
                }}
              >
                Create Email
              </div>
            </Button>
          </Grid>
    </Grid>
        
    </div>
  );
};

export default Fuel;
