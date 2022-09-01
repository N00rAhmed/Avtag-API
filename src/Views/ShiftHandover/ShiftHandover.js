import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch,useSelector } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useForm, Controller } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';

import path from '../../utils/path';
import { container } from '../../components/Common/CommonStyles';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import RHFDate from '../../components/RHF/RHFDate/RHFDate';
import { openModal } from '../../redux/actions/modalActions';
import RHFAutoComplete from '../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import {
  addShiftHandover,
  removeShiftHandoverFromState,
  updateShiftHandover
} from '../../redux/actions/shiftHandoverActions';
import {
  getShifts,
  removeShiftFromState
} from '../../redux/actions/shiftActions';
import {
  getStaffProfiles,
  removeStaffProfileFromState
} from '../../redux/actions/staffProfileActions';

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
}));

const ShiftHandover = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // Redux
  const dispatch = useDispatch();
  const { shifts } = useSelector((state) => state.shift);
  const { staffProfiles} = useSelector((state) => state.getStaffProfiles);
  const { success } = useSelector((state) => state.shiftHandover);
  const { modalData } = useSelector((state) => state.modal);

  // RHF
  const { handleSubmit, register, control, reset, getValues ,setValue, errors} = useForm({
    shouldFocusError:false,
    defaultValues: modalData && modalData
  });


  const currentDate = new Date();
  const localTime = currentDate.toTimeString().slice(0, 5).replace(':','');
  const UTCTime = currentDate.toUTCString().slice(-12, -7).replace(':','');

  useEffect(() => {
    dispatch(getShifts())
    dispatch(getStaffProfiles())
    return () => {
      dispatch(removeShiftFromState())
      dispatch(removeStaffProfileFromState())
      dispatch(removeShiftHandoverFromState())
    }
  },[dispatch])

  // On Submit
  const onSubmit = (formData, e) => {
    formData.prepareDate = new Date(
      formData.prepareDate
    ).toLocaleDateString('en-US');
    if(modalData && modalData && modalData._id !== '') {
      formData._id = modalData._id
      dispatch(updateShiftHandover(formData))
    } else {
      dispatch(addShiftHandover(formData))
    }
    
  };

  if(success) {
    dispatch(openModal(false, ''))
    dispatch(removeShiftHandoverFromState())
  }

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
              Create Shift Handover
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
        <form
          style={{ padding: 0, margin: 0, align: 'right' }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={5} xs={12} className={classes.space}>
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={shifts ? shifts : [{ shiftType: '' }]}
                    name='shifts'
                    disabled={shifts && shifts}
                    onFocus={()=> {
                      props.value = ' '
                    }}
                    optionLabel={(option) =>
                      option.shiftType
                        ? option.shiftType.toUpperCase() +
                          ' - ' +
                          option.shiftTiming
                        : 'No Data'
                    }
                    value={props.value || ''}
                    label='Select Shift Type'
                    onChange={(e, data) => {
                      e.preventDefault()
                      if (data && data.shiftType) {
                        onChange(data.shiftType);
                        setValue('shiftTiming', data.shiftTiming, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      } else {
                        onChange(e.target.value);
                      }
                    }}
                    error={errors.shiftType}
                  />
                )}
                defaultValue=''
                rules={{
                  required: 'this is required',
                }}
                onChange={([, data]) => data}
                name='shiftType'
                control={control}
              />
              </Grid>
              <Grid item md={3} xs={12} className={classes.space}>
                <Controller
                  name='shiftTiming'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Shift Timing'
                      error={errors.shiftTiming}
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} xs={12} className={classes.space}>
                <Controller
                  name='prepareTime'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue={`${UTCTime} UTC | ${localTime} Local`}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                    error={errors.prepareTime}
                      helperText='Handover Prepare Time'
                      rootHelperTextStyle={classes.input}
                      inputColor="red"
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={5} xs={12} className={classes.space}>
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={staffProfiles ? staffProfiles : [{ firstName: '' }]}
                    name='staffs'
                    disabled={staffProfiles && staffProfiles}
                    error={errors.staffName}
                    onFocus={()=> {
                      props.value = ' '
                    }}
                    optionLabel={(option) =>
                      option.firstName
                        ? option.firstName.toUpperCase() +
                          ' ' +
                          option.lastName
                        : 'No Data'
                    }
                    value={props.value || ''}
                    label='Select Staff Name'
                    onChange={(e, data) => {
                      e.preventDefault()
                      if (data && data.firstName) {
                        onChange(`${data.firstName} ${data.lastName}`);
                        setValue('jobTitle', data.jobTitle, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      } else {
                        onChange(e.target.value);
                      }
                    }}
                  />
                )}
                defaultValue=''
                rules={{
                  required: 'this is required',
                }}
                onChange={([, data]) => data}
                name='staffName'
                control={control}
              />
              </Grid>
              <Grid item md={3} xs={12} className={classes.space}>
                <Controller
                  name='jobTitle'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Job Title'
                      error={errors.jobTitle}
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3} xs={12} className={classes.space}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Controller
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFDate
                            helperText='Handover Prepare Date'
                            iconSize="small"
                            error={errors.prepareDate}
                            rootHelperTextStyle={classes.input}
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                          />
                        )}
                        name='prepareDate'
                        defaultValue={new Date()}
                        rules={{
                          required: 'this is required',
                        }}
                        control={control}
                      />
                    </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Typography
                className={classes.secondaryHeading}
                style={{
                    borderBottom:`2px solid ${theme.palette.common.primaryColor}`,
                    marginBottom:'20px'
                }}
            >
                Shift Handover
            </Typography>
            <Grid item md={12} xs={12} className={classes.space}>
              <Controller
                    name='shiftHandoverRemark'
                    control={control}
                    rules={{
                      required: 'this is required',
                    }}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        error={errors.shiftHandoverRemark}
                        rootInputBackgroundColor='#E9E9E9'
                        multiline={true}
                        rows={8}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
              </Grid>
            <Typography
                className={classes.secondaryHeading}
                style={{
                    borderBottom:`2px solid ${theme.palette.common.primaryColor}`,
                    marginBottom:'20px',
                    color:`${theme.palette.common.secondaryColor}`
                }}
            >
                Important Remarks By Management
            </Typography>
            <Grid item md={12} xs={12} className={classes.space}>
              <Controller
                    name='managementRemark'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: 'this is required',
                    }}
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        error={errors.managementRemark}
                        rootInputBackgroundColor='#E9E9E9'
                        multiline={true}
                        rows={8}
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
                  }}
                >
                  <SaveIcon
                    fontSize='small'
                    className={classes.addButtonIcon}
                  />
                  Save
                </div>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default ShiftHandover;
