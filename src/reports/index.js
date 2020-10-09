import React, { useState, useEffect } from 'react';
import ReportTable from './ReportTable';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { getReports, deleteReport } from './ReportAPI';
import { Link } from "react-router-dom";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    getReports()
      .then(res => {
        setReports(res);
        setIsLoaded(true);
      });
  }, []);

  const handleReportDelete = (report) => {
    deleteReport(report.id)
      .then(res => {
        const removeReportIndex = reports.map(x => x.id).indexOf(report.id);
        reports.splice(removeReportIndex, 1);
        setReports([...reports]);
      });
  }

  return (
    <React.Fragment>
      <AppBar position="static" color='inherit'>
          <Toolbar>
            <IconButton component={Link} to='/' edge="start" color="inherit">
              <HomeIcon />
            </IconButton>
            Отчеты       
        </Toolbar>
      </AppBar>

      <Button component={Link} to='/reports/add' variant="contained" color='primary'>Добавить отчет</Button>

      {isLoaded &&
        <ReportTable reports={reports} onDeleteReport={handleReportDelete}/>
      }
      
    </React.Fragment>
  );
}