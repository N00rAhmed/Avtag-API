import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CancelIcon from '@material-ui/icons/Cancel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import { container } from '../../../components/Common/CommonStyles';
import { openModal } from '../../../redux/actions/modalActions';
import {
  getServiceProviderByCountry,
  getSelectedServiceProviderByCountry,
} from '../../../redux/actions/serviceProviderActions';

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
  preffered: {
    color: theme.palette.common.preffered,
    marginRight: '0.5rem',
  },
  nonPreffered: {
    color: theme.palette.common.secondaryColor,
    marginRight: '0.5rem',
  },
}));

const ServiceProvider = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  const { country } = useSelector((state) => state.serviceProvider);

  useEffect(() => {
    if (modalData) dispatch(getServiceProviderByCountry(modalData.country));
  }, [modalData, dispatch]);

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.primaryHeading}>
                Service Provider's
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
          <Grid item md={12} xs={12}>
            <List component='nav' aria-label='service provider'>
              {country && country.length !== 0 ? (
                country.map((i) => (
                  <Fragment key={i._id}>
                    <ListItem
                      // className={classes.listWrap}
                      button
                    >
                      {i.preffered === true ? (
                        <FiberManualRecordIcon className={classes.preffered} />
                      ) : (
                        <FiberManualRecordIcon
                          className={classes.nonPreffered}
                        />
                      )}

                      <ListItemText
                        primary={i.serviceProviderName}
                        classes={{ primary: classes.input }}
                      />
                      <ListItemIcon
                        onClick={() => {
                          const data = {
                            index: modalData.index,
                            serviceProviderName: `${i.serviceProviderCode} - ${i.serviceProviderName}`,
                          };
                          dispatch(getSelectedServiceProviderByCountry(data));
                          dispatch(openModal(false, ''));
                        }}
                      >
                        <LibraryAddCheckIcon style={{ color: '#FF8000' }} />
                      </ListItemIcon>
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))
              ) : (
                <Fragment>
                  <ListItem button>
                    <ListItemText
                      primary='NO DATA FOUND'
                      classes={{ primary: classes.input }}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default ServiceProvider;
