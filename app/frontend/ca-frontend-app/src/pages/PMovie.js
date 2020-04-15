import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import CMovie from '../components/CMovie';

import { 
    handleGetMovieDetails
} from '../actions/movies';


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
            <div className="main">
                <CMovie 
                    movie={movie}
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