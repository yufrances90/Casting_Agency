import React, { Component } from 'react';

import {
    Grid,
    Fab
} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';

import CMovieDialog from './CMovieDialog';
import CMovieGridList from './CMovieGridList';
import CMovieTable from './CMovieTable';

import { checkPermisson } from '../utils/helpers';

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
            movies,
            handleDeleteMovie
        } = this.props;

        return (
            <div className="main">
                <Grid container spacing={2}> 
                    <Grid item xs={11}>
                        {
                            movies.list.length > 0 && (
                                <CMovieGridList 
                                    movieList={movies.list}
                                />
                            )
                        }
                    </Grid>
                    <Grid item xs={1}>
                        {checkPermisson("post:movies") && (
                            <Fab  
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#000000",
                                    WebkitBoxShadow: 'none',
                                    MozBoxShadow: 'none',
                                    boxShadow: 'none'
                                }}
                                onClick={handleAddNewMovieButtonClick}
                            >
                                <QueueIcon />
                            </Fab>
                        )}
                        <CMovieDialog 
                            toOpenDialog={toCreateMovie}
                            handleCloseNewMovieDialog={handleCloseNewMovieDialog}
                            handleDateChange={handleDateChange}
                            releasedDate={releasedDate}
                            imageLink={imageLink}
                            movieName={movieName}
                            handleValueChanage={handleValueChanage}
                            handleFormSubmission={handleFormSubmission}
                            dialogTitle="Create New Movie"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            movies.list.length > 0 && (
                                <CMovieTable
                                    movieList={movies.list}
                                    handleDeleteMovie={handleDeleteMovie}
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