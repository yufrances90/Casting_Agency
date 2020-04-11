import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
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

    const auth0 = useContext(Auth0Context);

    console.log(auth0);

    return (
        <AppBar position="static">
            <Toolbar style={{background: "black"}}>
                <Typography variant="h6" className={useStyles().title}>
                    Casting Agency
                </Typography>
                <IconButton color="inherit" onClick={auth0.loginWithRedirect}>
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default CAppBar;