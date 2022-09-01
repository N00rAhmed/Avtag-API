export default class path {
  static API_URL = 'https://avtagpro.herokuapp.com/api/v1/';
  //static API_URL = 'http://localhost:5000/api/v1/';
  static SIGNUP = path.API_URL + 'auth/register';
  static SIGNIN = path.API_URL + 'auth/login';
  static LOADUSER = path.API_URL + 'auth/me';
  static LOGOUT = path.API_URL + 'auth/logout';
  static ALLCUSTOMERS = path.API_URL + 'customers';
  static CUSTOMER = path.API_URL + 'customers';
  static ALLCOUNTRIES = path.API_URL + 'countries';
  static ALLOPERATORS = path.API_URL + 'operators';
  static ALLAIRCRAFTS = path.API_URL + 'aircrafts';
  static ALLAIRPORTS = path.API_URL + 'airports';
  static OPERATOR = path.API_URL + 'operators';
  static TRIPSHEET = path.API_URL + 'tripsheets';
  static SERVICEPROVIDER = path.API_URL + 'serviceproviders';
  static GROUNDHANDLER = path.API_URL + 'groundhandlers';
  static FUELPROVIDER = path.API_URL + 'fuelproviders';
  static FUELQUOTATION = path.API_URL + 'fuelquotations';
  static STAFFPROFILE = path.API_URL + 'staffprofiles';
  static SHIFT = path.API_URL + 'shifts';
  static SHIFTHANDOVER = path.API_URL + 'shifthandovers';
}
