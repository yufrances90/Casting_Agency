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

    componentDidMount() {
        
        const { movieId } = this.props.location.state;

        this.props.dispatch(handleGetMovieDetails(movieId));
    }

    removeMovieById(movieId) {

        this.props.dispatch(handleDeleteMovie(movieId));
        
        this.props.history.goBack();
    }

    render() {

        const { movie } = this.props;

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