import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    LinearProgress
} from '@material-ui/core';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    AccountCircle, MovieSharp, RecentActorsSharp
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

import { Auth0Context } from '../contexts/auth0-context'; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 8
    },
    title: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const CAppBar = () => {

    const styles = useStyles();

    const { isLoading, user, loginWithRedirect, logout } = useContext(Auth0Context);

    return (
        <AppBar position="static">
            <Toolbar style={{background: "black"}}>
                <NavLink to='/' exact className="app-link">
                    <Typography variant="h6" className="appbar-title">
                        Casting Agency
                    </Typography>
                </NavLink>
                <span className={styles.root}>
                    <NavLink to='/movies' className="app-link">
                        <Button  style={{"color": "#834bff"}}>
                            <MovieSharp />
                            Movies
                        </Button>
                    </NavLink>
                    <NavLink to='/actors' className="app-link">
                        <Button  style={{"color": "#4dabf5"}}>
                            <RecentActorsSharp />
                            Actors
                        </Button>
                    </NavLink>
                </span>
                {!isLoading && !user && (
                    <Button color="inherit" onClick={loginWithRedirect}>
                        Log in
                    </Button>
                )}
                {!isLoading && user && (
                    <IconButton 
                        color="inherit" 
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        <AccountCircle />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default CAppBar;