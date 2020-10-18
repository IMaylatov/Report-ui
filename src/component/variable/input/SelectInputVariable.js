import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getSelectData } from '../../../service/VariableAPI';

const useStyles = makeStyles((theme) => ({
  formField: {
    width: 500,
  },
}));

export default function SelectInputVariable(props) {
  const classes = useStyles();

  const dataSource = props.report.dataSources.find(x => x.name === props.variable.data.dataSet.data.dataSourceName);
  const query = props.variable.data.dataSet.data.query;
  const captionField = props.variable.data.captionField;

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newItems = await getSelectData(dataSource, query, captionField, inputValue);

      if (!active) {
        return;
      }

      setItems(newItems);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [dataSource, query, captionField, inputValue]);

  const handleChange = (e, value) => {
    props.onChange({...props.variable, value: value });
  }

  return (
    <React.Fragment>
      <Autocomplete
        multiple = {props.multiple}
        options={items}
        getOptionLabel={(option) => option[captionField]}
        getOptionSelected={(option, value) => option[captionField] === value[captionField]}
        onChange={handleChange}
        inputValue={inputValue}
        loading={loading}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => 
        <TextField 
        className={classes.formField}
          {...params} 
          label={props.variable.label} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}/>}
      />
    </React.Fragment>
  );
}