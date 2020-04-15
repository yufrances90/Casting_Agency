import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import CMovie from '../components/CMovie';

import { 
    handleGetMovieDetails,
    handleDeleteMovie,
    handleUpdateMovie
} from '../actions/movies';


class PMovie extends Component {

    state = {
        releasedDate: new Date(),
        movieName: "",
        imageLink: "",
        toCreateMovie: false,
        movieId: 0
    }

    handleAddNewMovieButtonClick() {
        this.setState({
            toCreateMovie: true
        });
    }

    handleCloseNewMovieDialog() {
        this.setState({
            toCreateMovie: false
        });
    }

    handleDateChange(date) {
        this.setState({
            releasedDate: date
        })
    }

    handleValueChanage(key, value) {
        this.setState({
            [key]: value
        });
    }

    removeMovieById(movieId) {

        this.props.dispatch(handleDeleteMovie(movieId));

        this.props.history.goBack();
    }

    handleFormSubmission() {

        const {
            releasedDate,
            movieName,
            imageLink,
            movieId
        } = this.state;

        const year = `${releasedDate.getFullYear()}`;

        const iMonth = releasedDate.getMonth() + 1;
        const month = iMonth < 10? `0${iMonth}` : iMonth;

        const date = releasedDate.getDate();

        const formObj = {
            'title': movieName,
            'release_date': `${year}-${month}-${date}`,
            'image_link': imageLink
        }

        this.props.dispatch(handleUpdateMovie(movieId, formObj));

        this.handleCloseNewMovieDialog();
    }

    componentDidMount() {
        
        const { movieId } = this.props.location.state;

        this.setState({
            movieId
        });

        this.props.dispatch(handleGetMovieDetails(movieId));
    }

    render() {

        const { movie } = this.props;

        const { releasedDate, movieName, imageLink, toCreateMovie } = this.state;

        if (!movie) {
            return (
                <LinearProgress />
            );
        }

        return (
            <div className="main">
                <CMovie 
                    movie={movie}
                    removeMovieById={this.removeMovieById.bind(this)}
                    handleDateChange={this.handleDateChange.bind(this)}
                    releasedDate={releasedDate}
                    imageLink={imageLink}
                    movieName={movieName}
                    handleValueChanage={this.handleValueChanage.bind(this)}
                    handleFormSubmission={this.handleFormSubmission.bind(this)}
                    toCreateMovie={toCreateMovie}
                    handleAddNewMovieButtonClick={this.handleAddNewMovieButtonClick.bind(this)}
                    handleCloseNewMovieDialog={this.handleCloseNewMovieDialog.bind(this)}
                />
            </div>
        );
    }
}

function mapStateToProps({ actors, movies }) {

    return {
        actors,
        movies,
        movie: movies.movie
    }
}

export default connect(mapStateToProps)(PMovie);