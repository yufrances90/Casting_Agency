import React, { Component } from 'react';
import CMovieCard from './CMovieCard';

class CMovie extends Component {

    render() {

        const { movie, removeMovieById } = this.props;

        return (
            <div>
                <CMovieCard 
                    movie={movie}
                    removeMovieById={removeMovieById}
                />
            </div>
        );
    }
}

export default CMovie;