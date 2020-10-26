import React from "react";
import { AuthConsumer } from "../../utils/providers/authProvider";

export const Callback = () => (
    <AuthConsumer>
      {({ signinRedirectCallback }) => {
          signinRedirectCallback();
          return <span>loading</span>;
      }}
    </AuthConsumer>
);