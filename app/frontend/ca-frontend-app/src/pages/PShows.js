import React, { Component } from 'react';

import {
    LinearProgress
} from '@material-ui/core';

import CShows from '../components/CShows';

import MoviesAPI from '../api/MoviesAPI';

class PShows extends Component {

    state = {
        movies:[],
        movieId: null
    }

    async getMovieList() {

        const res = await MoviesAPI.getMovies();

        const { data } = res;

        this.setState({
            movies: data.movies
        });
    }

    setSelectedMovieId(_, movieId) {

        console.log(movieId);

        this.setState({
            movieId
        });
    }

    componentDidMount() {
        this.getMovieList();
    }

    componentDidUpdate(prevProps, prevState) {

        const { movies } = this.state;

        if (prevState.movies !== movies) {
            this.setState({
                movieId: movies[0].id
            });
        }
    }

    render() {

        const { movies, movieId } = this.state;

        if (!movies || movies.length === 0 || !movieId) {
            return <LinearProgress />
        }
        
        return (
            <CShows 
                movies={movies}
                setSelectedMovieId={this.setSelectedMovieId.bind(this)}
                movieId={movieId}
            />
        );
    }
}

export default PShows;