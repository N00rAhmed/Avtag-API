import React from 'react';
import Grid from '@material-ui/core/Grid';

import { TripIcons } from './Icons';
import TripAccordian from './TripAccordian';

import Remark from './Remark';
import Fuel from './Fuel';

const TripAccordianPanels = (props) => {
  return (
    <Grid container direction='column' spacing={1}>
      {/* <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Flight Schedule'>
          <FlightSchedule icons={TripIcons} {...props} />
        </TripAccordian>
      </Grid> */}
      {/* <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Flight Schedule'>
          <FlightSchedule icons={TripIcons} {...props} />
        </TripAccordian>
      </Grid> */}

      {/* <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Flight Permission'>
          <FlightPermission icons={TripIcons} />
        </TripAccordian>
      </Grid> */}

      {/* <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Ground Handler'>
          <GroundHandler icons={TripIcons} />
        </TripAccordian>
      </Grid> */}

      <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Fuel'>
          <Fuel icons={TripIcons} />
        </TripAccordian>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TripAccordian heading='Operational Remark'>
          <Remark icons={TripIcons} />
        </TripAccordian>
      </Grid>
    </Grid>
  );
};

export default TripAccordianPanels;
