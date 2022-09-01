import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../components/Input/Input';
import { container } from '../../components/Common/CommonStyles';
import { requestregister } from '../../redux/actions/userActions';
import { openModal } from '../../redux/actions/modalActions';
import { setAlert } from '../../redux/actions/alertActions';
import RHFSelect from '../../components/RHF/RHFSelect/RHFSelect';

// Styling
const useStyles = makeStyles((theme) => ({
  space: {
    marginBottom: '10px',
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
    marginTop: '40px',
  },
  flex: {
    flex: 1,
  },
  primaryHeading: {
    ...theme.typography.primaryHeading,
    color: 'white',
  },
}));

const Register = () => {
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { isRegistered, loading } = useSelector((state) => state.userRegister);
  // React hook form
  const { handleSubmit, register, errors, control } = useForm();
  // State
  const [reCAPTCHAToken, setReCAPTCHAToken] = useState(null);
  const onChangeReCAPTCHA = (value) => {
    setReCAPTCHAToken(value);
  };

  if (isRegistered) {
    dispatch(openModal(false));
  }

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Typography className={classes.primaryHeading}>Register</Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <Grid container direction='column'>
          {/* 1st row start */}
          <Grid item xs={12}>
            <Input
              type='text'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Company Name'
              error={errors.companyname}
              rootHelperTextStyle={classes.input}
              textFieldName='companyname'
              inputRef={register({ required: 'required' })}
            />
          </Grid>
          {/* 1st row end */}
          {/* 2nd row start */}
          <Grid item xs={12}>
            <Input
              type='text'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Contact Person Name'
              error={errors.contactpersonname}
              rootHelperTextStyle={classes.input}
              textFieldName='contactpersonname'
              inputRef={register({ required: 'required' })}
            />
          </Grid>
          {/* 2nd row end */}
          {/* 3rd row start */}
          <Grid item xs={12}>
            <Input
              type='email'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Login Email'
              rootHelperTextStyle={classes.input}
              textFieldName='loginemail'
              inputRef={register({ required: 'required' })}
              error={errors.loginemail}
            />
          </Grid>
          {/* 3rd row end */}
          {/* 5th row start */}
          <Grid item xs={12}>
            <Input
              type='password'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Password'
              rootHelperTextStyle={classes.input}
              textFieldName='password'
              inputRef={register({ required: 'required' })}
              error={errors.password}
            />
          </Grid>
          {/* 5th row end */}
          {/* 6th row start */}
          <Grid item xs={12}>
            <Input
              type='password'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Confirm Password'
              rootHelperTextStyle={classes.input}
              textFieldName='confirmpassword'
              inputRef={register({ required: 'required' })}
              error={errors.confirmpassword}
            />
          </Grid>
          {/* 6th row end */}
          {/* 7th row start */}
          <Grid item xs={12}>
            <Input
              type='text'
              rootTextfieldStyle={classes.input}
              style={classes.space}
              helperText='Cell Number'
              rootHelperTextStyle={classes.input}
              textFieldName='cellnumber'
              inputRef={register({ required: 'required' })}
              error={errors.cellnumber}
            />
          </Grid>
          {/* 7th row end */}
          {/* 8th row start */}
          <Grid item xs={12} className={classes.space}>
            <Controller
              as={
                <RHFSelect
                  error={errors.customertype}
                  menuItem={[
                    'Aircraft Operator',
                    'Private Owner',
                    'Service Provider',
                  ]}
                  label='Customer Type'
                />
              }
              name='customertype'
              rules={{
                required: 'this is required',
              }}
              control={control}
              defaultValue=''
            />
          </Grid>
          {/* 8th row end */}
          {/* 9th row start */}
          <Grid item xs={12} className={classes.space}>
            <FormControl component='fieldset'>
              <FormGroup aria-label='position' row>
                <FormControlLabel
                  classes={{
                    label: classes.input,
                  }}
                  name='terms'
                  value='By signing up, you agree to our Term of Use & Privacy Policy'
                  control={<Checkbox color='primary' size='small' />}
                  label='By signing up, you agree to our Term of Use & Privacy Policy'
                  labelPlacement='end'
                  inputRef={register({ required: 'required' })}
                  style={{ color: errors.terms ? 'red' : 'black' }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          {/* 9th row end */}
          {/* 10th row start */}
          <Grid item xs={12} className={classes.space}>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_SECRET_RECAPTCHA}
              onChange={onChangeReCAPTCHA}
            />
          </Grid>
          {/* 10th row end */}
          {/* 11th row start */}
          <Grid item>
            <Grid item xs={12} align='right'>
              <Button
                color='primary'
                disabled={loading}
                className={classes.addButton}
                variant='contained'
                type='submit'
                onClick={handleSubmit((formData) => {
                  if (
                    reCAPTCHAToken === '' ||
                    reCAPTCHAToken === null ||
                    reCAPTCHAToken === undefined
                  ) {
                    dispatch(setAlert(true, 'error', 'Submit ReCaptcha'));
                  }
                  formData.token = reCAPTCHAToken;
                  dispatch(requestregister(formData));
                })}
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

          {/* 11th row end */}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Register;
