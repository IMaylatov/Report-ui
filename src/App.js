import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Reports from './reports/index'
import AddReport from './reports/report/AddReport'
import EditReport from './reports/report/EditReport'
import ReportRun from './reports/run/ReportRun';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
              return (
                <Redirect to="/reports" /> 
              )
          }}
        />
        <Route exact path="/reports">
          <Reports />
        </Route>
        <Route exact path="/reports/add">
          <AddReport />
        </Route>
        <Route exact path="/reports/:reportId">
          <EditReport />
        </Route> 
        <Route exact path="/reports/:reportId/run">
          <ReportRun />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
