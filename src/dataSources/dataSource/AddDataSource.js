import React, { useState }  from 'react';
import DataSource from './DataSource';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DATASOURCE_TYPE_MSSQL, DATASOURCE_TYPE_POSTGRESQL } from '../../constants';

export default function AddDataSource(props) {
  const [dataSource, setDataSource] = useState({
    id: 0,
    name: '',
    type: '',
    data: {}
  });

  const handleTypeSelect = (type) => {
    dataSource.type = type;
    setDataSource({...dataSource });
  }

  return (
    <React.Fragment>
      {dataSource.type === '' &&
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Выберите тип источника данных</Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button onClick={() => handleTypeSelect(DATASOURCE_TYPE_MSSQL)} 
                variant='contained' color='primary'>MsSql</Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => handleTypeSelect(DATASOURCE_TYPE_POSTGRESQL)} 
                variant='contained' color='primary'>PostgreSql</Button>
            </Grid>
          </Grid>
        </Grid>
      }
      {dataSource.type !== '' &&
        <DataSource value={dataSource}/>
      } 
    </React.Fragment>
  );
}