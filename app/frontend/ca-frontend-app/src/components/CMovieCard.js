import React, { Component } from 'react';

import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    CardActions,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class CMovieCard extends Component {

    useStyles() {
        return makeStyles({
            root: {
                maxWidth: 345,
            },
            media: {
                maxHeight: 100
            },
        });
    }

    render() {

        const classes = this.useStyles();

        const { movie } = this.props;

        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={movie.title}
                        height="400"
                        image={movie.image_link}
                        title={movie.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Released Date: { movie.release_date }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <EditIcon />
                        Edit
                    </Button>
                    <Button size="small" color="secondary">
                        <DeleteIcon />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default CMovieCard;