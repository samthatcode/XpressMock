import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { sessionService } from 'redux-react-session';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const session = sessionService.loadSession();

  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
