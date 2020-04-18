import React, { Component } from 'react';

import { 
    LinearProgress, 
    Grid
} from '@material-ui/core';

import CTabPanel from './CTabPanel';
import CActorCard from './CActorCard';


class CMoviePanel extends Component {
    
    render() {

        const { movieId, actors, isReady } = this.props;

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