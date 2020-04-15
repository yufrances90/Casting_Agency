import React, { Component } from 'react';

import { connect } from 'react-redux';

import { 
    handleGetMovieDetails
} from '../actions/movies';
import { LinearProgress } from '@material-ui/core';

class PMovie extends Component {

    componentDidMount() {
        
        const { movieId } = this.props.location.state;

        this.props.dispatch(handleGetMovieDetails(movieId));
    }

    render() {

        const { movie } = this.props;

        if (!movie) {
            return (
                <LinearProgress />
            );
        }

        return (
            <div>
                {JSON.stringify(movie)}
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