import React from 'react';

import CAppBar from './components/CAppBar';

import './App.css';

import MoviesAPI from './api/MoviesAPI';

class App extends React.Component {

    async componentDidMount() {

        const data = await MoviesAPI.getHome();

        console.log(data);
    }

    render() {
        return (
            <div className="App">
                <CAppBar />
            </div>
        );
    }
}

export default App;
