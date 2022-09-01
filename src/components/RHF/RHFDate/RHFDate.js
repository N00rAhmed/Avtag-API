import React, { Fragment } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText';
import EventIcon from '@material-ui/icons/Event';

const DateInput = ({
  rootDatefieldStyle,
  helperText,
  rootHelperTextStyle,
  format = 'MM/dd/yyyy',
  iconSize,
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  minDate,
}) => {
  const theme = useTheme();
  return (
    <Fragment>
      <KeyboardDatePicker
        format={format}
        name={name}
        autoOk={true}
        onBlur={onBlur}
        disableToolbar
        fullWidth
        minDate={minDate && minDate}
        minDateMessage="Shouldn't less than Dep Date"
        variant='inline'
        color='primary'
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        InputAdornmentProps={{
          style: { padding: 0 },
        }}
        InputProps={{ className: rootDatefieldStyle }}
        keyboardIcon={
          <EventIcon
            fontSize={iconSize}
            style={{
              color: theme.palette.common.primaryColor,
            }}
          />
        }
      />
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
