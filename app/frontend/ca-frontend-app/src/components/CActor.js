import React from 'react';

import {
    Grid, LinearProgress
} from '@material-ui/core';

import CActorCard from './CActorCard';
import CActorDialog from './CActorDialog';

const CActor = (props) => {

    const { 
        actor, 
        handleDeleteActorById,
        toOpenDialog,
        closeActorDialog,
        actorName, 
        age, 
        imageLink, 
        gender,
        changeValue,
        handleUpdateActorById
    } = props;

    if (!actor || !gender) {
        return <LinearProgress />
    }
     
    return (
        <div className="main">
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <CActorCard 
                        actor={actor}
                        handleDeleteActorById={handleDeleteActorById}
                        toggleDialog={closeActorDialog}
                    />
                </Grid>
            </Grid>
            <CActorDialog 
                toOpenDialog={toOpenDialog}
                closeActorDialog={closeActorDialog}
                actorName={actorName}
                age={age}
                imageLink={imageLink}
                gender={gender}
                changeValue={changeValue}
                handleSubmitForm={handleUpdateActorById}
            />
        </div>
    );
    
}

export default CActor;