import React from 'react';
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

    return (
        <AppBar position="static">
            <Toolbar style={{background: "black"}}>
                <Typography variant="h6" className={useStyles().title}>
                    Casting Agency
                </Typography>
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default CAppBar;