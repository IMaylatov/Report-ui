import React from "react";
import { AuthConsumer } from "../../providers/authProvider";

export default function SignInHost(props) {
  const paramsString = props.location.search;
  const params = new URLSearchParams(paramsString);
  localStorage.setItem('st.user', JSON.stringify({
    name: params.get('login'), 
    host: params.get('host')
  }));
  localStorage.setItem('redirectUri', params.get('redirectUri'));

  return (
    <AuthConsumer>
      {({ signinRedirectCallbackToRedirectUri }) => {
          signinRedirectCallbackToRedirectUri();
          return <span>loading</span>;
      }}
    </AuthConsumer>
  );
}