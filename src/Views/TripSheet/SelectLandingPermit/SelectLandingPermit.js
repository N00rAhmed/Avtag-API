import React, { Fragment, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useForm, Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LinearProgress from '@material-ui/core/LinearProgress';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useSWR from 'swr';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import path from '../../../utils/path';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { container } from '../../../components/Common/CommonStyles';
import { openModal } from '../../../redux/actions/modalActions';
import {
  getGroundHandlersByICAO,
  getGroundHandlersByIATA,
  getSelectedGroundHandlerByICAOOrIATA,
} from '../../../redux/actions/groundHandlerActions';

import {
  getServiceProviderByCountry,
  getSelectedServiceProviderByCountry,
} from '../../../redux/actions/serviceProviderActions';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
  },
  secondaryHeading: {
    ...theme.typography.secondaryHeading,
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
  preffered: {
    color: theme.palette.common.preffered,
    marginRight: '0.5rem',
  },
  nonPreffered: {
    color: theme.palette.common.secondaryColor,
    marginRight: '0.5rem',
  },
}));

const SelectLandingPermit = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  // RHF
  const { register, control, watch, setValue } = useForm();
  const searchOptions = watch('searchoption');
  // SWR
  const { data: countries } = useSWR(path.ALLCOUNTRIES);
  // Redux
  const dispatch = useDispatch();
  const {
    country: ServiceProvider,
    loading: ServiceProviderLoading,
  } = useSelector((state) => state.getServiceProviderByCountry);
  const { data: GroundHandler, loading: GroundHandlerLoading } = useSelector(
    (state) => state.icaoGroundHandlers
  );
  const { modalData } = useSelector((state) => state.modal);
  console.log(modalData && modalData)

  const handleListClick = (i) => {};

  // Populate Form
  useEffect(() => {
    setValue('searchoption', 'SEARCH COUNTRY');
    dispatch(getServiceProviderByCountry(null));
    dispatch(getGroundHandlersByICAO(null));
    dispatch(getGroundHandlersByIATA(null));
  }, [setValue]);

  // useEffect(() => {
  //   return () =>  {
  //     dispatch(getServiceProviderByCountry(null));
  //     dispatch(getGroundHandlersByICAO(null));
  //     dispatch(getGroundHandlersByIATA(null));
  //   }
  // }, []);

  const onSearchICAOIATAkeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const userValue = e.target.value;
      if (userValue.length === 4) {
        dispatch(getServiceProviderByCountry(null));
        dispatch(getGroundHandlersByICAO(userValue));
      } else if (userValue.length === 3) {
        dispatch(getServiceProviderByCountry(null));
        dispatch(getGroundHandlersByIATA(userValue));
      }
    }
  };

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Country | Airport
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <CancelIcon
                onClick={() => {
                  dispatch(getGroundHandlersByICAO(null));
                  dispatch(getGroundHandlersByIATA(null));
                  dispatch(getServiceProviderByCountry(null));
                  dispatch(openModal(false, ''));
                }}
                fontSize='large'
                className={classes.close}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container direction='column'>
          {/* 1st row start */}
          <Grid item md={12} xs={12}>
            {searchOptions === 'SEARCH COUNTRY' ? (
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={countries ? countries.data : [{ country: '' }]}
                    //name='searchcountry'
                    disabled={countries && countries.data && (modalData.permitType==="OVERFLY PERMIT" || modalData.permitType==="NAVIGATION")}
                    optionLabel={(option) => option.country}
                    value={props.value || ''}
                    label='Search By'
                    onChange={(e, data) => {
                      if (data && data.country) {
                        onChange(data.country);
                        dispatch(getGroundHandlersByICAO(null));
                        dispatch(getGroundHandlersByIATA(null));
                        dispatch(getServiceProviderByCountry(data.country));
                      } else {
                        onChange(e.target.value);
                      }
                    }}
                  />
                )}
                defaultValue=''
                onChange={([, data]) => data}
                name='searchCountry'
                control={control}
              />
            ) : (
              <Controller
                name='searchICAO'
                control={control}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Search By'
                    rootHelperTextStyle={classes.input}
                    name={name}
                    onKeyDown={onSearchICAOIATAkeyPress}
                    value={value}
                    disabled={(modalData.permitType==="OVERFLY PERMIT" || modalData.permitType==="NAVIGATION")}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={register()}
                  />
                )}
              />
            )}
            <FormControl component='fieldset'>
              <Controller
                as={
                  <RadioGroup row>
                    <FormControlLabel
                      value='SEARCH COUNTRY'
                      control={
                        <Radio
                          size='small'
                          color='primary'
                          style={{
                            color:
                              searchOptions === 'SEARCH COUNTRY' &&
                              theme.palette.common.selectedMenuColor,
                          }}
                          onClick={() => {
                            setValue('searchCountry', '');
                          }}
                        />
                      }
                      label='SEARCH COUNTRY'
                      classes={{
                        label: classes.input,
                      }}
                    />
                    <FormControlLabel
                      value='ICAO / IATA'
                      control={
                        <Radio
                          size='small'
                          color='primary'
                          style={{
                            color:
                              searchOptions === 'ICAO / IATA' &&
                              theme.palette.common.secondaryColor,
                          }}
                          onClick={() => {
                            setValue('searchCountry', '');
                          }}
                        />
                      }
                      label='ICAO / IATA'
                      classes={{
                        label: classes.input,
                      }}
                    />
                  </RadioGroup>
                }
                name='searchoption'
                defaultValue='ICAO / IATA'
                control={control}
              />
            </FormControl>
          </Grid>
          {/* 1st row end */}
          {/* 2nd row start */}
          <Grid item xs={12} className={classes.space}>
            <Typography className={classes.secondaryHeading}>
              Available Provider's
            </Typography>
            {(ServiceProviderLoading || GroundHandlerLoading) && (
              <LinearProgress />
            )}
          </Grid>

          <List component='nav' aria-label='ICAO / IATA'>
            {ServiceProvider && ServiceProvider.length !== 0 ? (
              ServiceProvider.map((i) => (
                <Fragment key={i._id}>
                  <ListItem button onClick={() => handleListClick(i)}>
                    {i.preffered === true ? (
                      <FiberManualRecordIcon className={classes.preffered} />
                    ) : (
                      <FiberManualRecordIcon className={classes.nonPreffered} />
                    )}

                    <ListItemText
                      primary={i.serviceProviderName}
                      classes={{ primary: classes.input }}
                    />
                    <ListItemIcon
                      onClick={() => {
                        const data = {
                          index: modalData.index,
                          country: i.country,
                          serviceProviderName: i.serviceProviderName,
                          serviceProviderCode: i.serviceProviderCode,
                        };
                        dispatch(getSelectedServiceProviderByCountry(data));
                        dispatch(openModal(false, ''));
                      }}
                    >
                      <LibraryAddCheckIcon style={{ color: '#FF8000' }} />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))
            ) : GroundHandler && GroundHandler.length !== 0 ? (
              GroundHandler.map((i) => (
                <Fragment key={i._id}>
                  <ListItem button>
                    {i.preferred === true ? (
                      <FiberManualRecordIcon className={classes.preffered} />
                    ) : (
                      <FiberManualRecordIcon className={classes.nonPreffered} />
                    )}

                    <ListItemText
                      primary={i.handlerName}
                      classes={{ primary: classes.input }}
                    />
                    <ListItemIcon
                      onClick={() => {
                        const data = {
                          index: modalData.index,
                          groundHandlerName: i.handlerName,
                          icaoIata: `${i.icao}/${i.iata}`,
                        };
                        dispatch(getSelectedGroundHandlerByICAOOrIATA(data));
                        dispatch(openModal(false, ''));
                      }}
                    >
                      <LibraryAddCheckIcon style={{ color: '#FF8000' }} />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
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
      </div>
    </Fragment>
  );
};

export default SelectLandingPermit;
