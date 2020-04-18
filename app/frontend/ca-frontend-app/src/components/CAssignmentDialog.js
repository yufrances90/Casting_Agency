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
        actors,
        setSelectedActorIds,
        handleSubmit 
    } = props;

    return (

        <Dialog open={toOpenDialog}>
            <DialogTitle>
                Assgn Actors to Movie
            </DialogTitle>
            <DialogContent>
                <CTransferList 
                    otherActors={otherActors}
                    actors={actors}
                    setSelectedActorIds={setSelectedActorIds}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary"
                    onClick={toggleDialog}
                >
                    Cancel
                </Button>
                <Button 
                    color="secondary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CAssignmentDialog;