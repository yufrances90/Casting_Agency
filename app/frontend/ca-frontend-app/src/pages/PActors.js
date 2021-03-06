import React, { Component } from 'react';

import { connect } from 'react-redux';

import CActors from '../components/CActors';

import {
    handleGetAllActors,
    handleSaveActor
} from '../actions/actors';

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
            age: parseInt(age),
            'image_link': imageLink,
            gender
        };

        this.props.dispatch(handleSaveActor(actor));

        this.resetForm();

        this.closeActorDialog();
    }

    resetForm() {
        this.setState({
            actorName: "",
            age: 0,
            imageLink: "",
            gender: "",
            toOpenDialog: false
        });
    }

    componentDidMount() {
        this.props.dispatch(handleGetAllActors());
    }

    navigateToActorDetailsPage(actorId) {
        this.props.history.push({
            pathname: "/actor",
            state: {
                actorId
            }
        });
    }

    render() {

        const {
            actorName,
            age,
            imageLink,
            gender,
            toOpenDialog
        } = this.state;

        const { actors } = this.props;

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
                actorList={actors.list}
                navigateToActorDetailsPage={this.navigateToActorDetailsPage.bind(this)}
            />
        );
    }
}

function mapStateToProps({ actors, movies }) {

    return {
        actors,
        movies
    }
}

export default connect(mapStateToProps)(PACtors);