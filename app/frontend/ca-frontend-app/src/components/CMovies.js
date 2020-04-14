import React, { Component } from 'react';

import {
    Grid,
    Button,
    Fab
} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';

import CNewMovieDialog from './CNewMovieDialog';
import CMovieGridList from './CMovieGridList';
import CMovieTable from './CMovieTable';

class CMovies extends Component {

    render() {

        const { 
            releasedDate, 
            handleDateChange, 
            movieName, 
            imageLink,
            handleValueChanage,
            handleFormSubmission,
            handleAddNewMovieButtonClick,
            handleCloseNewMovieDialog,
            toCreateMovie,
            movies
        } = this.props;

        return (
            <div className="main">
                <Grid container spacing={2}> 
                    <Grid item xs={12}>
                        {
                            movies.list.length > 0 && (
                                <CMovieGridList 
                                    movieList={movies.list}
                                />
                            )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            movies.list.length > 0 && (
                                <CMovieTable
                                    movieList={movies.list}
                                />
                            )
                        }
                    </Grid>
                    <Grid item xs={10}>
                    </Grid>
                    <Grid item xs={2}>
                        <Fab  
                            style={{
                                backgroundColor: "#000000",
                                color: "#ffffff"
                            }}
                            onClick={handleAddNewMovieButtonClick}
                        >
                            <QueueIcon />
                        </Fab>
                        <CNewMovieDialog 
                            toOpenDialog={toCreateMovie}
                            handleCloseNewMovieDialog={handleCloseNewMovieDialog}
                            handleDateChange={handleDateChange}
                            releasedDate={releasedDate}
                            imageLink={imageLink}
                            movieName={movieName}
                            handleValueChanage={handleValueChanage}
                            handleFormSubmission={handleFormSubmission}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CMovies;