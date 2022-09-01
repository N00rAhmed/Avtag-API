import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useForm, Controller } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';

import path from '../../../utils/path';
import { container } from '../../../components/Common/CommonStyles';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import RHFAutoComplete from '../../../components/RHF/RHFAutoComplete/RHFAutoComplete';
import { openModal } from '../../../redux/actions/modalActions';
import {
  addFuelProvider,
  updateFuelProvider,
} from '../../../redux/actions/fuelProviderActions';

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
}));

const CreateFuelSupplier = () => {
  // Material UI
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // SWR
  const { data: fuelProviders } = useSWR(path.FUELPROVIDER);
  // Redux
  const dispatch = useDispatch();
  // RHF
  const { handleSubmit, register, control, reset, getValues } = useForm();
  // Confirm Dialog
  const confirm = useConfirm();
  // State
  const [selectedFuelProvider, setselectedFuelProvider] = useState(null);
  // On Submit
  const onSubmit = (formData, e) => {
    if (formData.searchfuelProvider !== '') {
      formData.id = selectedFuelProvider._id;
      confirm({
        title: (
          <div style={{ fontSize: '1.1rem' }}>
            Are you sure you want to update Fuel Provider information ?
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
          dispatch(updateFuelProvider(formData));
        })
        .catch(() => {
          /* ... */
        });
    } else {
      dispatch(addFuelProvider(formData));
    }
  };
  // Populate Form
  useEffect(() => {
    if (selectedFuelProvider) {
      reset({
        ...getValues(),
        fuelProvider: selectedFuelProvider.fuelProvider
          ? selectedFuelProvider.fuelProvider
          : '',
        email: selectedFuelProvider.email ? selectedFuelProvider.email : '',
      });
    }
  }, [selectedFuelProvider, reset, getValues]);
  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Fuel Supplier
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
            <Grid item md={12} xs={12}>
              <Controller
                render={({ onChange, ...props }) => (
                  <RHFAutoComplete
                    Options={
                      fuelProviders
                        ? fuelProviders.data
                        : [{ fuelProvider: '' }]
                    }
                    disabled={fuelProviders && fuelProviders.data}
                    optionLabel={(option) => option.fuelProvider}
                    value={props.value || ''}
                    label='Search By Fuel Provider'
                    onChange={(e, data) => {
                      if (data && data.fuelProvider) {
                        onChange(data.fuelProvider);
                        setselectedFuelProvider(data);
                      } else {
                        onChange(e.target.value);
                      }
                    }}
                  />
                )}
                defaultValue=''
                onChange={([, data]) => data}
                name='searchfuelProvider'
                control={control}
              />
            </Grid>
            <Grid item container direction='row' spacing={!matchesSM && 3}>
              <Grid item md={5} xs={12} className={classes.space}>
                <Controller
                  name='fuelProvider'
                  rules={{
                    required: 'this is required',
                  }}
                  control={control}
                  defaultValue=''
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFInput
                      helperText='Fuel Provider'
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
              <Grid item md={7} xs={12} className={classes.space}>
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
        </form>
      </div>
    </Fragment>
  );
};

export default CreateFuelSupplier;
