import React, { useState } from 'react';
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
  icon: {},
}));

const SelectInput = ({
  menuItem,
  label,
  value,
  onTableValueChange,
  selectFieldStyle,
  name,
  error,
  inputRef,
}) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (e) => {
    setSelectedValue(e.target.value || '');
  };
  console.log('render');
  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        error={error}
        inputRef={inputRef}
        onChange={onTableValueChange ? onTableValueChange : handleChange}
        name={name}
        value={selectedValue ? selectedValue : value}
        inputProps={{
          classes: {
            icon: classes.icon,
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
          style={{ marginTop: -2 }}
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

export default SelectInput;
