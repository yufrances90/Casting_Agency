import React, { useContext, useEffect } from 'react';

import { Auth0Context } from '../contexts/auth0-context'; 

import toast from '../toolkits/toast';

import auth_config from '../contexts/auth_config.json';


const CAccessToken = () => {

    const { isLoading, getTokenSilently } = useContext(Auth0Context);
    
    useEffect(() => {

        const callAPI = () => {

            getTokenSilently({
                audience: auth_config.audience
            }).then(access_token => {
                localStorage.setItem('access_token', access_token);
            }).catch(err => {
                toast.error(err.error_description);
            });
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