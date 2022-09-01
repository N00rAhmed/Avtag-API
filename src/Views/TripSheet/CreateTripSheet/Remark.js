import React, {useEffect} from 'react';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useConfirm } from 'material-ui-confirm';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';

import RHFSelect from '../../../components/RHF/RHFSelect/RHFSelect';
import RHFInput from '../../../components/RHF/RHFInput/RHFInput';
import { openModal } from '../../../redux/actions/modalActions';
import { Remarks } from '../TripSheetData';

const useStyles = makeStyles((theme) => ({
  scheduleList: {},
  notification: {
    color: theme.palette.common.primaryColor,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  startButton: {
    color: theme.palette.common.primaryColor,
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: '0.8rem',
    borderRadius: 0,
    color: '#fff',
    fontWeight: 600,
    backgroundColor: 'green',
    transition: 'all 400ms linear',
    width: '30px',
  },
  addButtonIcon: {
    ...theme.typography.secondaryButtonIcon,
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

const Remark = ({remark}) => {
  // Material UI
  const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
  // RHF
  const { control, handleSubmit, errors, reset, getValues } = useFormContext();

  // Field Array
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'remark',
  });
  // Confirm Dialog
  const confirm = useConfirm();
  const onDelete = (index) => {
    confirm({
      title: (
        <div style={{ fontSize: '1.1rem' }}>
          Are you sure you want to delete Remark?
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
        remove(index);
      })
      .catch(() => {
        /* ... */
      });
  };

     // Load remark for Update
     useEffect(() => {
      if(remark && remark.length !== 0) {
        reset({
          ...getValues(),
          remark: remark,
        });
      }
    },[reset, remark, getValues])

  return (
    <div>
      {/* <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container justify='flex-end' spacing={1}>
            <Grid item md={2} xs={5}>
              <RHFInput placeholder='SEARCH' searchIcon />
            </Grid>
            <Grid item>
              <IconButton
                size='small'
                aria-label='add'
                onClick={handleSubmit((data) => {
                  console.log(data);
                  append({});
                })}
                type='submit'
              >
                <AddBoxIcon style={{ color: '#203764' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item md={8} xs={7}>
              <Typography className={classes.notification}>
                Notification :{' '}
                <span style={{ color: 'red' }}>
                  {errors.remark ? (
                    Object.keys(errors.remark).length !== 0 &&
                    errors.remark.map((err) => {
                      if (err.remark) {
                        return err.remark.message;
                      } else {
                        return 'Re-Check all fields';
                      }
                    })
                  ) : (
                    <span style={{ color: 'green' }}>No Errors</span>
                  )}
                </span>
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid container direction='row' spacing={1}>
                <Grid item md={7} xs={1}>
                  <RHFInput placeholder='SEARCH' searchIcon />
                </Grid>
                <Grid item md={5} xs={6}>
                  <Grid container direction='row' align='right'>
                    <Grid item md={6} xs={1}>
                      <Button
                        color='primary'
                        disabled={fields.length > 0}
                        className={classes.addButton}
                        variant='contained'
                        type='submit'
                        onClick={() => append({})}
                      >
                        Start
                      </Button>
                    </Grid>
                    <Grid item md={6} xs={11}>
                      <Button
                        color='primary'
                        className={classes.addButton}
                        variant='contained'
                        disabled={fields.length === 0}
                        aria-label='preview'
                        onClick={handleSubmit((data) => {
                          dispatch(
                            openModal(true, 'PreviewRemark', 'md', data)
                          );
                        })}
                      >
                        <VisibilityIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid
          container
          spacing={2}
          style={{ backgroundColor: '#808080', marginTop: 10 }}
        >
          <Grid item md={11} xs={12}>
            REMARK
          </Grid>
          <Grid item md={1} xs={12} align='center'>
            ACTION
          </Grid>
        </Grid>
      </Hidden>
      {fields.map((field, index) => {
        return (
          <li key={field.id} className={classes.remarkList}>
            <Grid container spacing={2}>
              <Grid item md={11} xs={12}>
                <Controller
                  name={`remark[${index}].remark`}
                  control={control}
                  rules={{
                    required: 'Please Select " Remark "',
                  }}
                  defaultValue={field.remark || ''}
                  render={({ onChange, onBlur, value, name }) => (
                    <RHFSelect
                      name={name}
                      value={value}
                      key={field.id}
                      menuItem={Remarks}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              {/* 
              <Grid item md={1} xs={12} align='center'>
                <IconButton
                  size='small'
                  aria-label='delete'
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
                  <DeleteIcon style={{ color: '#CC0000' }} />
                </IconButton>
              </Grid> */}
              <Grid item md={1} xs={12}>
                <Grid container direction='row' spacing={3}>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='save'
                      onClick={handleSubmit((data) => {})}
                    >
                      <SaveIcon style={{ color: 'green' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='add'
                      onClick={handleSubmit((data) => {
                        insert(index + 1, {});
                      })}
                    >
                      <AddBoxIcon style={{ color: '#203764' }} />
                    </IconButton>
                  </Grid>
                  <Grid item md={2} xs={1}>
                    <IconButton
                      size='small'
                      aria-label='delete'
                      onClick={() => {
                        onDelete(index);
                      }}
                    >
                      <DeleteIcon style={{ color: '#CC0000' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </li>
        );
      })}
    </div>
  );
};

export default Remark;
