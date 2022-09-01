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

const PreviewFlightSchedules = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  // RHF
  const { register, control } = useForm({
    defaultValues: { schedule: modalData && modalData.schedule },
  });
  // Field Array
  const { fields } = useFieldArray({
    control,
    name: 'schedule',
  });

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Flight Schedule Data
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
                      name={`schedule[${index}].sector`}
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
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`schedule[${index}].callSign`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.callSign || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='CALLSIGN'
                          helperText='CALLSIGN'
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
                      name={`schedule[${index}].departureDate`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.departureDate || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='Departure Date'
                          helperText='Departure Date'
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
                      name={`schedule[${index}].dIcao`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.dIcao || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='ICAO'
                          helperText='ICAO'
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
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`schedule[${index}].etd`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.etd || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='ETD'
                          helperText='ETD'
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
                      name={`schedule[${index}].aIcao`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.aIcao || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='ICAO'
                          helperText='ICAO'
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
                      name={`schedule[${index}].eta`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.eta || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='ETA'
                          helperText='ETA'
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
                      name={`schedule[${index}].arrivalDate`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.arrivalDate || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='Arrival Date'
                          helperText='Arrival Date'
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
                      name={`schedule[${index}].remark`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.remark || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          placeholder='REMARK'
                          helperText='REMARK'
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

export default PreviewFlightSchedules;
