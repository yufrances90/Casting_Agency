import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
        GridListTileBar,
        IconButton,
        GridListTile,
        GridList 
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 1000,
        height: 600
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
}));

const CActorGridList = (props) => {

    const classes = useStyles();

    const { actorList, navigateToActorDetailsPage } = props;

    return (
        <GridList cellHeight={400} className={classes.gridList} cols={10}>
            {actorList.map((actor) => (
                <GridListTile 
                    key={actor.name} 
                    cols={Math.floor(Math.random() * 4 / 2 ) * 2}
                >
                    <img src={actor.image_link} alt={actor.name} />
                    <GridListTileBar
                        title={actor.name}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={
                            <IconButton 
                                aria-label={`star ${actor.name}`}
                                onClick={e => navigateToActorDetailsPage(actor.id)}
                            >          
                                <MoreVertIcon className={classes.title} />
                          </IconButton>
                        }
                    />
                </GridListTile>
            ))}
        </GridList>
    );
}

export default CActorGridList;