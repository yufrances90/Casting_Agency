import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

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
        domain: 'francesyu90.auth0.com',
        client_id: '9KEl7F1yEqU8eTkSIb0e9B6Im8EXSwFh',
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    }

    // initialize the auth0 library
    initializeAuth0 = async () => {

        const auth0Client = await createAuth0Client(this.config);
        const isAuthenticated = await auth0Client.isAuthenticated(); 
        const user = isAuthenticated ? await auth0Client.getUser() : null;

        this.setState({ 
            auth0Client, 
            isLoading: false,
            isAuthenticated,
            user
        });
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
                logout: (...p) => auth0Client.logout(...p) 
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        );
    }
  }