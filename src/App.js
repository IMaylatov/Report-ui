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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Link to="/reports">Reports</Link>
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
      </Switch>
    </Router>
  );
}

export default App;
