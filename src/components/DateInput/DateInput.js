import React, { Fragment, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormHelperText from '@material-ui/core/FormHelperText';
import EventIcon from '@material-ui/icons/Event';

const DateInput = ({
  rootDatefieldStyle,
  helperText,
  rootHelperTextStyle,
  format = 'ddMMMyyyy',
  iconSize,
  name,
  inputValue,
  onChange,
}) => {
  const theme = useTheme();
  // State
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format={format}
          name={name}
          autoOk={true}
          disableToolbar
          fullWidth
          variant='inline'
          color='primary'
          value={inputValue ? inputValue : selectedDate}
          onChange={onChange ? onChange : handleDateChange}
          InputProps={{ className: rootDatefieldStyle }}
          keyboardIcon={
            <EventIcon
              fontSize={iconSize}
              style={{ color: theme.palette.common.primaryColor }}
            />
          }
        />
      </MuiPickersUtilsProvider>
      {helperText && (
        <FormHelperText
          style={{ marginTop: -2 }}
          classes={{
            root: rootHelperTextStyle,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Fragment>
  );
};

export default DateInput;
