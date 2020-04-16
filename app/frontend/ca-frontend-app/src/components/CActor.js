import React from 'react';

import {
    Grid
} from '@material-ui/core';

import CActorCard from './CActorCard';

const CActor = (props) => {

    const { 
        actor, 
        handleDeleteActorById 
    } = props;
     
    return (
        <div className="main">
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <CActorCard 
                        actor={actor}
                        handleDeleteActorById={handleDeleteActorById}
                    />
                </Grid>
            </Grid>
        </div>
    );
    
}

export default CActor;