import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Reports from './pages/Reports'
import AddReport from './pages/AddReport'
import EditReport from './pages/EditReport'
import ReportRun from './pages/ReportRun';
import { ThemeProvider } from '@material-ui/core/styles';
import { trustMedTheme } from './theme/trustMedTheme';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={trustMedTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
