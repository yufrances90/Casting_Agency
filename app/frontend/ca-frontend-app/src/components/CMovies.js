import React, { Component } from 'react';

import {
    Grid,
    Button
} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';

import CNewMovieDialog from './CNewMovieDialog';
import CMovieGridList from './CMovieGridList';

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
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={handleAddNewMovieButtonClick}
                        >
                            <QueueIcon />
                            Add New Movie
                        </Button>
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
                    <Grid item xs={12}>
                        {
                            movies.list.length > 0 && (
                                <CMovieGridList 
                                    movieList={movies.list}
                                />
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CMovies;