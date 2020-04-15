import React, { Component } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogActions,
    Button, 
    DialogContent
} from '@material-ui/core';

import CMovieForm from './CMovieForm';

class CMovieDialog extends Component {

    render() {

        const { 
            toOpenDialog, 
            handleCloseNewMovieDialog,
            releasedDate, 
            movieName, 
            imageLink,
            handleDateChange,
            handleValueChanage,
            handleFormSubmission,
            dialogTitle
        } = this.props;

        return (
            <Dialog
                open={toOpenDialog}
                onClose={handleCloseNewMovieDialog}
            >
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <CMovieForm 
                        handleDateChange={handleDateChange}
                        releasedDate={releasedDate}
                        imageLink={imageLink}
                        movieName={movieName}
                        handleValueChanage={handleValueChanage}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewMovieDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFormSubmission} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
       );
    }
}

export default CMovieDialog;