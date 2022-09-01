/*eslint-disable*/
import React, { Fragment } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styling
const useStyles = makeStyles((theme) => ({
  accordian: {
    ...theme.typography.para,
    backgroundColor: theme.palette.common.primaryColor,
    color: theme.palette.common.whiteColor,
  },
  accordianHeading: {
    ...theme.typography.tertiaryHeading,
    // fontSize: '1rem',
    color: theme.palette.common.whiteColor,
    lineHeight: 0,
    fontWeight: 'none',
  },
  accordianBody: {
    backgroundColor: '#E8E8E8',
  },
  accordianIcon: {
    color: theme.palette.common.white,
  },
}));

const TripAccordian = ({ heading, children }) => {
  const classes = useStyles();
  return (
    <Accordion className={classes.accordian}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.accordianIcon} />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography className={classes.accordianHeading}>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordianBody }}>
        <Grid item xs={12} sm={12} md={12}>
          {children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TripAccordian;
