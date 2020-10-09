import React, { useState, useEffect } from 'react';
import DataSourceTable from './DataSourceTable';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import { getDataSources, deleteDataSource } from './DataSourceAPI';

export default function DataSources() {
  const [dataSources, setDataSources] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    getDataSources()
      .then(res => {
        setDataSources(res);
        setIsLoaded(true);
      });
  }, []);

  const handleDataSourceDelete = (dataSource) => {
    deleteDataSource(dataSource.id)
      .then(res => {
        const removeDataSourceIndex = dataSources.map(x => x.id).indexOf(dataSource.id);
        dataSources.splice(removeDataSourceIndex, 1);
        setDataSources([...dataSources]);
      });
  }

  return (
    <React.Fragment>
      <AppBar position="static" color='inherit'>
          <Toolbar>
            <IconButton component={Link} to='/' edge="start" color="inherit">
              <HomeIcon />
            </IconButton>
            Источники данных       
        </Toolbar>
      </AppBar>

      <Button component={Link} to='/dataSources/add' variant="contained" color='primary'>Добавить источник данных</Button>

      {isLoaded &&
        <DataSourceTable dataSources={dataSources} onDeleteDataSource={handleDataSourceDelete}/>
      }
      
    </React.Fragment>
  );
}