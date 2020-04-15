import React, { Component } from 'react';
import CMovieCard from './CMovieCard';

class CMovie extends Component {

    render() {

        const { movie } = this.props;

        return (
            <div>
                <CMovieCard 
                    movie={movie}
                />
            </div>
        );
    }
}

export default CMovie;