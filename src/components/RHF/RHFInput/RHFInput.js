import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const Input = ({
  type,
  name,
  onChange,
  helperText,
  rootHelperTextStyle,
  error,
  disabled,
  inputRef,
  value,
  onBlur,
  placeholder,
  onFocus,
  searchIcon,
  rootInputBackgroundColor,
  multiline,
  inputTextAlign,
  inputTextTransform,
  onKeyDown,
  inputMaxLength,
  inputFieldHeight,
  inputTextSize,
  rows,
  inputColor
}) => {
  return (
    <TextField
      fullWidth
      disabled={disabled}
      multiline={multiline}
      autoComplete='off'
      onKeyDown={onKeyDown}
      defaultValue={value}
      rows={rows}
      onBlur={onBlur}
      type={type ? type : 'text'}
      name={name}
      onFocus={onFocus}
      inputProps={{
        maxLength: inputMaxLength,
        style: { textAlign: inputTextAlign, color: inputColor, textTransform: inputTextTransform, height:inputFieldHeight, fontSize:inputTextSize },
      }} // the change is here
      inputRef={inputRef}
      placeholder={placeholder}
      InputProps={{
        style: {
          textTransform: 'lowercase',
          backgroundColor: rootInputBackgroundColor && rootInputBackgroundColor,
          textAlign: 'center !important',
        },
        startAdornment: searchIcon && (
          <InputAdornment position='start'>
            <Search fontSize='small' />
          </InputAdornment>
        ),
      }}
      error={error ? true : false}
      onChange={onChange}
      helperText={helperText}
      FormHelperTextProps={{
        className: rootHelperTextStyle,
        style: { marginTop: -2 },
      }}
    />
  );
};

export default memo(Input, (prevProps, nextProps) => {
  if (
    prevProps.error !== nextProps.error ||
    prevProps.value !== nextProps.value ||
    prevProps.onChange !== nextProps.onChange
  ) {
    return false;
  }
  return true;
});
// export default Input;
