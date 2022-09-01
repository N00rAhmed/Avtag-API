export const TripRequest = [
  'Overflight',
  'Landing Permit',
  'Airport Parking Slot',
  'Ground handling',
];

export const FlightType = [
  'Commercial Flight',
  'Non Commercial Flight',
  'Private Flight',
];

export const Version = [
  'Initial Version',
  'Version 1',
  'Version 2',
  'Version 3',
  'Version 4',
  'Version 5',
  'Version 6',
  'Version 7',
  'Version 8',
  'Version 9',
  'Version 10',
  'Final Version',
  'Cancel Revenue',
  'Flight Cancel',
  'Fuel Uplift',
  'Overwrite',
  'Tentative',
];

export const FlightCategory = [
  'Passenger Flight',
  'Cargo Flight',
  'Air Ambulance',
  'Evacuation Flight',
  'Ferry Positioning Flight',
  'Ferry Delivery Flight',
  'State Offical Flight',
  'Deportees Flight',
  'Test Flight',
  'DGR Flight',
  'Uplift Fuel',
  'Fuel Stop Flight',
  'Recovery Flight',
];

export const Customer = [
  { name: 'AEROTRANS CARGO FZE' },
  { name: 'SKY LEASE' },
  { name: 'CLEARWAY' },
  { name: 'NAVFIX FLIGHT SERVICES' },
  { name: 'TEXEL AIR' },
];

export const Operator = [
  {
    name: 'AEROTRANS CARGO SRL',
    registration: 'ER-BBJ',
    aircraft: 'B747-412F',
  },
  {
    name: 'AEROTRANS CARGO SRL',
    registration: 'ER-JAI',
    aircraft: 'B747-412F',
  },
  {
    name: 'AEROTRANS CARGO SRL',
    registration: 'ER-BAM',
    aircraft: 'B747-400',
  },
  {
    name: 'AEROTRANS CARGO SRL',
    registration: 'ER-BAJ',
    aircraft: 'B747-412F',
  },
  {
    name: 'AEROTRANS CARGO SRL',
    registration: 'ER-BBB',
    aircraft: 'B747-433SF',
  },
  { name: 'KLASJET UAB', registration: 'LY-JMS', aircraft: 'B737-500' },
  { name: 'SKY LEASE', registration: 'N-903AR', aircraft: 'B747-400' },
  { name: 'TEXEL AIR', registration: 'A9C-TXL', aircraft: 'B737-300' },
  { name: 'CONVIASA', registration: 'YV-3052', aircraft: 'E190' },
];

export const PermitType = [
  'OVERFLY PERMIT',
  'LANDING PERMIT',
  'TAKEOFF PERMIT',
  'FLIGHT PLAN',
  'AIRPORT PARKING SLOT',
  'NAVIGATION',
  'PRIOR PERMISSION REQUIRED',
  'ADNC CLEARANCE',
  'DIPLOMATIC LANDING PERMIT',
  'ADVANCE PASSENGER INFORMATION',
  'OTHER SERVICES',
];

export const Status = ['PENDING', 'REQUESTED', 'CONFIRMED'];

export const QuoteNo = [
  { name: '500001' },
  { name: '501002' },
  { name: '520403' },
  { name: '508094' },
  { name: '599005' },
];

export const SectorNo = [
  { name: '1' },
  { name: '1-2' },
  { name: '2-3' },
  { name: '2' },
  { name: '3' },
];

export const Payment = ['BILL TO CUSTOMER', 'CASH PAYMENT', 'N/A'];

export const Remarks = [
  'ALL PERMISSION NUMBER MUST BE INSERTED IN “FLIGHT PLAN ITEM 18”',
  'PLEASE INFORM US IMMEDIATELY IF CHANGE IN “SCHEDULE”, DOF, ETD/ETA & PASSENGER INFO”',
  'IF EN-ROUTE OVERFLIGHT COUNTRIES ENTRY / EXIT POINT CHANGE “IMMEDIATELY INFORM US”',
  'IT IS AN OPERATOR RESPONSIBILITY TO CHECK ALL EFFECTIVE NOTAMS TO ALL ORIGIN/DESTINATION BEFORE FLIGHT DEPARTURE.',
  'PASSENGER TRANSPORT ARRANGED | CAR : MERCEDES-BENZ S-CLASS',
  'CREW HOTEL RESERVATION " PLEASE FIND ATTACHED HOTEL BOOKING CONFIRMATION"',
  'CREW HOTEL ACCOMODATION PAYMENT WILL BE PAID DIRECTLY BY CREW',
  'PLEASE SEND US ON TIME AIRCRAFT DEPARTURE MOVEMENT FROM ORIGIN TO UPDATE AIRCRAFT SECURITY AGENCY AT DESTINATION.',
];

export const Country = [
  { name: 'Afghanistan' },
  { name: 'Albania' },
  { name: 'Algeria' },
  { name: 'American Samoa' },
  { name: 'Andorra' },
  { name: 'Angola' },
  { name: 'Anguilla' },
];

export const CountryICAO = [
  { name: 'OPKC' },
  { name: 'OERK' },
  { name: 'OMDB' },
  { name: 'OTRD' },
  { name: 'LOPI' },
  { name: 'QWRR' },
  { name: 'ZZAS' },
];

export const TripsheetDashboardHeadCells = [
  { id: 'tripno', label: 'Trip #' },
  { id: 'operator', label: 'Operator' },
  { id: 'customer', label: 'Customer' },
  { id: 'registration', label: 'Registration' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'status', label: 'Status' },
  { id: 'type', label: 'Type' },
  { id: 'action', label: 'Action' },
];

export const ScheduleRemark = [
  { name: 'PAX-??' },
  { name: 'FERRY' },
  { name: 'CARGO' },
];

export const SelectFuelQuoteHeadCells = [
  { id: 'quoteNo', label: 'Quote' },
  { id: 'icao', label: 'ICAO' },
  { id: 'fuelsupplier', label: 'Fuel Supplier' },
  { id: 'customer', label: 'Customer' },
  { id: 'action', label: 'Action' },
];
