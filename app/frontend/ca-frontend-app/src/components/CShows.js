import React, { Component } from 'react';

import {
    Grid,
    Fab
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import CMovieTabs from './CMovieTabs';
import CMoviePanel from './CMoviePanel';
import CAssignmentDialog from './CAssignmentDialog';


class CShows extends Component {

    render() {

        const { 
            movies,
            setSelectedMovieId,
            movieId,
            getActorListsByMovie,
            toOpenDialog,
            toggleDialog
        } = this.props;

        return (
            <div className="main">
                <Grid container>
                    <Grid item xs={3}>
                        <CMovieTabs 
                            movies={movies}
                            setSelectedMovieId={setSelectedMovieId}
                            movieId={movieId}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <CMoviePanel 
                            movieId={movieId}
                            getActorListsByMovie={getActorListsByMovie}
                        />
                         <Fab 
                            style={{
                                position: 'fixed',
                                top: '80vh',
                                right: '5vh',
                                backgroundColor: "#000000",
                                color: '#02bef7'
                            }}
                            onClick={toggleDialog}
                        >
                            <AssignmentIcon />
                        </Fab>
                        <CAssignmentDialog 
                            toOpenDialog={toOpenDialog}
                            toggleDialog={toggleDialog}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CShows;