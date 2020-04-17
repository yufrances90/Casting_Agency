import React, { Component } from 'react';

import {
    LinearProgress
} from '@material-ui/core';

import CShows from '../components/CShows';

import MoviesAPI from '../api/MoviesAPI';
import ActorsAPI from '../api/ActorsAPI';

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

    async getActorListByMovie(movieId) {

        const res = await ActorsAPI.getActorsByMovie(movieId);

        const { data } = res;

        return data.actors;
    }

    setSelectedMovieId(_, movieId) {
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

            const movieId = movies[0].id

            this.setState({
                movieId
            });
        }
    }

    render() {

        const { movies, movieId } = this.state;

        if (!movies || movies.length === 0 || !movieId) {
            return <LinearProgress />
        }
        
        return (
           <div>
                <CShows 
                    movies={movies}
                    setSelectedMovieId={this.setSelectedMovieId.bind(this)}
                    movieId={movieId}
                    getActorListByMovie={this.getActorListByMovie.bind(this)}
                />
           </div>
        );
    }
}

export default PShows;