import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from 'react-redux';

import Customer from '../../Views/Customer/Customer';
import ServiceProvider from '../../Views/ServiceProvider/ServiceProvider';
import GroundHandler from '../../Views/GroundHandler/GroundHandler';
import Vender from '../../Views/Vender/Vender';
import Operator from '../../Views/Operator/Operator';
import Register from '../../Views/Register/Register';
import OperationalRemark from '../../Views/OperationalRemark/OperationalRemark';
import PreviewPermits from '../../Views/TripSheet/PreviewPermits/PreviewPermits';
import PreviewGroundHandlers from '../../Views/TripSheet/PreviewGroundHandlers/PreviewGroundHandlers';
import PreviewFlightSchedules from '../../Views/TripSheet/PreviewFlightSchedules/PreviewFlightSchedules';
import PreviewFuel from '../../Views/TripSheet/PreviewFuel/PreviewFuel';
import PreviewRemark from '../../Views/TripSheet/PreviewRemark/PreviewRemark';
import SelectServiceProvider from '../../Views/TripSheet/SelectServiceProvider/SelectServiceProvider';
import UpdateCharterOverflightCharges from '../../Views/FlightQuote/UpdateCharterOverflightCharges/UpdateCharterOverflightCharges';
import BlockOverflight from '../../Views/FlightQuote/BlockOverflight/BlockOverflight';
import GroundHandlingQuote from '../../Views/FlightQuote/GroundHandling/GroundHandlingQuote';
import GroundHandlingQuery from '../../Views/FlightQuote/GroundHandling/GroundHandlingQuery';
import GroundHandlingPreference from '../../Views/FlightQuote/GroundHandling/Preference';
import BlockOverflightPreference from '../../Views/FlightQuote/BlockOverflight/Preference';
import HotelReservation from '../../Views/Hotel/HotelReservation';
import ShiftHandover from '../../Views/ShiftHandover/ShiftHandover';
import ShiftHandoverPreference from '../../Views/ShiftHandover/Preference';
import SelectLandingPermit from '../../Views/TripSheet/SelectLandingPermit/SelectLandingPermit';
import SelectGroundHandler from '../../Views/TripSheet/SelectGroundHandler/SelectGroundHandler';
import SelectFuelQuote from '../../Views/TripSheet/SelectFuelQuote/SelectFuelQuote';
import CreateFuelQuotation from '../../Views/Fuel/CreateFuelQuotation/CreateFuelQuotation';
import CreateFuelSupplier from '../../Views/Fuel/CreateFuelSupplier/CreateFuelSupplier';
import CreateFuelQuery from '../../Views/Fuel/CreateFuelQuery/CreateFuelQuery';
import StaffProfile from '../../Views/ControlPanel/StaffProfile';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import { openModal } from '../../redux/actions/modalActions';
import { clearIcaoIata } from '../../redux/actions/airportActions';

const useStyles = makeStyles((theme) => ({
  scrollPaper: {
    alignItems: 'flex-start',
    marginTop: -30,
  },
  paper: {
    padding: '25px 15px 10px 15px',
    // borderRadius: 5,
    borderBottom: `4px solid ${theme.palette.common.primaryColor}`,
  },
  dialogbox: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' unmountOnExit={true} ref={ref} {...props} />;
});
const DialogBox = () => {
  // Material UI
  const classes = useStyles();
  // Redux
  const dispatch = useDispatch();
  const { modalOpen, modalName, modalSize } = useSelector(
    (state) => state.modal
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(openModal(false, modalName, modalSize));
    dispatch(clearIcaoIata());
  };

  return (
    <Dialog
      classes={{ scrollPaper: classes.scrollPaper, paper: classes.paper }}
      className={classes.dialogbox}
      open={modalOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth={modalSize}
    >
      {(() => {
        switch (modalName) {
          case 'Customer':
            return <Customer />;
          case 'OperationalRemark':
            return <OperationalRemark />;
          case 'Vender':
            return <Vender />;
          case 'Operator':
            return <Operator />;
          case 'Register':
            return <Register />;
          case 'PreviewPermits':
            return <PreviewPermits />;
          case 'SelectServiceProvider':
            return <SelectServiceProvider />;
          case 'SelectLandingPermit':
            return <SelectLandingPermit />;
          case 'SelectGroundHandler':
            return <SelectGroundHandler />;
          case 'PreviewGroundHandlers':
            return <PreviewGroundHandlers />;
          case 'CreateFuelQuotation':
            return <CreateFuelQuotation />;
          case 'CreateFuelSupplier':
            return <CreateFuelSupplier />;
          case 'CreateFuelQuery':
            return <CreateFuelQuery />;
          case 'SelectFuelQuote':
            return <SelectFuelQuote />;
          case 'SuccessMessage':
            return <SuccessMessage />;
          case 'PreviewFlightSchedules':
            return <PreviewFlightSchedules />;
          case 'PreviewFuel':
            return <PreviewFuel />;
          case 'PreviewRemark':
            return <PreviewRemark />;
          case 'ServiceProvider':
            return <ServiceProvider />;
          case 'GroundHandler':
            return <GroundHandler />;
          case 'UpdateCharterOverflightCharges':
            return <UpdateCharterOverflightCharges />;
          case 'BlockOverflight':
            return <BlockOverflight />;
          case 'BlockOverflightPreference':
            return <BlockOverflightPreference />;
          case 'GroundHandlingQuote':
            return <GroundHandlingQuote />;
          case 'GroundHandlingQuery':
            return <GroundHandlingQuery />;
          case 'GroundHandlingPreference':
            return <GroundHandlingPreference />;
          case 'HotelReservation':
            return <HotelReservation />;
          case 'ShiftHandover':
            return <ShiftHandover />;
          case 'ShiftHandoverPreference':
            return <ShiftHandoverPreference />;
          case 'StaffProfile':
            return <StaffProfile />;
          default:
            return;
        }
      })()}
    </Dialog>
  );
};

export default memo(DialogBox);
