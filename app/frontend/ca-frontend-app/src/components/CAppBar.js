import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

const CAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{background: "black"}}>
                <Typography variant="title">
                    Casting Agency
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default CAppBar;