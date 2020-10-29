import React from 'react';
import { AuthConsumer } from "../../utils/providers/authProvider";

export const Register = () => {
    return (
      <AuthConsumer>
      {({ register }) => {
          register();
          return <span>loading</span>;
      }}
      </AuthConsumer>
    );
};