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
import Error from './pages/Error';
import { ThemeProvider } from '@material-ui/core/styles';
import { trustMedTheme } from './theme/trustMedTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from './component/common/icons/CloseIcon';
import ErrorBoundary from './boundary/ErrorBoundary';

function App() {
  const notistackRef = React.createRef();

  return (
    <ThemeProvider theme={trustMedTheme}>
      <SnackbarProvider maxSnack={3} 
        ref={notistackRef}
        action={(key) => (
          <IconButton onClick={() => notistackRef.current.closeSnackbar(key)} size='small'>
            <CloseButton />
          </IconButton>
        )}
      >
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
              <ErrorBoundary>
                <Reports />
              </ErrorBoundary>
            </Route>
            <Route exact path="/reports/add">              
              <ErrorBoundary>
                <AddReport />
              </ErrorBoundary>
            </Route>
            <Route exact path="/reports/:reportId">
              <ErrorBoundary>
                <EditReport />
              </ErrorBoundary>
            </Route> 
            <Route exact path="/reports/:reportId/run">                       
              <ErrorBoundary>
                <ReportRun />
              </ErrorBoundary>
            </Route>
            <Route exact path="/error">                       
              <Error />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
