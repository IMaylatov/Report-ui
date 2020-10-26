import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getSelectData } from '../../../service/api/variableAPI';
import { useSnackbar } from 'notistack';
import useDebouncedSearch from '../../common/hooks/useDebouncedSearch';

const useSearchDatas = (dataSource, host, query, captionField, enqueueSnackbar) => 
  useDebouncedSearch(text => getSelectData(dataSource, host, query, captionField, text)
    .catch(error => enqueueSnackbar(`Ошибка загрузки набора данных: ${error}`, { variant: 'error' })))

export default function SelectInputVariable(props) {
  const dataSource = props.report.dataSources.find(x => x.name === props.variable.data.dataSet.data.dataSourceName);
  const host = props.host;
  const query = props.variable.data.dataSet.data.query;
  const captionField = props.variable.data.captionField;

  const { enqueueSnackbar } = useSnackbar();
  const { inputText, setInputText, searchResults } = useSearchDatas(dataSource, host, query, captionField, enqueueSnackbar);

  const handleChange = (e, value) => {
    props.onChange({...props.variable, value: value });
  }

  return (
    <React.Fragment>
      <Autocomplete
        multiple = {props.multiple}
        options={searchResults.result ? searchResults.result : []}
        getOptionLabel={(option) => option[captionField]}
        getOptionSelected={(option, value) => option[captionField] === value[captionField]}
        onChange={handleChange}
        inputValue={inputText}
        loading={searchResults.loading}
        onInputChange={(event, newInputValue) => setInputText(newInputValue)}
        renderInput={(params) => 
        <TextField
          {...params} 
          label={props.variable.label} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {searchResults.loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}/>}
      />
    </React.Fragment>
  );
}