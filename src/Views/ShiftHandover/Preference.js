/* esline-disable */
import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useSWR from 'swr';
import { useForm, Controller } from 'react-hook-form';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import path from '../../utils/path';
import RHFInput from '../../components/RHF/RHFInput/RHFInput';
import RHFAutoComplete from '../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';
import Loader from '../../components/Loader/Loader';
import {
  getShifts,
  deleteShift,
  addShift,
  updateShift,
  removeShiftFromState
} from '../../redux/actions/shiftActions';
import { openModal } from '../../redux/actions/modalActions';
import { container } from '../../components/Common/CommonStyles';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
  },
  addButton: {
    ...theme.typography.secondaryButton,
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
  },
  input: {
    ...theme.typography.para,
  },
  selectOption: {
    ...theme.typography.selectOption,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    ...theme.typography.para,
    margin: 2,
    backgroundColor: theme.palette.common.primaryColor,
    color: theme.palette.common.whiteColor,
  },
  chipSelectedOption: {
    backgroundColor: `${theme.palette.common.optionHoverColor} !important`,
  },
  chipIcon: {
    //fill: theme.palette.common.secondaryColor,
  },
  preffered: {
    color: theme.palette.common.preffered,
    marginRight: '0.5rem',
  },
  nonPreffered: {
    color: theme.palette.common.secondaryColor,
    marginRight: '0.5rem',
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
  primaryHeading: {
    ...theme.typography.primaryHeading,
    color: 'white',
  },
  close: {
    cursor: 'pointer',
  },
}));

const StaffProfile = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // RHF
  const {
    handleSubmit,
    register,
    control,
    errors,
    reset,
    getValues,
    watch
  } = useForm();

  const searchShift = watch('search')

  

  // Redux
  const dispatch = useDispatch();
  const { shifts, loading, success } = useSelector((state) => state.shift);
  // State
  const [selectedShift, setselectedShift] = useState(null);


  useEffect(() => {
    dispatch(getShifts())
    return () => dispatch(removeShiftFromState())
  },[dispatch])

  const resetField = () => {
    reset({
      ...getValues(),
      shiftTiming: '',
      search:null,
      shiftType:''
    });
  };

  // On Submit
  const onSubmit = (formData, e) => {
    e.preventDefault()
    if(formData.search !== '') {
      delete formData.search
      formData.id = selectedShift._id
      dispatch(updateShift(formData))
      resetField();
    } else {
      delete formData.search
      dispatch(addShift(formData))
      resetField();
    }    
  };

  

  useEffect(() => {
    if (selectedShift) {
      reset({
        ...getValues(),
        shiftType: selectedShift.shiftType
          ? selectedShift.shiftType
          : '',
        shiftTiming: selectedShift.shiftTiming
          ? selectedShift.shiftTiming
          : '',
      });
    }
    
  }, [selectedShift, reset, getValues]);

  const handleClick = (event, data) => {
    const id= data._id
    dispatch(deleteShift(id));
    setselectedShift(null);
    resetField();
  };

  let filterShiftList;

  if(searchShift !== '' && searchShift  !== null) {
    filterShiftList = (shifts || []).length !== 0 && (shifts.filter(shift => (shift.shiftType && shift.shiftType.toLowerCase().includes(searchShift.toLowerCase()))) || [])
  } else {
    filterShiftList = shifts
  }

  return (
    <>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.primaryHeading}>
              Add Shift
            </Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <CancelIcon
              onClick={() => {
                dispatch(openModal(false, ''));
              }}
              fontSize='large'
              className={classes.close}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <form style={{ padding: 0, margin: 0 }} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' style={{marginTop:'50px'}}>
        <Grid item xs={12} className={classes.space}>
          <Typography className={classes.secondaryHeading}>
            {/* Search Service Provider */}
          </Typography>
        </Grid>
        {/* 1st row start */}
        <Grid
          item
          container
          direction='row'
          style={{ marginBottom: 30 }}
          spacing={matchesSM ? 0 : 1}
        >
          <Grid item md={4} xs={12}>
          <Controller
              name='search'
              control={control}
              defaultValue=''
              render={({ onChange, onBlur, value, name }) => (
                <RHFInput
                  helperText='Search By Shift Type'
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
           <Grid item md={8} xs={12} align='right'>
           <Button
                color="primary"
                onClick={() => {
                  setselectedShift(null);
                  resetField()
                  dispatch(getShifts())
                }}
                //className={classes.addButton}
                variant='contained'
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <RefreshIcon
                    fontSize='small'
                    className={classes.addButtonIcon}
                  />
                  Refresh
                </div>
              </Button>
          </Grid>
        </Grid>
        {/* 1st row end */}
        {/* 2nd row start */}
        <Grid item container direction='row' spacing={matchesSM ? 0 : 3}>
          <Grid
            item
            md={4}
            xs={12}
            style={{ borderRight: !matchesSM && '1px solid #203764' }}
          >
            <Grid item xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Available Shift's
              </Typography>
              {loading && <LinearProgress />}
            </Grid>

            <List component='nav' aria-label='service provider' style={{maxHeight:500, overflowY:"auto",}}>
              {filterShiftList && filterShiftList.length !== 0 ? (
                filterShiftList.map((i) => (
                  <Fragment key={i._id}>
                    <ContextMenuTrigger
                      id='delete_shift'
                      collect={() => i}
                    >
                      <ListItem
                        // className={classes.listWrap}
                        button
                        onClick={() => {
                          setselectedShift(null);
                          setselectedShift(i);
                        }}
                      >
                          <FiberManualRecordIcon
                            className={classes.preffered}
                          />
                        <ListItemText
                          primary={`${i.shiftType}`}
                          classes={{ primary: classes.input }}
                        />
                        <AirplanemodeActiveIcon color='primary' />
                      </ListItem>
                      <Divider />
                    </ContextMenuTrigger>
                  </Fragment>
                ))
              ) : (
                <Fragment>
                  <ListItem button>
                    <ListItemText
                      primary='NO DATA FOUND'
                      classes={{ primary: classes.input }}
                    />
                    <AirplanemodeActiveIcon color='primary' />
                  </ListItem>
                  <Divider />
                </Fragment>
              )}
            </List>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid item xs={12} className={classes.space}>
              <Typography className={classes.secondaryHeading}>
                Shift Information
              </Typography>
            </Grid>
            {/* 1 */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={6} xs={12}>
                <Controller
                  name='shiftType'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Shift Type'
                      rootHelperTextStyle={classes.input}
                      name={name}
                      error={errors.shiftType}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  name='shiftTiming'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      error={errors.shiftTiming}
                      helperText='Shift Timing'
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
        </Grid>
        {/* 2nd row end */}
      </Grid>
      <ContextMenu id='delete_shift'>
        <MenuItem data={{ action: 'delete' }} onClick={handleClick}>
          Delete Shift
        </MenuItem>
      </ContextMenu>
    </form>
    </>
  );
};

export default StaffProfile;
