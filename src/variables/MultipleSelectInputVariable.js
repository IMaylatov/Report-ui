import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { getSqlQueryItems } from '../dataSets/DataSetAPI';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function MultipleSelectInputVariable(props) {  
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
      const newItems = await getSqlQueryItems(dataSource.id, query, captionField, inputValue);

      if (!active) {
        return;
      }

      setItems(newItems);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [dataSource.id, query, captionField, inputValue]);

  const handleChange = (e, value) => {
    props.onChange({...props.variable, value: value });
  }

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        options={items}
        getOptionLabel={(option) => option[captionField]}
        style={{ width: 300 }}
        onChange={handleChange}
        inputValue={inputValue}
        loading={loading}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => 
        <TextField 
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