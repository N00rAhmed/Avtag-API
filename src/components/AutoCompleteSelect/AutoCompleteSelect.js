import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

// Styling
const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.para,
  },
  autoCompleteOption: {
    ...theme.typography.selectOption,
  },
  autoCompleteButton: {
    ...theme.typography.mainButton,
  },
  buttonIcon: {
    ...theme.typography.mainButtonIcon,
  },
}));

const AutoCompleteInput = ({
  Options,
  onChange,
  label,
  textFieldStyles,
  renderOption,
  optionLabel,
  inputRef,
  error,
  name,
  disabled,
  value,
  button,
  buttonText,
  buttonClick,
  buttonStyles,
  placeholder,
  inputMaxLength,
  onFocus,
  onBlur,
}) => {
  const classes = useStyles();
  buttonStyles =
    buttonStyles == null
      ? classes.autoCompleteButton
      : classes.autoCompleteButton + buttonStyles;
  // To fiter data (working)
  const defaultFilterOptions = createFilterOptions();
  const filterOptions = (options, state) =>
    defaultFilterOptions(options, state).slice(0, 5);

  const onInputFocus = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = 'whatever';
    }
  };
  const Link = ({ children, ...other }) => (
    <Paper {...other}>
      {button && (
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={buttonClick}
          className={buttonStyles}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AddCircleOutlineIcon
              //fontSize='small'
              className={classes.buttonIcon}
            />
            {buttonText}
          </div>
        </Button>
      )}

      {children}
    </Paper>
  );
  return (
    <FormControl fullWidth error={error ? true : false}>
      <Autocomplete
        filterOptions={filterOptions}
        onFocus={onFocus ? onFocus : onInputFocus}
        onChange={onChange}
        closeIcon={null}
        inputValue={value}
        popupIcon={null}
        onBlur={onBlur}
        placeholder={placeholder}
        noOptionsText='NO RESULT FOUND'
        disabled={!disabled}
        classes={{
          root: classes.input,
          option: classes.autoCompleteOption,
          noOptions: classes.input,
          input: textFieldStyles,
        }}
        clearOnBlur
        options={Options}
        getOptionLabel={(option) =>
          option.combo ? option.combo.toUpperCase() : ''
        }
        renderOption={renderOption && renderOption}
        renderInput={(params) => (
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
            }}
          >
            <SearchIcon
              fontSize='small'
              color='primary'
              style={{
                position: 'absolute',
                right: 0,
                top: 5,
                width: 20,
                height: 20,
              }}
            />
            <TextField
              {...params}
              inputRef={inputRef}
              onChange={onChange}
              name={name}
              placeholder={placeholder}
              autoComplete='random'
              error={error ? true : false}
              value={value}
              inputProps={{ ...params.inputProps, maxLength: inputMaxLength }}
            />
          </div>
        )}
        PaperComponent={Link}
      />
      <FormHelperText
        style={{ marginTop: -2 }}
        classes={{
          root: classes.input,
        }}
      >
        {label}
      </FormHelperText>
    </FormControl>
  );
};

export default AutoCompleteInput;
