import React, { Component } from 'react';

import CActors from '../components/CActors';

class PACtors extends Component {

    state = {
        actorName: "",
        age: 0,
        imageLink: "",
        gender: "",
        toOpenDialog: false
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    openActorDialog() {
        this.setState({
            toOpenDialog: true
        });
    }

    closeActorDialog() {
        this.setState({
            toOpenDialog: false
        })
    }

    handleSubmitForm() {

        const {
            actorName,
            age,
            imageLink,
            gender
        } = this.state;

        const actor = {
            name: actorName,
            age,
            'image_link': imageLink,
            gender
        };

        console.log(actor);

        this.closeActorDialog();
    }

    render() {

        const {
            actorName,
            age,
            imageLink,
            gender,
            toOpenDialog
        } = this.state;

        return (
            <CActors 
                actorName={actorName}
                age={age}
                imageLink={imageLink}
                gender={gender}
                changeValue={this.changeValue.bind(this)}
                toOpenDialog={toOpenDialog}
                openActorDialog={this.openActorDialog.bind(this)}
                closeActorDialog={this.closeActorDialog.bind(this)}
                handleSubmitForm={this.handleSubmitForm.bind(this)}
            />
        );
    }
}

export default PACtors;