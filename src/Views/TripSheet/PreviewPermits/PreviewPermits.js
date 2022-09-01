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

const Operator = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  modalData && modalData.permission.sort((a,b) => (a.sector > b.sector) ? 1 : ((b.sector > a.sector) ? -1 : 0));
  // RHF
  const { register, control } = useForm({
    defaultValues: { permission: modalData && modalData.permission },
  });
  // Field Array
  const { fields } = useFieldArray({
    control,
    name: 'permission',
  });

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Permit Data
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
                      name={`permission[${index}].sector`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.sector || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='Sector'
                          helperText='SECTOR'
                          rootHelperTextStyle={classes.input}
                          onChange={(e) => {
                            e.preventDefault();
                            onChange(e.target.value);
                          }}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`permission[${index}].permitType`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.permitType || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='PERMIT TYPE'
                          helperText='PERMIT TYPE'
                          rootHelperTextStyle={classes.input}
                          onChange={(e) => {
                            e.preventDefault();
                            onChange(e.target.value);
                          }}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    {field.country !== undefined ? (
                      <Controller
                        name={`permission[${index}].country`}
                        control={control}
                        rules={{
                          required: 'this is required',
                        }}
                        defaultValue={field.country || ''}
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            name={name}
                            value={value}
                            key={field.id}
                            onBlur={onBlur}
                            placeholder='COUNTRY / AIRPORT'
                            helperText='COUNTRY / AIRPORT'
                            rootHelperTextStyle={classes.input}
                            onChange={onChange}
                            inputRef={register({ required: 'required' })}
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        name={`permission[${index}].airport`}
                        control={control}
                        rules={{
                          required: 'this is required',
                        }}
                        defaultValue={field.airport || ''}
                        render={({ onChange, onBlur, value, name }) => (
                          <RHFInput
                            name={name}
                            value={value}
                            key={field.id}
                            onBlur={onBlur}
                            placeholder='COUNTRY / AIRPORT'
                            helperText='COUNTRY / AIRPORT'
                            rootHelperTextStyle={classes.input}
                            onChange={onChange}
                            inputRef={register({ required: 'required' })}
                          />
                        )}
                      />
                    )}
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`permission[${index}].status`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.status || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='STATUS'
                          helperText='STATUS'
                          rootHelperTextStyle={classes.input}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Controller
                      name={`permission[${index}].permitNo`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.permitNo || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          placeholder='Permit #'
                          helperText='PERMIT #'
                          rootHelperTextStyle={classes.input}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Controller
                      name={`permission[${index}].entryexit`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={`${field.entry}/${field.exit}` || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='ENTRY/EXIT'
                          helperText='ENTRY/EXIT'
                          rootHelperTextStyle={classes.input}
                          onChange={onChange}
                          inputRef={register({ required: 'required' })}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item md={3} xs={12}>
                    <Controller
                      name={`permission[${index}].vender`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.vender || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='Service Provider'
                          helperText='SERICE PROVIDER'
                          rootHelperTextStyle={classes.input}
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

export default Operator;
