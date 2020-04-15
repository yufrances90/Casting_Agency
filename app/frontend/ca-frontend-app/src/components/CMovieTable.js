import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
});

const CMovieTable = (props) => {

    const classes = useStyles();

    const handleDeleteButtonClick = (movieId) => {
        props.handleDeleteMovie(movieId);
    }

    const { movieList } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="movie table">
                <TableHead>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell align="left"> Name </TableCell>
                        <TableCell align="left"> Release Date</TableCell>
                        <TableCell align="left"> Actions </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        movieList.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell component="th" scope="row">
                                    {movie.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Link
                                        to="/"
                                        className="app-link"
                                    >
                                        {movie.title}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {movie.release_date}
                                </TableCell>
                                <TableCell>
                                    <IconButton 
                                        color="secondary"
                                        onClick={e => handleDeleteButtonClick(movie.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CMovieTable;