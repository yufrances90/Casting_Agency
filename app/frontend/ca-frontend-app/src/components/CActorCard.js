import React, { Component } from 'react';

import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    CardActions,
    Grid,
    IconButton,
    LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class CActorCard extends Component {

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

    formatGender(gender) {
        return gender === "F"? "Female" : "Male";
    }

    render() {

        const classes = this.useStyles();

        const { 
            actor, 
            handleDeleteActorById,
            toggleDialog 
        } = this.props;

        if (!actor) {
            return <LinearProgress />
        }

        return (
           <Card className={classes.root}>
               <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={actor.name}
                        height="350"
                        image={actor.image_link}
                        title={actor.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {actor.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Age: { actor.age } Gender: { this.formatGender(actor.gender) }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid item xs={10}>
                        </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="secondary"
                            onClick={e => handleDeleteActorById(actor.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={e => toggleDialog()}
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                </CardActions>
            </Card>
        );
    }
}

export default CActorCard;