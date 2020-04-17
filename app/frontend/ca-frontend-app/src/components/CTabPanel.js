import React, { Component } from 'react';

import {
    Typography,
    Box
} from '@material-ui/core';

class CTabPanel extends Component {
    render() {

        const { children, value, index, ...other } = this.props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }
}

export default CTabPanel;