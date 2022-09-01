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
  getServiceProviderByCountry,
  addServiceProvider,
  updateServiceProvider,
  updatePrefferedServiceProvider,
} from '../../redux/actions/serviceProviderActions';
import {
  setAlert
} from '../../redux/actions/alertActions';
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

const ServiceProvider = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // SWR
  const { data: countries } = useSWR(path.ALLCOUNTRIES);
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

  const selectedVenderType = watch('venderType')

  // Redux
  const dispatch = useDispatch();
  const { serviceProviderAdded, loading: serviceProviderAddedLoading } = useSelector((state) => state.addServiceProvider);
  const { serviceProviderUpdated, loading: serviceProviderUpdatedLoading } = useSelector((state) => state.updateServiceProvider);
  const { country, loading } = useSelector((state) => state.getServiceProviderByCountry);
  const { modalData } = useSelector((state) => state.modal);
  // State
  const [selectedServiceProvider, setselectedServiceProvider] = useState(null);
  const [autoCompleteKey, setAutoCompleteKey] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    return () =>  dispatch(getServiceProviderByCountry(null));
  },[dispatch])

  const resetField = () => {
    reset({
      ...getValues(),
      serviceProviderCode: '',
      venderType:'',
      serviceProviderName: '',
      country: '',
      vatNo: '',
      serviceProviderType: '',
      email: '',
      aftnSita: '',
      telephone: '',
      faxNumber: '',
      currency: '',
      requestMethod: '',
      remark: '',
      normal: '',
      revision: '',
      urgent: '',
      caaFees: '',
    });
  };

  // On Submit
  const onSubmit = (formData, e) => {
    e.preventDefault()
    if(selectedVenderType === "NEW VENDER") {
      dispatch(addServiceProvider(formData))
    }
    else if(selectedVenderType === "UPDATE VENDER") {
      if(selectedServiceProvider && selectedServiceProvider._id) {
        dispatch(updateServiceProvider(formData, selectedServiceProvider._id))
      } else {
        dispatch(
          setAlert(
            true,
            'error',
            `Please select Available Permit Vender`
          )
        );
      }
      
    }
    
  };

  useEffect(() => {
    if(serviceProviderAdded || serviceProviderUpdated) {
      setAutoCompleteKey(!autoCompleteKey)
      dispatch(getServiceProviderByCountry(null));
      setselectedServiceProvider(null);
      resetField();
      reset({searchcountry:''})
      reset({telephone:''})
      reset({email:''})
    }
  },[serviceProviderAdded, serviceProviderUpdated])

  useEffect(() => {
    if (selectedServiceProvider) {
      reset({
        ...getValues(),
        serviceProviderCode: selectedServiceProvider.serviceProviderCode
          ? selectedServiceProvider.serviceProviderCode
          : '',
        serviceProviderName: selectedServiceProvider.serviceProviderName
          ? selectedServiceProvider.serviceProviderName
          : '',
        country: selectedServiceProvider.country
          ? selectedServiceProvider.country
          : '',
        vatNo: selectedServiceProvider.vatNo
          ? selectedServiceProvider.vatNo
          : '',
        serviceProviderType: selectedServiceProvider.serviceProviderType
          ? selectedServiceProvider.serviceProviderType
          : '',
        email: selectedServiceProvider.email
          ? selectedServiceProvider.email
          : '',
        aftnSita: selectedServiceProvider.aftnSita
          ? selectedServiceProvider.aftnSita
          : '',
        telephone: selectedServiceProvider.telephone
          ? selectedServiceProvider.telephone
          : '',
        faxNumber: selectedServiceProvider.faxNumber
          ? selectedServiceProvider.faxNumber
          : '',
        currency: selectedServiceProvider.currency
          ? selectedServiceProvider.currency
          : '',
        requestMethod: selectedServiceProvider.requestMethod
          ? selectedServiceProvider.requestMethod
          : '',
        remark: selectedServiceProvider.remark
          ? selectedServiceProvider.remark
          : '',
        normal: selectedServiceProvider.normal
          ? selectedServiceProvider.normal
          : '',
        revision: selectedServiceProvider.revision
          ? selectedServiceProvider.revision
          : '',
        urgent: selectedServiceProvider.urgent
          ? selectedServiceProvider.urgent
          : '',
        caaFees: selectedServiceProvider.caaFees
          ? selectedServiceProvider.caaFees
          : '',
      });
    }
    
  }, [selectedServiceProvider, reset, getValues]);

  
  

  const handleClick = (event, data) => {
    const formData = {
      id: data._id,
      country: data.country,
    };
    dispatch(updatePrefferedServiceProvider(formData));
    setselectedServiceProvider(null);
    resetField();
  };
  return (
    <>
    {modalData && modalData.modal && <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.primaryHeading}>
              Service Provider
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
    </AppBar>}
    <Loader open={serviceProviderAddedLoading || serviceProviderUpdatedLoading} />
    <form style={{ padding: 0, margin: 0 }} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' style={{marginTop: modalData && modalData.modal && '50px'}}>
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
          <Grid item md={2} xs={12}>
            <Controller
              render={({ onChange, ...props }) => (
                <RHFAutoComplete
                  Options={countries ? countries.data : [{ country: '' }]}
                  //name='searchcountry'
                  disabled={countries && countries.data}
                  optionLabel={(option) => option.country}
                  value={props.value || ''}
                  label='Search By Country'
                  key={autoCompleteKey}
                  onChange={(e, data) => {
                    if (data && data.country) {
                      onChange(data.country);
                      setselectedServiceProvider(null);
                      dispatch(getServiceProviderByCountry(data.country));
                      setSelectedCountry(data.country)
                      resetField();
                    } else {
                      onChange(e.target.value);
                      setselectedServiceProvider(null);
                      // dispatch(getServiceProviderByCountry(null));
                      setSelectedCountry('')
                      resetField();
                    }
                  }}
                />
              )}
              defaultValue=''
              onChange={([, data]) => data}
              name='searchcountry'
              control={control}
            />
          </Grid>
          <Grid item md={2} xs={12}>
              <Controller
                as={
                  <RHFSelect
                    menuItem={['NEW VENDER', 'UPDATE VENDER']}
                    disabled={selectedCountry === ""}
                    label='Select Vender Type'
                    labelColor={theme.palette.common.secondaryColor}
                    textColor={theme.palette.common.secondaryColor}
                  />
                }
                name='venderType'
                control={control}
                defaultValue=''
              />
          </Grid>
           <Grid item md={8} xs={12}>
            <Typography className={classes.secondaryHeading}></Typography>
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
                Available Service Provider's
              </Typography>
              {loading && <LinearProgress />}
            </Grid>

            <List component='nav' aria-label='service provider'>
              {country && country.length !== 0 ? (
                country.map((i) => (
                  <Fragment key={i._id}>
                    <ContextMenuTrigger
                      id='preffered_service_provider'
                      collect={() => i}
                    >
                      <ListItem
                        // className={classes.listWrap}
                        button
                        onClick={() => {
                          setselectedServiceProvider(null);
                          setselectedServiceProvider(i);
                        }}
                      >
                        {i.preffered === true ? (
                          <FiberManualRecordIcon
                            className={classes.preffered}
                          />
                        ) : (
                          <FiberManualRecordIcon
                            className={classes.nonPreffered}
                          />
                        )}

                        <ListItemText
                          primary={i.serviceProviderName}
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
                Service Provider Information
              </Typography>
            </Grid>
            {/* 1 */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12}>
                <Controller
                  name='serviceProviderCode'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Code (3 Letters)'
                      rootInputBackgroundColor={
                        selectedServiceProvider &&
                        selectedServiceProvider.preffered === true &&
                        theme.palette.common.preffered
                      }
                      rootHelperTextStyle={classes.input}
                      name={name}
                      error={errors.serviceProviderCode}
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
                  name='serviceProviderName'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      error={errors.serviceProviderName}
                      helperText='Service Provider Name'
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
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={countries ? countries.data : [{ country: '' }]}
                      name='country'
                      disabled={countries && countries.data}
                      optionLabel={(option) => option.country}
                      value={props.value || ''}
                      label='Country'
                      error={errors.country}
                      onChange={(e, data) => {
                        if (data && data.country) {
                          onChange(data.country);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  onChange={([, data]) => data}
                  rules={{
                    required: 'this is required',
                  }}
                  name='country'
                  control={control}
                />
              </Grid>
            </Grid>
            {/* 2 */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12}>
                <Controller
                  name='vatNo'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='VAT #'
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
              <Grid item md={10} xs={12}>
                <Controller
                  name='telephone'
                  control={control}
                  rules={{
                    required: 'this is required',
                  }}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Telephone'
                      //multiline={true}
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
            {/* 3 */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={['CONTRACTED', 'NOT CONTRACTED']}
                      label='Type'
                    />
                  }
                  name='serviceProviderType'
                  control={control}
                  defaultValue=''
                />
              </Grid>

              <Grid item md={5} xs={12}>
                <Controller
                  name='faxNumber'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Fax Number'
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
                  name='aftnSita'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='AFTN / SITA'
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
            {/* 4 */}
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={2} xs={12}>
                <Controller
                  as={
                    <RHFSelect
                      menuItem={['EMAIL', 'AFTN', 'ONLINE', 'FORM', 'FAX']}
                      label='Request Method'
                    />
                  }
                  name='requestMethod'
                  control={control}
                  defaultValue=''
                />
              </Grid>
              <Grid item md={10} xs={12}>
                <Controller
                  name='email'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Email'
                      //multiline={true}
                      error={errors.email}
                      rootHelperTextStyle={classes.input}
                      inputTextTransform='lowercase'
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
            {/* 5 */}
            <Grid
              item
              container
              direction='row'
              spacing={!matchesSM && 3}
              //  className={classes.space}
            >
              <Grid item md={2} xs={12} className={classes.space}>
                <Controller
                  render={({ onChange, ...props }) => (
                    <RHFAutoComplete
                      Options={countries ? countries.data : [{ country: '' }]}
                      name='currency'
                      disabled={countries && countries.data}
                      optionLabel={(option) => option.country}
                      renderOption={(option) =>
                        option.country +
                        ' - ' +
                        option.currency +
                        ' - ' +
                        option.currencyCode
                      }
                      value={props.value || ''}
                      label='Currency'
                      onChange={(e, data) => {
                        if (data && data.currencyCode) {
                          onChange(data.currencyCode);
                        } else {
                          onChange(e.target.value);
                        }
                      }}
                    />
                  )}
                  defaultValue=''
                  onChange={([, data]) => data}
                  name='currency'
                  control={control}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Controller
                  name='normal'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Normal'
                      rootInputBackgroundColor='#CCFFFF'
                      rootHelperTextStyle={classes.input}
                      name={name}
                      inputTextAlign='center'
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
                  name='revision'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Revision'
                      rootInputBackgroundColor='#CCFFFF'
                      rootHelperTextStyle={classes.input}
                      inputTextAlign='center'
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
                  name='urgent'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootInputBackgroundColor='#CCFFFF'
                      inputTextAlign='center'
                      helperText='Urgent'
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
                  name='caaFees'
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      rootInputBackgroundColor='#CCFFFF'
                      inputTextAlign='center'
                      helperText='CAA Fees'
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
            {/* 7 */}
            <Grid item md={12} xs={12}>
              <Controller
                name='remark'
                control={control}
                defaultValue=''
                render={({ onChange, onBlur, value, name }) => (
                  <RHFInput
                    helperText='Remark'
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
            {/* 6 */}
            <Grid item xs={12} align='right'>
              <Button
                type='submit'
                color='primary'
                className={classes.addButton}
                variant='contained'
                disabled={selectedVenderType === ""}
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
      <ContextMenu id='preffered_service_provider'>
        <MenuItem data={{ action: 'preffered' }} onClick={handleClick}>
          Preferred Service Provider
        </MenuItem>
      </ContextMenu>
    </form>
    </>
  );
};

export default ServiceProvider;
