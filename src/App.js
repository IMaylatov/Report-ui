import React, { useEffect } from 'react';
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
import { Provider } from 'react-redux';
import userManager, { loadUserFromStorage } from './service/userService'
import store from './store';
import AuthProvider from './utils/authProvider'
import PrivateRoute from './utils/protectedRoute'
import SigninOidc from './pages/signin-oidc'
import SignoutOidc from './pages/signout-oidc'

function App() {
  const notistackRef = React.createRef();
  
  useEffect(() => {
    loadUserFromStorage(store)
  }, [])

  return (    
    <Provider store={store}>
      <AuthProvider userManager={userManager} store={store}>
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
                <Route path="/signout-oidc" component={SignoutOidc} />
                <Route path="/signin-oidc" component={SigninOidc} />
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
    </Provider>
  );
}

export default App;
