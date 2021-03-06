import React from 'react';
import FileInput from '../common/FileInput';
import { Button, Grid } from '@material-ui/core';
import download from 'downloadjs';

export default function XlsxFileTemplate(props) {
  const handleFileChange = (data) => {
    props.onChange({ ...props.template, data: data});
  };

  const handleDownloadClick = (e) => {
    download(props.template.data, `${props.report.name}.xlsx`);
  }

  return (
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <FileInput value={props.template.data} onChange={handleFileChange} />
      </Grid>
      <Grid item>
        {props.template.data !== null &&
          <Button component='span' variant="contained" color='primary' onClick={handleDownloadClick}>Скачать файл</Button>
        }
      </Grid>
    </Grid>
  )
}