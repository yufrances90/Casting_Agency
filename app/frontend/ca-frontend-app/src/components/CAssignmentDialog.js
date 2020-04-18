import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';

import CTransferList from './CTransferList';

const CAssignmentDialog = (props) => {

    const { 
        toOpenDialog, 
        toggleDialog, 
        otherActors, 
        actors 
    } = props;

    return (

        <Dialog open={toOpenDialog}>
            <DialogTitle>
                Assgn Actors to Movie
            </DialogTitle>
            <DialogContent>
                <CTransferList />
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