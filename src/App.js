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
import { Callback } from './pages/auth/Callback';
import { LogoutCallback } from './pages/auth/LogoutCallback';
import { SilentRenew } from './pages/auth/SilentRenew';
import { PrivateRoute } from './utils/privateRoute';
import { AuthProvider } from './utils/providers/authProvider';
import SignInStTicket from './pages/auth/SignInStTicket';
import { Register } from './pages/auth/Register';

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
              <Route exact path="/signin-stTicket" component={SignInStTicket} />
              <Route exact path="/logout/callback" component={LogoutCallback} />
              <Route exact path="/register" component={Register} />
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
              <PrivateRoute exact path="/reports" component={Reports} />
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
