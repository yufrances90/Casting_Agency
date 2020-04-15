import React, { Component } from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';

import CActorForm from './CActorForm';

class CActorDialog extends Component {

    render() {

        const {
            dialogTitle,
            toOpenDialog,
            closeActorDialog,
            handleSubmitForm,
            changeValue,
            actorName,
            age,
            imageLink
        } = this.props;

        return (
            <Dialog
                open={toOpenDialog}
            >
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <CActorForm 
                        changeValue={changeValue}
                        actorName={actorName}
                        age={age}
                        imageLink={imageLink}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={closeActorDialog}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="primary" 
                        onClick={handleSubmitForm}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CActorDialog;