import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { Auth0Provider } from './contexts/auth0-context';

import './index.css';
import './App.css';


ReactDOM.render(
    <Auth0Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Auth0Provider>,
    document.getElementById('root')
);
