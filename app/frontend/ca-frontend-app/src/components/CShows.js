import React, { Component } from 'react';

import {
    Grid,
    Fab
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import CMovieTabs from './CMovieTabs';
import CMoviePanel from './CMoviePanel';
import CAssignmentDialog from './CAssignmentDialog';


class CShows extends Component {

    state = {
        actors: [],
        isReady: false,
        otherActors: [],
        selectedActorIds: [],
        toShow: true
    }

    async setActors() {

        this.setState({
            isReady: false
        });

        const { movieId, getActorListsByMovie } = this.props;

        const res = await getActorListsByMovie(movieId);

        this.setState({
            actors: res.actors,
            isReady: true,
            otherActors: res.otherActors,
            selectedActorIds: res.actors.map(actor => actor.id)
        });
    }

    setSelectedActorIds(selectedActors) {
        this.setState({
            selectedActorIds: selectedActors.map(actor => actor.id)
        });
    }

    componentDidMount() {

        this.setState({
            isReady: false
        });

        this.setActors();
    }

    handleSubmit() {

        const { movieId } = this.props;

        const { selectedActorIds } = this.state;

        this.props.handleSubmitRequest(movieId, selectedActorIds.join());
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

        const { 
            movies,
            setSelectedMovieId,
            movieId,
            toOpenDialog,
            toggleDialog
        } = this.props;

        const { 
            actors, 
            otherActors, 
            isReady, 
            selectedActorIds, 
            toShow 
        } = this.state;

        return (
            <div className="main">
                <Grid container>
                    <Grid item xs={3}>
                        <CMovieTabs 
                            movies={movies}
                            setSelectedMovieId={setSelectedMovieId}
                            movieId={movieId}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <CMoviePanel 
                            movieId={movieId}
                            actors={actors}
                            otherActors={otherActors}
                            isReady={isReady}
                        />
                         <Fab 
                            style={{
                                position: 'fixed',
                                top: '80vh',
                                right: '5vh',
                                backgroundColor: "#000000",
                                color: '#02bef7'
                            }}
                            onClick={toggleDialog}
                        >
                            <AssignmentIcon />
                        </Fab>
                        <CAssignmentDialog 
                            toOpenDialog={toOpenDialog}
                            toggleDialog={toggleDialog}
                            otherActors={otherActors}
                            actors={actors}
                            selectedActorIds={selectedActorIds}
                            setSelectedActorIds={this.setSelectedActorIds.bind(this)}
                            handleSubmit={this.handleSubmit.bind(this)}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CShows;