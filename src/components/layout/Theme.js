import { createMuiTheme } from '@material-ui/core/styles';

const DARK_BLUE = '#203764';
const SELECT_HOVER = '#D9E1F2';
const SELECTED_MENU = '#75C502';
const RED = '#CC0000';
const WHITE = '#FFFFFF';

export default createMuiTheme({
  palette: {
    action: {
      focus: SELECT_HOVER,
      selected: SELECT_HOVER,
    },
    text: {
      primary: '#203764',
      secondary: '#203764',
    },
    common: {
      primaryColor: `${DARK_BLUE}`,
      secondaryColor: `${RED}`,
      selectedMenuColor: `${SELECTED_MENU}`,
      optionHoverColor: `${SELECT_HOVER}`,
      whiteColor: `${WHITE}`,
      preffered: '#88e504',
    },
    primary: {
      main: `${DARK_BLUE}`,
    },
    secondary: {
      main: `${RED}`,
    },
  },
  overrides: {
    MuiAutocomplete: {
      inputRoot: {
        paddingRight: '0px !important',
      },
      option: {
        '&:hover': {
          backgroundColor: SELECT_HOVER,
        },
        '&[data-focus="true"]': {
          backgroundColor: SELECT_HOVER,
        },
      },
    },
    MuiMenuItem: {
      root: {
        textTransform: 'uppercase',
      },
    },
    MuiSelect: {
      select: {
        // color: `${DARK_BLUE}`,
        fontSize: '0.8rem',
        fontWeight: 'bold',
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        color: `${DARK_BLUE} !important`,
      },
    },
    MuiTable: {
      root: {
        opacity: '1 !important',
        color: '#203764 !important',
        fontSize: '0.8rem !important',
        fontWeight: '800 !important',
        textTransform: 'uppercase',
      },
    },
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: SELECT_HOVER
        }
      },
    },
    MuiTableCell: {
      root: {
        height:'5px !important',
        padding:'5px !important',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
       },
       
     },
    MuiInput: {
      input: {
        textTransform: 'uppercase',
        // color: `${DARK_BLUE}`,
      },
      underline: {
        // color: `${DARK_BLUE}`,
        fontSize: '0.8rem',

        fontWeight: 'bold',
        '&:hover:not($focused):before': {
          borderBottom: `2px solid ${DARK_BLUE}`,
        },
      },
    },
  },
  typography: {
    fontFamily: 'white-medium, Roboto , Helvetica, Arial, sans-serif',
    primaryHeading: {
      fontSize: '1.8rem',
      fontWeight: 400,
      lineHeight: '1.235',
    },
    secondaryHeading: {
      fontWeight: 800,
      fontSize: '1.4rem',
      lineHeight: '38px',
    },
    tertiaryHeading: {
      fontWeight: 600,
      fontSize: '1.05rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.3rem',
      lineHeight: '38px',
    },
    para: {
      fontSize: '0.8rem',
      // color: DARK_BLUE,
      lineHeight: '28px',
    },
    mainButton: {
      fontSize: '0.8rem',
      lineHeight: '28px',
      borderRadius: 0,
      color: '#fff',
      textAlign: 'left',
      //display: 'block',
      fontWeight: 600,
      backgroundColor: `${RED}`,
      transition: 'all 400ms linear',
    },

    mainButtonIcon: {
      marginRight: 5,
      marginLeft: 5,
    },
    secondaryButton: {
      fontSize: '0.8rem',
      lineHeight: '28px',
      borderRadius: 3,
      color: '#fff',
      textAlign: 'left',
      display: 'block',
      fontWeight: 600,
      backgroundColor: `${RED}`,
      transition: 'all 400ms linear',
      width: '90px',
    },
    secondaryButtonIcon: {
      marginRight: 5,
    },
    tableHeader: {
      backgroundColor: '#808080',
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      textAlign: 'left',
    },
    tableRow: {
      // fontSize: '0.8rem',
      // color: `${DARK_BLUE}`,
      // lineHeight: '28px',
      // textTransform: 'uppercase',
      // textAlign: 'left',
      // fontWeight: '800',
    },
    select: {
      fontSize: '0.8rem',
      // color: `${DARK_BLUE}`,
      lineHeight: '28px',
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    selectOption: {
      fontSize: '0.8rem',
      // color: `${DARK_BLUE}`,
      lineHeight: '28px',
      '&:hover': {
        backgroundColor: `${SELECT_HOVER}`,
      },
    },
  },
});
