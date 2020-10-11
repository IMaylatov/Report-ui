import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Reports from './reports/index'
import AddReport from './reports/report/AddReport'
import EditReport from './reports/report/EditReport'
import DataSources from './dataSources/index';
import AddDataSource from './dataSources/dataSource/AddDataSource';
import EditDataSource from './dataSources/dataSource/EditDataSource';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Link to="/reports">Reports</Link>
            <br/>
            <Link to="/dataSources">DataSources</Link>
        </Route>
        <Route exact path="/reports">
          <Reports />
        </Route>
        <Route exact path="/reports/add">
          <AddReport />
        </Route>
        <Route exact path="/reports/:reportId">
          <EditReport />
        </Route>        
        <Route exact path="/dataSources">
          <DataSources />
        </Route>      
        <Route exact path="/dataSources/add">
          <AddDataSource />
        </Route>    
        <Route exact path="/dataSources/:dataSourceId">
          <EditDataSource />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
