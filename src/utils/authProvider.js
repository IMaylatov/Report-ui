import React, { useEffect, useRef } from 'react';
import { storeUser, userExpired, userSignedOut } from '../actions/authActions';
import { setAuthHeader } from '../utils/axiosHeaders';

export default function AuthProvider({ userManager: manager, store, children }) {
  let userManager = useRef();

  useEffect(() => {
    userManager.current = manager

    const onUserLoaded = (user) => {
      store.dispatch(storeUser(user))
    }

    const onUserUnloaded = () => {
      setAuthHeader(null);
    }

    const onAccessTokenExpiring = () => {
    }

    const onAccessTokenExpired = () => {
      store.dispatch(userExpired());
      console.log(`user token expired`);
    }

    const onUserSignedOut = () => {
      store.dispatch(userSignedOut());
      console.log(`user signed out`)
    }

    userManager.current.events.addUserLoaded(onUserLoaded)
    userManager.current.events.addUserUnloaded(onUserUnloaded)
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring)
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired)
    userManager.current.events.addUserSignedOut(onUserSignedOut)

    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired)
      userManager.current.events.removeUserSignedOut(onUserSignedOut)
    };
  }, [manager, store]);

  return (
    React.Children.only(children)
  )
}