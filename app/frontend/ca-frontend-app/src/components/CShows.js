import React, { Component } from 'react';

import {
    Grid
} from '@material-ui/core';

import CMovieTabs from './CMovieTabs';
import CTabPanel from './CTabPanel';


class CShows extends Component {

    render() {

        const { 
            movies,
            setSelectedMovieId,
            movieId 
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
                        {movies.map(movie => (
                            <CTabPanel value={movieId} index={movie.id}>
                                {movie.id}
                            </CTabPanel>
                        ))}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CShows;