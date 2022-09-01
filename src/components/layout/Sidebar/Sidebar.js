/*eslint-disable*/
import React, { useState, useEffect, createRef } from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useDispatch } from 'react-redux';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { tripSheetRoutes, flightQuoteRoutes } from '../../../Routes';
import { logout } from '../../../redux/actions/userActions';

import {
  drawerWidth,
  transition,
  grayColor,
  blackColor,
  hexToRgb,
} from '../../Common/CommonStyles';

// Styling
const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: '-10px !important',
    marginLeft: -5,
    // paddingLeft: '0',
    // paddingTop: '20px',
    // paddingBottom: '0',
    // marginBottom: '0',
    listStyle: 'none',
    position: 'unset',
  },
  item: {
    position: 'relative',
    fontWeight: 'bold !important',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: theme.palette.common.whiteColor,
    },
  },
  itemLink: {
    fontWeight: 'bold !important',
    width: 'auto',
    transition: 'all 300ms linear',
    margin: '5px 15px 0',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(' + hexToRgb(theme.palette.common.whiteColor) + ', 0.8)',
  },

  green: {
    backgroundColor: `${theme.palette.common.selectedMenuColor} !important`,
    '&:hover,&:focus': {
      backgroundColor: theme.palette.common.selectedMenuColor,
      boxShadow:
        '0 12px 20px -10px rgba(' +
        hexToRgb(theme.palette.common.selectedMenuColor) +
        ',.28), 0 4px 20px 0 rgba(' +
        hexToRgb(theme.palette.common.selectedMenuColor) +
        ',.12), 0 7px 8px -5px rgba(' +
        hexToRgb(theme.palette.common.selectedMenuColor) +
        ',.2)',
    },
  },

  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
  },

  logo: {
    position: 'relative',
    padding: '55px 7px',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',

      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(' + hexToRgb(grayColor[6]) + ', 0.3)',
    },
  },

  img: {
    width: '250px',
    top: '4px',
    position: 'absolute',
    verticalAlign: 'middle',
    textAlign: 'cener',
    border: '0',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      // background: 'rgba(' + hexToRgb(blackColor) + ', 0.5)',
      background:
        'rgba(' + hexToRgb(theme.palette.common.primaryColor) + ', 1)',
      opacity: '.8',
    },
  },
  itemText: {
    fontWeight: 'bold !important',
    lineHeight: '10px',
    fontSize: '15px',
    fontWeight: '400',
    transition: 'all 300ms linear',
    margin: '10 15px 0',
    backgroundColor: 'transparent',
    color: theme.palette.common.whiteColor,
  },
  whiteFont: {
    color: theme.palette.common.whiteColor,
    fontWeight: 'bold',
  },

  sidebarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '260px',
    zIndex: '4',
    overflowScrolling: 'touch',
  },
  expension: {
    color: theme.palette.common.whiteColor,
    //marginTop: -5,
    marginBottom: -10,
    backgroundColor: 'transparent',
    '&.Mui-expanded': {
      margin: 0,
      padding: 0,
    },
  },
  expensionDetails: {
    padding: 0,
    margin: 0,
    marginTop: -15,
  },
  expensionSummary: {
    margin: 0,
  },
  subItemLink: {
    fontWeight: 'bold !important',
    transition: 'all 300ms linear',
    margin: '15px 15px 0px 30px',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    width: 'auto',
  },
  subItemTopSpacing: {
    transition: 'all 300ms linear',
    marginLeft: '14px ',
    marginTop: '-25px',
    marginBottom: '0px',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    fontWeight: 'bold !important',
  },
  subItemBottomSpacing: {
    fontWeight: 'bold !important',
    transition: 'all 300ms linear',
    marginLeft: '14px ',
    marginTop: '0px',
    marginBottom: '-8px',
    borderRadius: '3px',
    backgroundColor: 'transparent',
  },
  subItem: {
    fontWeight: 'bold !important',
    transition: 'all 300ms linear',
    marginTop: '-15px',
    marginLeft: '-2px ',
  },
  expandIcon: {
    padding: 0,
    margin: 0,
    marginTop: 0,
  },
}));

let ps;

export default function Sidebar(props) {
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  // State
  const [tripPanel, setTripPanel] = useState(false);
  const [fuelUpliftPanel, setFuelUpliftPanel] = useState(false);
  const [flightQuotePanel, setFlightQuotePanel] = useState(false);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  useEffect(() => {
    if (window.location.pathname === '/admin/tripsheet') {
      setTripPanel(true);
    } else if (window.location.pathname === '/admin/fueluplift') {
      setFuelUpliftPanel(true);
    } else if (window.location.pathname === '/admin/flightquote') {
      setFlightQuotePanel(true);
    }
  });
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = createRef();
  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
  }, [mainPanel]);

  // Props from admin
  const { color, logo, image, routes } = props;
  // Links
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.name === 'Trip Sheet') {
          return (
            <Accordion
              key={key}
              classes={{ root: classes.expension }}
              elevation={0}
              TransitionProps={{ unmountOnExit: true }}
              expanded={tripPanel}
              onClick={() => {
                setTripPanel(true);
                setFuelUpliftPanel(false);
                setFlightQuotePanel(false);
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize='small'
                    style={{
                      color: 'white',
                    }}
                  />
                }
                classes={{ expandIcon: classes.expandIcon }}
              >
                <ListItem button className={classes.subItem + listItemClasses}>
                  <prop.icon className={classNames(classes.itemIcon)} />
                  <ListItemText primary={prop.name} />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails classes={{ root: classes.expensionDetails }}>
                <Grid container direction='column'>
                  {tripSheetRoutes.map((troutes, i) => {
                    if (troutes.visibleInSidebar) {
                      var listItemClasses;

                      listItemClasses = classNames({
                        [' ' + classes[color]]: activeRoute(
                          troutes.layout + troutes.path
                        ),
                      });
                      return (
                        <Grid item key={i}>
                          <NavLink
                            to={troutes.layout + troutes.path}
                            className={classes.item}
                            activeClassName='active'
                            key={i}
                          >
                            <ListItem
                              button
                              className={classes.subItemLink + listItemClasses}
                              onClick={() => setTripPanel(true)}
                            >
                              {typeof troutes.icon === 'string' ? (
                                <Icon className={classNames(classes.itemIcon)}>
                                  {troutes.icon}
                                </Icon>
                              ) : (
                                <troutes.icon
                                  className={classNames(classes.itemIcon)}
                                />
                              )}
                              <ListItemText
                                onClick={() => props.setMobileOpen(false)}
                                primary={troutes.name}
                                //className={classNames(classes.itemText)}
                              />
                            </ListItem>
                          </NavLink>
                        </Grid>
                      );
                    }
                    
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        } else if (prop.name === 'Flight Quote') {
          return (
            <Accordion
              key={key}
              classes={{ root: classes.expension }}
              elevation={0}
              TransitionProps={{ unmountOnExit: true }}
              expanded={flightQuotePanel}
              onClick={() => {
                setFlightQuotePanel(true);
                setFuelUpliftPanel(false);
                setTripPanel(false);
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    fontSize='small'
                    style={{
                      color: 'white',
                    }}
                  />
                }
                classes={{ expandIcon: classes.expandIcon }}
              >
                <ListItem button className={classes.subItem + listItemClasses}>
                  <prop.icon className={classNames(classes.itemIcon)} />
                  <ListItemText primary={prop.name} />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails classes={{ root: classes.expensionDetails }}>
                <Grid container direction='column'>
                  {flightQuoteRoutes.map((froutes, i) => {
                    var listItemClasses;

                    listItemClasses = classNames({
                      [' ' + classes[color]]: activeRoute(
                        froutes.layout + froutes.path
                      ),
                    });
                    return (
                      <Grid item key={i}>
                        <NavLink
                          to={froutes.layout + froutes.path}
                          className={classes.item}
                          activeClassName='active'
                          key={i}
                        >
                          <ListItem
                            button
                            className={classes.subItemLink + listItemClasses}
                            onClick={() => setFlightQuotePanel(true)}
                          >
                            {typeof froutes.icon === 'string' ? (
                              <Icon className={classNames(classes.itemIcon)}>
                                {froutes.icon}
                              </Icon>
                            ) : (
                              <froutes.icon
                                className={classNames(classes.itemIcon)}
                              />
                            )}
                            <ListItemText
                              onClick={() => props.setMobileOpen(false)}
                              primary={froutes.name}
                              //className={classNames(classes.itemText)}
                            />
                          </ListItem>
                        </NavLink>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        } else {
          {
            var listItemClasses;

            listItemClasses = classNames({
              [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
            });

            const whiteFontClasses = classNames({
              [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
            });

            return (
              <NavLink
                to={`${prop.layout + prop.path}`}
                className={classes.item}
                activeClassName='active'
                key={key}
              >
                <ListItem
                  button
                  className={classes.itemLink + listItemClasses}
                  onClick={() => {
                    setTripPanel(false);
                    setFlightQuotePanel(false);
                    setFuelUpliftPanel(false);
                  }}
                >
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    />
                  )}
                  <ListItemText
                    onClick={
                      prop.name === 'Logout'
                        ? () => {
                            dispatch(logout());
                          }
                        : () => props.setMobileOpen(false)
                    }
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                  />
                </ListItem>
              </NavLink>
            );
          }
        }
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <Link
        to='/admin/dashboard'
        onClick={() => {
          setTripPanel(false);
          setFlightQuotePanel(false);
          setFuelUpliftPanel(false);
        }}
      >
        <img src={logo} alt='logo' className={classes.img} />
      </Link>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          transitionDuration={500}
          variant='temporary'
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper} ref={mainPanel}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}
