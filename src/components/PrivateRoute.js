import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useLoginContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
