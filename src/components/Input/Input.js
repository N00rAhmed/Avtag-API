import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({
  type,
  helperText,
  rootHelperTextStyle,
  textFieldName,
  textFieldValue,
  inputMaxLength,
  error,
  inputRef,
  onTableValueChange,
  tableInputStyles,
  inputPlaceholder,
  onInputFocus,
  disabled,
}) => {
  return (
    <TextField
      fullWidth
      onBlur={onInputFocus && onInputFocus}
      autoComplete='off'
      type={type}
      value={textFieldValue}
      disabled={disabled}
      name={textFieldName}
      inputRef={inputRef}
      inputProps={{ maxLength: inputMaxLength }}
      InputProps={{
        classes: {
          input: tableInputStyles,
        },
      }}
      error={error ? true : false}
      placeholder={inputPlaceholder}
      onChange={onTableValueChange && onTableValueChange}
      helperText={helperText}
      FormHelperTextProps={{
        className: rootHelperTextStyle,
        style: { marginTop: -2 },
      }}
    />
  );
};

export default Input;
