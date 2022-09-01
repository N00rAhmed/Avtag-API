import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Styling
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

const Loader = ({open, title="Saving Information", subtitle="Please Standby"}) => {
  // Material UI
  const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={open}>
        <div className={classes.root}>
          <CircularProgress color="inherit"  />
          <Typography style={{fontWeight:"bolder", fontSize:'2.2rem'}}>
            {title}
          </Typography>
          <Typography style={{fontWeight:"bolder", fontSize:'1.5rem'}}>
            {subtitle}
          </Typography>
        </div>
      </Backdrop>
    )
}

export default Loader
