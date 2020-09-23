import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
  textField: {
    'width': '200px'
  },
  sqlQueryTextarea: {
    'height': '500px',
    'width': '500px'
  }
});

export default function SqlQueryDataSet(props) {
  const classes = useStyles();
  
  const handleQueryChange = (e) => {
    props.onChange({ ...props.data, query : e.target.value });
  }

  const handleDataSetChange = (e) => {
    props.onChange({ ...props.data, dataSource: e.target.value });
  }

  return (
    <React.Fragment>
      <div>
        <FormControl fullWidth className={classes.textField}>
          <TextField
            select
            required 
            label="Источник данных"
            value={props.data.dataSource}
            onChange={handleDataSetChange}
          >
            {props.report.dataSources.map((dataSource) => (
              <MenuItem key={dataSource.name} value={dataSource}>
                {dataSource.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>

      <div>
        <FormControl>
          <TextareaAutosize value={props.data.query} onChange={handleQueryChange} 
            required placeholder="Empty"
            rowsMin='10'
            className={classes.sqlQueryTextarea}/>
        </FormControl>
      </div>
    </React.Fragment>
  );
}