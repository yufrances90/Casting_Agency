import React from 'react'; 
import { Route, Switch } from 'react-router-dom';

import CAppBar from './components/CAppBar';
import CAccessToken from './components/CAccessToken';
import PHome from './pages/PHome';
import PMovies from './pages/PMovies';
import PActors from './pages/PActors';

const App = () => {

  return (
        <div className="App">
            <CAppBar />
            <CAccessToken />
            <Switch>
                <Route path="/" component={PHome} exact />
                <Route path="/movies" component={PMovies} />
                <Route path="/actors" component={PActors} />
            </Switch>
        </div>
    );
}

export default App;