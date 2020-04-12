import React, { useContext, useEffect } from 'react';

import { Auth0Context } from '../contexts/auth0-context'; 


const CAccessToken = () => {

    const { isLoading, getIdTokenClaims } = useContext(Auth0Context);
    
    useEffect(() => {

        const callAPI = async () => {

            const claims = await getIdTokenClaims();

            const id_token = claims? claims['__raw'] : null;

            localStorage.setItem('token', id_token)
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