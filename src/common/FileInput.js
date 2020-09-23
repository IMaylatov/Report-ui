import React from 'react';
import { Button } from '@material-ui/core';

export default function FileInput(props) {
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      props.onChange(e.target.files[0]);
    }
  }

  return (
    <div>
      {props.value !== '' && (
        <span>{props.value.name}</span>
      )}
      <label>        
        <Button component='span' variant="contained" color='primary'>Выбрать файл</Button>
        <input
          {...props.rest}
          style={{ display: "none" }}
          type="file"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}