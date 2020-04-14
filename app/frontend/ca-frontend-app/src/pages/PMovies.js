import React, { Component } from 'react';

import {
    Grid,
    LinearProgress
} from '@material-ui/core';

import { connect } from 'react-redux';

import { handleGetAllMovies } from '../actions/movies';

class PMovies extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetAllMovies());
    }

    render() {

        const { movies } = this.props;

        if (movies.list.length === 0) {
            return <LinearProgress />
        }

        return (
            <div class="main">
                Hello from PMovies
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


export default connect(mapStateToProps)(PMovies);