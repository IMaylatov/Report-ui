import React from "react";
import { AuthConsumer } from "../../utils/providers/authProvider";

export default function SignInHost(props) {
  localStorage.clear();

  const paramsString = props.location.search;
  const params = new URLSearchParams(paramsString);
  localStorage.setItem('stTicket', btoa(JSON.stringify({
    name: params.get('login'),
    groupIds: params.getAll('groupId'),
    host: params.get('host')
  })));
  localStorage.setItem('redirectUri', params.get('redirectUri'));

  return (
    <AuthConsumer>
      {({ UserManager, signinRedirectCallbackToRedirectUri }) => {
          UserManager.removeUser();
          signinRedirectCallbackToRedirectUri();
          return <span>loading</span>;
      }}
    </AuthConsumer>
  );
}