import React, { useContext, useEffect } from 'react';

import { Auth0Context } from '../contexts/auth0-context'; 

import auth_config from '../contexts/auth_config.json';


const CAccessToken = () => {

    const { isLoading, getTokenSilently } = useContext(Auth0Context);
    
    useEffect(() => {

        const callAPI = async () => {

            const access_token = await getTokenSilently({
                audience: auth_config.audience
            });

              localStorage.setItem('access_token', access_token)
        };
        
        if (!isLoading) {
            callAPI();
        }
    });

    return (
        <>
        </>
    )
}

export default CAccessToken;