import React, { Component } from 'react';

import CMovieCard from './CMovieCard';
import CMovieDialog from './CMovieDialog';

class CMovie extends Component {

    render() {

        const { 
            movie, 
            removeMovieById,
            toCreateMovie,
            handleCloseNewMovieDialog,
            handleDateChange,
            releasedDate,
            imageLink,
            movieName,
            handleValueChanage,
            handleFormSubmission,
            handleAddNewMovieButtonClick 
        } = this.props;

        return (
            <div>
                <CMovieCard 
                    movie={movie}
                    removeMovieById={removeMovieById}
                    handleAddNewMovieButtonClick={handleAddNewMovieButtonClick}
                />
                <CMovieDialog 
                    toOpenDialog={toCreateMovie}
                    handleCloseNewMovieDialog={handleCloseNewMovieDialog}
                    handleDateChange={handleDateChange}
                    releasedDate={releasedDate}
                    imageLink={imageLink}
                    movieName={movieName}
                    handleValueChanage={handleValueChanage}
                    handleFormSubmission={handleFormSubmission}
                    dialogTitle="Edit Movie Details"
                />
            </div>
        );
    }
}

export default CMovie;