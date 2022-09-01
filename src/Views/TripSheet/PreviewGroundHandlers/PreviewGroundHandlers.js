import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { container } from '../../../components/Common/CommonStyles';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { openModal } from '../../../redux/actions/modalActions';

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

const PreviewGroundHandlers = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  // RHF
  const { register, control } = useForm({
    defaultValues: { groundhandler: modalData && modalData.groundHandler },
  });
  // Field Array
  const { fields } = useFieldArray({
    control,
    name: 'groundhandler',
  });

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Ground Handler Data
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
          {fields.map((field, index) => {
            return (
              <li key={field.id} style={{ listStyleType: 'none' }}>
                <Grid container spacing={2}>
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].sector`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.sector || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='Sector'
                          helperText='SECTOR'
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].airport`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.airport || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='AIRPORT'
                          helperText='AIRPORT'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].status`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.status || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='STATUS'
                          helperText='STATUS'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].handler`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.handler || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='GROUND HANDLER'
                          helperText='GROUND HANDLER'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].flightSupervisor`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.flightSupervisor || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='FLIGHT SUPERVISOR'
                          helperText='FLIGHT SUPERVISOR'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].supervisorCell`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.supervisorCell || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='SUPERVISOR CELL'
                          helperText='SUPERVISOR CELL'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].vhfFreq`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.vhfFreq || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='VHF'
                          helperText='VHF'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`groundhandler[${index}].payment`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.payment || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='PAYMENT'
                          helperText='PAYMENT'
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </li>
            );
          })}
        </Grid>
      </div>
    </Fragment>
  );
};

export default PreviewGroundHandlers;
