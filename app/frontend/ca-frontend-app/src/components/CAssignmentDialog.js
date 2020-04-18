import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';

const CAssignmentDialog = (props) => {

    const { toOpenDialog, toggleDialog } = props;

    return (

        <Dialog open={toOpenDialog}>
            <DialogTitle>
                Assgn Actors to Movie
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary"
                    onClick={toggleDialog}
                >
                    Cancel
                </Button>
                <Button color="secondary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CAssignmentDialog;