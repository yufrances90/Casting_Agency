import React from 'react';

import { Fab, Grid } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import CActorDialog from './CActorDialog';

const CActors = (props) => {

    const {
        actorName,
        age,
        imageLink,
        gender,
        changeValue,
        toOpenDialog,
        openActorDialog,
        closeActorDialog,
        handleSubmitForm
    } = props;

    return (
        <div className="main">
            <Grid container>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                    <Fab
                        onClick={openActorDialog}
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            WebkitBoxShadow: 'none',
                            MozBoxShadow: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        <PersonAddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <CActorDialog 
                actorName={actorName}
                age={age}
                imageLink={imageLink}
                changeValue={changeValue}
                dialogTitle="Create New Actor"
                toOpenDialog={toOpenDialog}
                closeActorDialog={closeActorDialog}
                handleSubmitForm={handleSubmitForm}
                gender={gender}
            />
        </div>
    );
}

export default CActors;