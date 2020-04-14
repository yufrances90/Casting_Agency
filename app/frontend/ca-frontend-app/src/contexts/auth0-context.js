import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

import auth_config from './auth_config.json';

// create the context
export const Auth0Context = createContext();

// create a provider
export class Auth0Provider extends Component {

    state = {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: null
    };

    config = {
        domain: auth_config.domain,
        client_id: auth_config.clientId,
        redirect_uri: window.location.origin,
        audience: auth_config.audience
    };

    componentDidMount() {
        this.initializeAuth0();
    }

    // initialize the auth0 library
    initializeAuth0 = async () => {

        const auth0Client = await createAuth0Client(this.config);
        this.setState({ auth0Client });

        // check to see if they have been redirected after login
        if (window.location.search.includes('code=')) {
            return this.handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;
        this.setState({ isLoading: false, isAuthenticated, user });
    };

    // handle the authentication callback
    handleRedirectCallback = async () => {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();
        const access_token = await this.state.auth0Client.getTokenSilently();

        window.localStorage.setItem("access_token", access_token);

        this.setState({ user, isAuthenticated: true, isLoading: false });
        window.history.replaceState({}, document.title, window.location.pathname);

        window.location.reload();
    };

  
    render() {

        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;

        const configObject = { 
                isLoading, 
                isAuthenticated,
                user,
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                logout: (...p) => {
                    auth0Client.logout(...p);
                    localStorage.removeItem("access_token");
                } 
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        );
    }
  }