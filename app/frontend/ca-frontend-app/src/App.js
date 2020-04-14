import React from 'react'; 
import { Route, Switch } from 'react-router-dom';

import CAppBar from './components/CAppBar';
import PHome from './pages/PHome';
import PMovies from './pages/PMovies';
import PActors from './pages/PActors';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {

    return (
        <div className="App">
            <CAppBar />
            <Switch>
                <Route path="/" component={PHome} exact />
                <ProtectedRoute path="/actors" component={PActors} />
                <ProtectedRoute path="/movies" component={PMovies} />
            </Switch>
        </div>
    );
}

export default App;