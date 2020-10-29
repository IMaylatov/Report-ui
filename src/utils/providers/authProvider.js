import React, {Component} from "react";
import AuthService from "../../service/authService";

const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({}),
    getUser: async () => ({}),
    signinRedirectCallbackToRedirectUri: () => ({}),
    register: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    authService;
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    render() {
        return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
    }
}