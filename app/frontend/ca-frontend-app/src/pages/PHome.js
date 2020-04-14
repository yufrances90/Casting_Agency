import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    Grid,
    LinearProgress
} from '@material-ui/core';

import { handleGetAllMovies, handleClearMovieList } from '../actions/movies';

class PHome extends Component {

    componentDidMount() {

        this.props.dispatch(handleClearMovieList());

        if (localStorage.getItem('access_token')) {
            this.props.dispatch(handleGetAllMovies());
        } 
    }

    render() {

        const { movies } = this.props;

        if (movies.list.length === 0) {
            return <LinearProgress />
        }

        return (
            <div>
                Hello from PHome {movies.list.length}
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

export default connect(mapStateToProps)(PHome);