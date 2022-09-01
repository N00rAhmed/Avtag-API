import React, { memo } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

// Styling
const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.para,
  },
  selectOption: {
    ...theme.typography.selectOption,
  },
}));

const RHFSelect = ({
  menuItem,
  label,
  selectFieldStyle,
  name,
  error,
  onBlur,
  value,
  onChange,
  placeholder,
  labelColor,
  textColor,
  disabled,
  onClick
}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth error={error ? true : false}>
      <Select
        displayEmpty
        error={error ? true : false}
        name={name}
        defaultValue=''
        value={value}
        onClick={onClick}
        disabled={disabled}
        onChange={onChange}
        style={{color: textColor}}
        placeholder={placeholder}
        onBlur={onBlur}
        inputProps={{
          classes: {
            root: selectFieldStyle,
          },
        }}
      >
        {(menuItem || []).map((item, i) => (
          <MenuItem
            key={`${item}-${i}`}
            classes={{
              root: classes.selectOption,
            }}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>

      {label && (
        <FormHelperText
          style={{ marginTop: -2, color: labelColor }}
          classes={{
            root: classes.input,
          }}
        >
          {label}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(RHFSelect, (prevProps, nextProps) => {
  if (
    prevProps.error !== nextProps.error ||
    prevProps.value !== nextProps.value ||
    prevProps.onChange !== nextProps.onChange
  ) {
    return false;
  }
  return true;
});

//export default RHFSelect;
