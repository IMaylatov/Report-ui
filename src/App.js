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
import { trustMedTheme } from './trustMedTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from './component/common/icons/CloseIcon';
import ErrorBoundary from './utils/errorBoundary';
import { Callback } from './pages/auth/callback';
import { LogoutCallback } from './pages/auth/logoutCallback';
import { SilentRenew } from './pages/auth/silentRenew';
import { PrivateRoute } from './utils/privateRoute';
import { AuthProvider } from './providers/authProvider';
import SignInHost from './pages/auth/signInHost';

function App() {
  const notistackRef = React.createRef();
  
  return (  
    <AuthProvider>
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
              <Route exact path="/signin-oidc" component={Callback} />
              <Route exact path="/signin-host" component={SignInHost} />
              <Route exact path="/logout/callback" component={LogoutCallback} />
              <Route exact path="/silentrenew" component={SilentRenew} />
              
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
              <PrivateRoute exact path="/reports/add" component={AddReport} />
              <PrivateRoute exact path="/reports/:reportId" component={EditReport} />
              <PrivateRoute exact path="/reports/:reportId/run" component={ReportRun} />
              <Route exact path="/error">                       
                <Error />
              </Route>
            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>  
  );
}

export default App;
