import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import { Auth0Provider } from './contexts/auth0-context';
import reducer from './reducers';
import middleware from './middleware';

import './index.css';
import './App.css';

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store} >
        <Auth0Provider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </Provider>,
    document.getElementById('root')
);
