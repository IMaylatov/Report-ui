import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signinRedirect } from '../service/userService';
import ErrorBoundary from '../boundary/ErrorBoundary';

function ProtectedRoute({ children, component: Component, ...rest }) {
  const user = useSelector(state => state.auth.user)
  
  if (!user) {
    signinRedirect();
  }
  
  return (
    <ErrorBoundary>
      <Route {...rest} component={Component} />
    </ErrorBoundary>
  );
}

export default ProtectedRoute
