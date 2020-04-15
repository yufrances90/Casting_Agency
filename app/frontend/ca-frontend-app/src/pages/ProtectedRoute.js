import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { Auth0Context } from '../contexts/auth0-context'; 

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useContext(Auth0Context);

    return (
        <Route {...rest} render={ props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/" }} />
            )}
        />
    );
}


export default ProtectedRoute;