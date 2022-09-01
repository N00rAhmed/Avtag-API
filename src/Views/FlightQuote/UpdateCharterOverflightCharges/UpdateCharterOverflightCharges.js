import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextsmsIcon from '@material-ui/icons/Textsms';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Button from '@material-ui/core/Button';

import { container } from '../../../components/Common/CommonStyles';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { openModal } from '../../../redux/actions/modalActions';
import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';

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

const UpdateCharterOverflightCharges = () => {
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
                Update Overflight Charges
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
        <Grid item container spacing={2} >
            <Grid item md={4} xs={12}>
                <Grid container direction='row' >
                    <Grid item md={11} xs={12}>
                        <Controller
                        name='searchICAO'
                        control={control}
                        defaultValue=''
                        render={({ onChange, onBlur, value, name }) => (
                            <RHFInput
                            rootHelperTextStyle={classes.input}
                            name={name}
                            helperText='Country'
                            //onKeyDown={onSearchICAOIATAkeyPress}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={register()}
                            />
                        )}
                        />
                    </Grid>
                    <Grid item md={1} xs={12}>
                    <IconButton
                            size='small'
                            aria-label='add'
                        >
                            <TextsmsIcon style={{ color: '#FF8000' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={2} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Charges'
                        //onKeyDown={onSearchICAOIATAkeyPress}
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
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='CAA Fees'
                        //onKeyDown={onSearchICAOIATAkeyPress}
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
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Lead Time'
                        //onKeyDown={onSearchICAOIATAkeyPress}
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
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Disbursment'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
        </Grid>
        <Grid item container spacing={2} >
            <Grid item md={4} xs={12}>
                <Grid item md={12} xs={12}>
                    <Controller
                        as={
                        <RHFSelect
                            menuItem={['NEW VENDER', 'UPDATE VENDER']}
                            label='Navigation Responsibility'
                        />
                        }
                        name='venderType'
                        control={control}
                        defaultValue=''
                    />
                </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Permit Validity'
                        //onKeyDown={onSearchICAOIATAkeyPress}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={register()}
                      />
                    )}
                  />
            </Grid>
        </Grid>
        <Grid item container spacing={2} >
            <Grid item md={12} xs={12}>
                <Controller
                    name='permittype'
                    control={control}
                    defaultValue=''
                    render={({ onChange, onBlur, value, name }) => (
                      <RHFInput
                        rootHelperTextStyle={classes.input}
                        name={name}
                        helperText='Permit Validity'
                        multiline={true}
                        rows={4}
                        //onKeyDown={onSearchICAOIATAkeyPress}
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
                    justifyContent:"center"
                }}
            >
            Save
            </div>
            </Button>
         </Grid>
    </Grid>
    </div>
</Fragment>
  );
};

export default UpdateCharterOverflightCharges;
