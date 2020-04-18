import React, { Component } from 'react';

import { 
    LinearProgress, 
    Grid
} from '@material-ui/core';

import CTabPanel from './CTabPanel';
import CActorCard from './CActorCard';


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

    UNSAFE_componentWillReceiveProps(prevProps) {

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

        return (
            <CTabPanel 
                value={movieId} 
                index={movieId}
            >

                <Grid container justify="space-between">

                    {
                        actors.map(actor => (

                            <Grid 
                                item 
                                xs={4}
                                key={actor.id}
                            >
                                <CActorCard 
                                    actor={actor}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </CTabPanel>
        );
    }
}

export default CMoviePanel;