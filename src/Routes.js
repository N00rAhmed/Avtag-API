/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import LockIcon from '@material-ui/icons/Lock';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
// core components/views for Admin layout
import DashboardPage from './Views/Dashboard/Dashboard';
import ServiceProvider from './Views/ServiceProvider/ServiceProvider';
import GroundHandler from './Views/GroundHandler/GroundHandler';
import ControlPanel from './Views/ControlPanel/ControlPanel';
import FuelDashboard from './Views/Fuel/FuelDashboard/FuelDashboard';
import CreateTripSheet from './Views/TripSheet/CreateTripSheet/CreateTripSheet';
import MovementControl from './Views/MovementControl/MovementControl';
import CharterOverflight from './Views/FlightQuote/CharterOverflight/CharterOverflight';
import BlockOverflight from './Views/FlightQuote/BlockOverflight/BlockOverflightDashboard';
import GroundHandling from './Views/FlightQuote/GroundHandling/GroundHandlingDashboard';
import FlightWatch from './Views/FlightWatch/FlightWatch';
import HotelReservationDashboard from './Views/Hotel/HotelReservationDashboard';
import ShiftHandoverDashboard from './Views/ShiftHandover/ShiftHandoverDashboard';
import AirportCode from './Views/AirportCode/AirportCode';
import TripSheetDashboard from './Views/TripSheet/TripSheetDashboard/TripSheetDashboard';

export const dashboardRoutes = [
  {
    path: '/dashboard',
    urlPath: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/tripsheet',
    urlPath: '/tripsheet',
    name: 'Trip Sheet',
    icon: LocalAirportIcon,
    component: TripSheetDashboard,
    layout: '/admin',
  },
  {
    path: '/serviceprovider',
    urlPath: '/serviceprovider',
    name: 'Service Provider',
    icon: BubbleChart,
    component: ServiceProvider,
    layout: '/admin',
  },

  {
    path: '/groundhandler',
    urlPath: '/groundhandler',
    name: 'Ground Handler',
    icon: FlightLandIcon,
    component: GroundHandler,
    layout: '/admin',
  },
  {
    path: '/fuel',
    urlPath: '/fuel',
    name: 'Fuel',
    icon: LocalGasStationIcon,
    component: FuelDashboard,
    layout: '/admin',
  },
  {
    path: '/airportcode',
    urlPath: '/airportcode',
    name: 'Airport Code',
    icon: SearchIcon,
    component: AirportCode,
    layout: '/admin',
  },
  {
    path: '/movementcontrol',
    urlPath: '/movementcontrol',
    name: 'Movement Control',
    icon: LocalGasStationIcon,
    component: MovementControl,
    layout: '/admin',
  },
  {
    path: '/flightwatch',
    urlPath: '/flightwatch',
    name: 'Flight Watch',
    icon: LocalGasStationIcon,
    component: FlightWatch,
    layout: '/admin',
  },
  {
    path: '/flightquote',
    urlPath: '/flightquote',
    name: 'Flight Quote',
    icon: LocalGasStationIcon,
    component: CharterOverflight,
    layout: '/admin',
  },
  {
    path: '/hotel',
    urlPath: '/hotel',
    name: 'Hotel',
    icon: LocalGasStationIcon,
    component: HotelReservationDashboard,
    layout: '/admin',
  },
  {
    path: '/shifthandover',
    urlPath: '/shifthandover',
    name: 'Shift Handover',
    icon: LocalGasStationIcon,
    component: ShiftHandoverDashboard,
    layout: '/admin',
  },
  {
    path: '/controlpanel',
    urlPath: '/controlpanel',
    name: 'Control Panel',
    icon: LockIcon,
    component: ControlPanel,
    layout: '/admin',
  },
  {
    name: 'Logout',
    icon: ExitToAppIcon,
  },
];

export const tripSheetRoutes = [
  {
    path: '/tripsheet',
    urlPath: '/tripsheet',
    name: 'Dashboard',
    icon: Dashboard,
    component: TripSheetDashboard,
    layout: '/admin',
    visibleInSidebar: true
  },
  {
    path: '/createtripsheet',
    urlPath: '/createtripsheet',
    name: 'Create Trip Sheet',
    icon: LibraryBooks,
    component: CreateTripSheet,
    layout: '/admin',
    visibleInSidebar: true
  },
  {
    path: '/updatetripsheet/:id',
    urlPath: '/updatetripsheet',
    name: 'Update Trip Sheet',
    icon: LibraryBooks,
    component: CreateTripSheet,
    layout: '/admin',
    visibleInSidebar: false
  },
];

export const flightQuoteRoutes = [
  {
    path: '/charteroverflight',
    urlPath: '/charteroverflight',
    name: 'Charter Overflight',
    icon: ContactMailIcon,
    component: CharterOverflight,
    layout: '/admin',
  },
  {
    path: '/blockoverflight',
    urlPath: '/blockoverflight',
    name: 'Block Overflight',
    icon: LibraryBooks,
    component: BlockOverflight,
    layout: '/admin',
  },
  {
    path: '/groundhandling',
    urlPath: '/groundhandling',
    name: 'Ground Handling',
    icon: LibraryBooks,
    component: GroundHandling,
    layout: '/admin',
  },
];
