import { IDENTITY_CONFIG } from "../utils/const/authConst";
import { UserManager, WebStorageStateStore, Log, User } from "oidc-client";

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
        const redirectUri = localStorage.getItem("redirectUri");
        localStorage.removeItem("redirectUri");
        window.location.replace(redirectUri);
      });
    };

    getUser = async () => {
      let user = await this.UserManager.getUser();
      if (user) {
        return user;
      }
      const lsStUser = localStorage.getItem('st.user');
      if (lsStUser) {
        const stUser = JSON.parse(lsStUser);
        user = new User({
          id_token: '',
          profile: {
            name: stUser.name
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

    isAuthenticated = () => {
      const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
      const stUser = localStorage.getItem('st.user');

      return (!!oidcStorage && !!oidcStorage.id_token) || stUser;
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
      this.UserManager.signoutRedirect({
          id_token_hint: localStorage.getItem("id_token")
      });
      this.UserManager.clearStaleState();
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
}