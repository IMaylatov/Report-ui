import { IDENTITY_CONFIG } from "../utils/const/authConst";
import { UserManager, WebStorageStateStore, Log, User } from "oidc-client";
import { getUserById, addUser } from './api/userApi';

export const isIdentityScheme = () => {
  return IDENTITY_CONFIG.schemes.includes(IDENTITY_CONFIG.identityScheme);
}

export default class AuthService {
    UserManager;

    constructor() {
      this.UserManager = new UserManager({
          ...IDENTITY_CONFIG,
          userStore: new WebStorageStateStore({ store: window.sessionStorage })
      });
      
      Log.logger = console;
      Log.level = Log.DEBUG;

      this.UserManager.events.addSilentRenewError((e) => {
        console.log("silent renew error", e.message);
      });

      this.UserManager.events.addAccessTokenExpired(() => {
        this.signinSilent();
      });
    }

    signinRedirectCallback = () => {
      this.UserManager.signinRedirectCallback().then(() => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
        getUserById(oidcStorage.profile.sub)
          .then(res => {
            if (res.status !== 404) {
              const redirectUri = localStorage.getItem("redirectUri");
              localStorage.removeItem("redirectUri");
              window.location.replace(redirectUri);
            } else {
              window.location.replace("/register");
            }
          })
      });
    };

    getUser = async () => {
      let user = await this.UserManager.getUser();
      if (user) {
        return user;
      }
      const stTicket = localStorage.getItem('stTicket');
      if (stTicket) {
        const stTicketDecoded = JSON.parse(atob(stTicket));
        user = new User({
          id_token: '',
          profile: {
            name: stTicketDecoded.name
          }
        });
      }
      return user;
    };

    parseJwt = (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };

    signinRedirect = () => {
      localStorage.setItem("redirectUri", window.location.pathname);
      this.UserManager.signinRedirect({});
    };

    isAuthenticatedIdentityUser = () => {
      const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
      return (!!oidcStorage && !!oidcStorage.id_token);
    };

    isAuthenticated = () => {
      if (this.isAuthenticatedIdentityUser()) {
        return true;
      } else {
        const stTicket = localStorage.getItem('stTicket');
        return !!stTicket;
      }
    };

    signinSilent = () => {
      this.UserManager.signinSilent()
        .then((user) => {
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    signinSilentCallback = () => {
      this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
      return this.UserManager.createSigninRequest();
    };

    logout = () => {
      if (this.isAuthenticatedIdentityUser()) {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
      } else {
        localStorage.clear();
        window.location.replace(process.env.REACT_APP_PUBLIC_URL);
      }
    };

    signoutRedirectCallback = () => {
      this.UserManager.signoutRedirectCallback().then(() => {
          localStorage.clear();
          window.location.replace(process.env.REACT_APP_PUBLIC_URL);
      });
      this.UserManager.clearStaleState();
    };

    signinRedirectCallbackToRedirectUri = () => {
      const redirectUri = localStorage.getItem("redirectUri");
      localStorage.removeItem("redirectUri");
      window.location.replace(redirectUri);
    }

    register = () => {
      const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
      const user = {
        id: oidcStorage.profile.sub,
        name: oidcStorage.profile.name
      }
      addUser(user)
        .then(user => {
          const redirectUri = localStorage.getItem("redirectUri");
          localStorage.removeItem("redirectUri");
          window.location.replace(redirectUri);
        })      
    }
}