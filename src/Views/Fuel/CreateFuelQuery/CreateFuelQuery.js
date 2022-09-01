import React, { Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import useSWR from 'swr';

import { container } from '../../../components/Common/CommonStyles';
import path from '../../../utils/path';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { openModal } from '../../../redux/actions/modalActions';
import { getIcaoIata } from '../../../redux/actions/airportActions';

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
    ...theme.typography.mainButton,
  },
  addButtonIcon: {
    ...theme.typography.mainButtonIcon,
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
}));

const CreateFuelQuery = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // Redux
  const dispatch = useDispatch();
  const { airport, loading } = useSelector((state) => state.airportData);
  // SWR
  const { data: fuelProviders } = useSWR(path.FUELPROVIDER);
  // RHF
  const { register, control, handleSubmit, setValue } = useForm();
  // On Submit
  const onSubmit = (formData, e) => {};

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Fuel Query
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
          style={{ padding: 0, margin: 0 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container direction='column'>
            {/* 1st row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={classes.secondaryHeading}
                style={{
                  backgroundColor: theme.palette.common.primaryColor,
                  color: theme.palette.common.whiteColor,
                }}
              >
                Airport Information
              </Typography>
              {loading && <LinearProgress />}
            </Grid>
            {/* 1st row end */}
            {/* 2nd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={1} xs={12} className={classes.space}>
                <Controller
                  name='icao'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='ICAO'
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
              <Grid item md={1} xs={12}>
                <Controller
                  name='iata'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='IATA'
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
              <Grid item md={2} xs={12}>
                <Controller
                  name='city'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='City'
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
              <Grid item md={5} xs={12}>
                <Controller
                  name='airport'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Airport'
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
              <Grid item md={3} xs={12}>
                <Controller
                  name='country'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Country'
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
            {/* 2nd row end */}
            {/* 3rd row start */}
            <Grid item md={12} xs={12} className={classes.space}>
              <Typography
                className={classes.secondaryHeading}
                style={{
                  backgroundColor: theme.palette.common.primaryColor,
                  color: theme.palette.common.whiteColor,
                }}
              >
                Fuel Information
              </Typography>
            </Grid>
            {/* 1st row end */}
            {/* 2nd row start */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12} className={classes.space}>
                <Controller
                  name='upliftlocation'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Uplift Location'
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={(e) => {
                        e.preventDefault();
                        dispatch(getIcaoIata(value));
                      }}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='aircrafttype'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Aircraft Type'
                      rootHelperTextStyle={classes.input}
                      name={name}
                      value={value}
                      onBlur={() => {
                        setValue(
                          `icao`,
                          airport && airport[0] && airport[0].icao,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `iata`,
                          airport && airport[0] && airport[0].iata,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `city`,
                          airport && airport[0] && airport[0].cityName,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `airport`,
                          airport && airport[0] && airport[0].airportName,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                        setValue(
                          `country`,
                          airport && airport[0] && airport[0].countryName,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );
                      }}
                      onChange={onChange}
                      inputRef={register()}
                    />
                  )}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={['Jet A1', 'AVGAS', 'TC-1']}
                      label='Fuel Type'
                    />
                  }
                  name='fueltype'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={
                        fuelProviders &&
                        fuelProviders.data &&
                        fuelProviders.data[0]
                          ? fuelProviders.data.map((i) => i.fuelProvider)
                          : ['NO DATA FOUND']
                      }
                      label='Fuel Supplier'
                    />
                  }
                  name='fuelsupplier'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Button
                  color='primary'
                  className={classes.addButton}
                  variant='contained'
                  type='submit'
                  style={{ width: '100%' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LocalGasStationIcon
                      fontSize='small'
                      className={classes.addButtonIcon}
                    />
                    Create Query Email
                  </div>
                </Button>
              </Grid>
            </Grid>
            {/* 3rd row end */}
            {/* 4th row start */}
            {/* <Grid item>
              <Grid item xs={12} align='right'>
                <Button
                  color='primary'
                  className={classes.addButton}
                  variant='contained'
                  type='submit'
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <LocalGasStationIcon
                      fontSize='small'
                      className={classes.addButtonIcon}
                    />
                    Create Query Email
                  </div>
                </Button>
              </Grid>
            </Grid> */}
            {/* 4th row end */}
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateFuelQuery;
