import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@material-ui/core';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    AccountCircle
} from '@material-ui/icons';

import { Auth0Context } from '../contexts/auth0-context'; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const CAppBar = () => {

    const { isLoading, user, loginWithRedirect, logout } = useContext(Auth0Context);

    return (
        <AppBar position="static">
            <Toolbar style={{background: "black"}}>
                <Typography variant="h6" className={useStyles().title}>
                    Casting Agency
                </Typography>
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