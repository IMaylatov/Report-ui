import React, { useState, useEffect } from 'react';
import ReportTable from './ReportTable';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { getReports } from './ReportAPI';
import { Link } from "react-router-dom";

export default function Reports() {
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    getReports()
      .then(response => setReports(response));
  }, []);

  return (
    <React.Fragment>
      <AppBar position="static" color='inherit'>
          <Toolbar>
            <IconButton component={Link} to='/reports' edge="start" color="inherit">
              <HomeIcon />
            </IconButton>
            Отчеты       
        </Toolbar>
      </AppBar>

      <Button component={Link} to='/reports/add' variant="contained" color='primary'>Добавить отчет</Button>

      <ReportTable reports={reports}/>
    </React.Fragment>
  );
}