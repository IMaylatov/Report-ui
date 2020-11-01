import React from "react";
import { Typography, Toolbar } from "@material-ui/core";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../utils/providers/authProvider";
import { isIdentityScheme } from '../service/authService';
import ReportHeader from '../component/report/header/ReportHeader';

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else if (isIdentityScheme()) {
                    signinRedirect();
                    return <span>loading</span>;
                } else {
                  return (
                    <React.Fragment>
                      <ReportHeader title='Отчеты' />
                      <Toolbar />
                      <Typography>
                        Необходимо авторизоваться
                      </Typography>
                    </React.Fragment>
                  );
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};