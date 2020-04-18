import React, { Component } from 'react';

import {
    LinearProgress
} from '@material-ui/core';

import { connect } from 'react-redux';

import CShows from '../components/CShows';

import MoviesAPI from '../api/MoviesAPI';
import ActorsAPI from '../api/ActorsAPI';

import { handleUpdateCastTeamByMovie } from '../actions/shows';

class PShows extends Component {

    state = {
        movies:[],
        movieId: null,
        toOpenDialog: false
    }

    async getMovieList() {

        const res = await MoviesAPI.getMovies();

        const { data } = res;

        this.setState({
            movies: data.movies
        });
    }

    async getActorListsByMovie(movieId) {

        const res = await ActorsAPI.getActorsByMovie(movieId);

        const { data } = res;

        return {
            actors: data.actors,
            otherActors: data["other_actors"]
        };
    }

    setSelectedMovieId(_, movieId) {
        this.setState({
            movieId
        });
    }

    toggleDialog() {

        const { toOpenDialog } = this.state;

        this.setState({
            toOpenDialog: !toOpenDialog
        });
    }

    handleSubmitRequest(movieId, actorIds) {

        this.props.dispatch(handleUpdateCastTeamByMovie(movieId, {
            "actor_ids": actorIds
        }));

        this.toggleDialog();
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

        const { movies, movieId, toOpenDialog } = this.state;

        if (!movies || movies.length === 0 || !movieId) {
            return <LinearProgress />
        }
        
        return (
           <div>
                <CShows 
                    movies={movies}
                    setSelectedMovieId={this.setSelectedMovieId.bind(this)}
                    movieId={movieId}
                    getActorListsByMovie={this.getActorListsByMovie.bind(this)}
                    toOpenDialog={toOpenDialog}
                    toggleDialog={this.toggleDialog.bind(this)}
                    handleSubmitRequest={this.handleSubmitRequest.bind(this)}
                />
           </div>
        );
    }
}

function mapStateToProps({ actors, movies }) {

    return {
        actors,
        movies
    }
}

export default connect(mapStateToProps)(PShows);