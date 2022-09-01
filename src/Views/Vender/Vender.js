import React, { Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';

import Input from '../../components/Input/Input';
import { container } from '../../components/Common/CommonStyles';
import SelectInput from '../../components/Select/Select';

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
}));

const Vender = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Typography className={classes.primaryHeading}>
              Add Vender
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container direction='column'>
          {/* 1st row start */}
          <Grid item md={12} xs={12}>
            <Typography className={classes.secondaryHeading}>
              Vender Details
            </Typography>
          </Grid>
          {/* 1st row end */}
          {/* 2nd row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={2} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Vender ID'
                rootHelperTextStyle={classes.input}
                textFieldName='venderid'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Country'
                rootHelperTextStyle={classes.input}
                textFieldName='country'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Vender Name'
                rootHelperTextStyle={classes.input}
                textFieldName='vendername'
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Prefered'
                rootHelperTextStyle={classes.input}
                textFieldName='prefered'
              />
            </Grid>
          </Grid>
          {/* 2nd row end */}
          {/* 3rd row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='VAT # / TAX #'
                rootHelperTextStyle={classes.input}
                textFieldName='vattaxno'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <SelectInput
                menuItem={['Contracted', 'Non Contracted']}
                label='Status'
                name='status'
              />
            </Grid>
            <Grid item md={4} xs={12} className={classes.space}>
              <Grid item container direction='row' spacing={!matchesSM && 3}>
                <Grid item md={6} xs={12}>
                  <SelectInput
                    menuItem={Array.from(Array(20), (e, i) => i + 1)}
                    label='Disbursment'
                    name='disbursment'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Input
                    type='text'
                    rootTextfieldStyle={classes.input}
                    style={classes.space}
                    helperText='Credit Days'
                    rootHelperTextStyle={classes.input}
                    textFieldName='Credit Days'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* 3rd row end */}
          {/* 4th row start */}
          <Grid item md={12} xs={12}>
            <Typography className={classes.secondaryHeading}>
              Operational Information
            </Typography>
          </Grid>
          {/* 4th row end */}
          {/* 5th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Tele / Cell'
                rootHelperTextStyle={classes.input}
                textFieldName='telecell'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Fax'
                rootHelperTextStyle={classes.input}
                textFieldName='faxno'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='AFTN'
                rootHelperTextStyle={classes.input}
                textFieldName='aftn'
              />
            </Grid>
          </Grid>
          {/* 5th row end */}
          {/* 6th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item xs={8}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Email Recipents'
                rootHelperTextStyle={classes.input}
                textFieldName='emailrecipents'
              />
            </Grid>
            <Grid item md={4} xs={12} className={classes.space}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='SITA'
                rootHelperTextStyle={classes.input}
                textFieldName='sita'
              />
            </Grid>
          </Grid>
          {/* 6th row end */}
          {/* 7th row start */}
          <Grid item md={12} xs={12}>
            <Typography className={classes.secondaryHeading}>
              Overflight Permit Charges
            </Typography>
          </Grid>
          {/* 7th row end */}
          {/* 8th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Normal'
                rootHelperTextStyle={classes.input}
                textFieldName='normal'
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Revision'
                rootHelperTextStyle={classes.input}
                textFieldName='revision'
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Urgent'
                rootHelperTextStyle={classes.input}
                textFieldName='urgent'
              />
            </Grid>
            <Grid item md={3} xs={12} className={classes.space}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='CAA Fees'
                rootHelperTextStyle={classes.input}
                textFieldName='caafees'
              />
            </Grid>
          </Grid>
          {/* 8th row end */}
          {/* 9th row start */}
          <Grid item md={12} xs={12}>
            <Typography className={classes.secondaryHeading}>
              Landing Permit Charges
            </Typography>
          </Grid>
          {/* 9th row end */}
          {/* 10th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Normal'
                rootHelperTextStyle={classes.input}
                textFieldName='normal'
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Revision'
                rootHelperTextStyle={classes.input}
                textFieldName='revision'
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Urgent'
                rootHelperTextStyle={classes.input}
                textFieldName='urgent'
              />
            </Grid>
            <Grid item md={3} xs={12} className={classes.space}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                helperText='CAA Fees'
                rootHelperTextStyle={classes.input}
                textFieldName='caafees'
              />
            </Grid>
          </Grid>
          {/* 10th row end */}
          {/* 11th row start */}
          <Grid item md={12} xs={12}>
            <Typography className={classes.secondaryHeading}>
              Banking Information
            </Typography>
          </Grid>
          {/* 11th row end */}
          {/* 12th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Beneficiary Name'
                rootHelperTextStyle={classes.input}
                textFieldName='beneficiaryname'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Bank Name'
                rootHelperTextStyle={classes.input}
                textFieldName='bankname'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Swift Code'
                rootHelperTextStyle={classes.input}
                textFieldName='swiftcode'
              />
            </Grid>
          </Grid>
          {/* 12th row end */}
          {/* 13th row start */}
          <Grid item container direction='row' spacing={!matchesSM && 3}>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='Account #'
                rootHelperTextStyle={classes.input}
                textFieldName='accountno'
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                type='text'
                rootTextfieldStyle={classes.input}
                style={classes.space}
                helperText='IBAN #'
                rootHelperTextStyle={classes.input}
                textFieldName='ibanno'
              />
            </Grid>
            <Grid item md={4} xs={12} className={classes.space}>
              <SelectInput
                menuItem={['AED', 'USD']}
                label='Currency'
                name='currency'
              />
            </Grid>
          </Grid>
          {/* 13th row end */}
          {/* 11th row start */}
          <Grid item>
            <Grid item sx={12} align='right'>
              <Button
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
          {/* 11th row end */}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Vender;
