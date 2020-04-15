import React, { Component } from 'react';

import { connect } from 'react-redux';

import CMovies from '../components/CMovies';

import { 
    handleGetAllMovies, 
    handleSaveMovie,
    handleDeleteMovie 
} from '../actions/movies';

class PMovies extends Component {

    state = {
        releasedDate: new Date(),
        movieName: "",
        imageLink: "",
        toCreateMovie: false
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

    handleDeleteMovie(movieId) {
        this.props.dispatch(handleDeleteMovie(movieId));
    }

    handleFormSubmission() {

        const {
            releasedDate,
            movieName,
            imageLink
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

        this.props.dispatch(handleSaveMovie(formObj));

        this.handleCloseNewMovieDialog();
    }
   
    componentDidMount() {
        this.props.dispatch(handleGetAllMovies());
    }

    render() {

        const { movies } = this.props;

        const { releasedDate, movieName, imageLink, toCreateMovie } = this.state;

        return (
            <CMovies 
                movies={movies}
                handleDateChange={this.handleDateChange.bind(this)}
                releasedDate={releasedDate}
                imageLink={imageLink}
                movieName={movieName}
                handleValueChanage={this.handleValueChanage.bind(this)}
                handleFormSubmission={this.handleFormSubmission.bind(this)}
                toCreateMovie={toCreateMovie}
                handleAddNewMovieButtonClick={this.handleAddNewMovieButtonClick.bind(this)}
                handleCloseNewMovieDialog={this.handleCloseNewMovieDialog.bind(this)}
                handleDeleteMovie={this.handleDeleteMovie.bind(this)}
            />
        );
    }
}

function mapStateToProps({ actors, movies }) {

    return {
        actors,
        movies
    }
}

export default connect(mapStateToProps)(PMovies);