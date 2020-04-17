import React, { Component } from 'react';

import { LinearProgress } from '@material-ui/core';

import CTabPanel from './CTabPanel';


class CMoviePanel extends Component {

    state = {
        actors: [],
        isReady: false
    }

    async setActors() {

        this.setState({
            isReady: false
        });

        const { movieId, getActorListByMovie } = this.props;

        const actors = await getActorListByMovie(movieId);

        this.setState({
            actors,
            isReady: true
        });
    }

    async componentDidMount() {

        this.setState({
            isReady: false
        });

        await this.setActors();
    }

    componentWillReceiveProps(prevProps) {

        if (prevProps.movieId !== this.props.movieId) {

            this.setState({
                isReady: false
            });
        } 
    }

    componentDidUpdate(prevProps) {

        if (prevProps.movieId !== this.props.movieId) {
            this.setActors();
        } 
    }
    
    render() {

        const { movieId } = this.props;

        const { actors, isReady } = this.state;

        if (!isReady) {
            return <LinearProgress />
        }

        console.log(actors);

        return (
            <CTabPanel value={movieId} index={movieId}>
                {movieId}
            </CTabPanel>
        );
    }
}

export default CMoviePanel;