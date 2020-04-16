import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab
} from '@material-ui/core';

class CMovieTabs extends Component {

    useStyles() {

        return makeStyles((theme) => ({
            root: {
                flexGrow: 1,
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                height: 224,
            },
            tabs: {
                borderRight: `1px solid ${theme.palette.divider}`,
            },
        }));
    }

    render() {

        const { 
            movies, 
            movieId,
            setSelectedMovieId 
        } = this.props;

        const classes = this.useStyles();

        return (
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={movieId}
                onChange={setSelectedMovieId}
                aria-label=""
                className={classes.tabs}
            >
                {movies.map(movie => (
                    <Tab 
                        label={movie.title}
                        value={movie.id}
                        key={movie.id}
                    />
                ))}
            </Tabs>
        );
    }
}

export default CMovieTabs;