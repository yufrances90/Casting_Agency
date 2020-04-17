import React, { Component } from 'react';

import {
    Grid
} from '@material-ui/core';

import CMovieTabs from './CMovieTabs';
import CMoviePanel from './CMoviePanel';


class CShows extends Component {

    render() {

        const { 
            movies,
            setSelectedMovieId,
            movieId,
            getActorListByMovie
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
                            getActorListByMovie={getActorListByMovie}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CShows;