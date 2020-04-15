import React from 'react'; 
import { Route, Switch } from 'react-router-dom';

import CAppBar from './components/CAppBar';
import PHome from './pages/PHome';
import PMovies from './pages/PMovies';
import PActors from './pages/PActors';
import ProtectedRoute from './pages/ProtectedRoute';
import PMovie from './pages/PMovie';

const App = () => {

    return (
        <div className="App">
            <CAppBar />
            <Switch>
                <Route exact path="/" component={PHome}  />
                <ProtectedRoute path="/actors" component={PActors} />
                <ProtectedRoute path="/movies" component={PMovies} />
                <ProtectedRoute path="/movie" component={PMovie} />
            </Switch>
        </div>
    );
}

export default App;