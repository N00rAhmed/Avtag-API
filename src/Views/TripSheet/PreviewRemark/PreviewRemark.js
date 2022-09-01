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

const PreviewRemark = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  // RHF
  const { register, control } = useForm({
    defaultValues: { remark: modalData && modalData.remark },
  });
  // Field Array
  const { fields } = useFieldArray({
    control,
    name: 'remark',
  });

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Trip Sheet Remarks
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
                  <Grid item md={12} xs={12}>
                    <Controller
                      name={`remark[${index}].remark`}
                      control={control}
                      rules={{
                        required: 'this is required',
                      }}
                      defaultValue={field.remark || ''}
                      render={({ onChange, onBlur, value, name }) => (
                        <RHFInput
                          name={name}
                          value={value}
                          rootHelperTextStyle={classes.input}
                          key={field.id}
                          onBlur={onBlur}
                          placeholder='REMARK'
                          helperText='REMARK'
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

export default PreviewRemark;
