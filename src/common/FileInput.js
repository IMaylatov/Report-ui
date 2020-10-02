import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function FileInput(props) {
  const inputEl = useRef(null);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      props.onChange(e.target.files[0]);
    }
  }

  const handleDeleteFile = (e) => {
    inputEl.current.value = null;
    props.onChange(null);
  }

  return (
    <div>
      {props.value !== null && (
        <React.Fragment>
          <span>{props.value != null ? props.value?.name ?? 'Файл' : ''}</span>
          <IconButton onClick={handleDeleteFile}>
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      )}
      <label>        
        <Button component='span' variant="contained" color='primary'>Выбрать файл</Button>
        <input
          ref={inputEl}
          {...props.rest}
          style={{ display: "none" }}
          type="file"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}