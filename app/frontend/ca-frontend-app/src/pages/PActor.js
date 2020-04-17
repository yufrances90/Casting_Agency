import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    handleGetActorDetails,
    handleDeleteActor,
    handleUpdateActor
} from '../actions/actors';
import CActor from '../components/CActor';

class PActor extends Component {

    state = {
        actorId: null,
        toOpenDialog: false,
        actorName: "",
        gender: "",
        imageLink: "",
        age: 0
    }

    handleDeleteActorById(actorId) {

        this.props.dispatch(handleDeleteActor(actorId));

        this.props.history.goBack();
    }

    handleUpdateActorById() {

        const {
            actorName,
            gender,
            imageLink,
            age,
            actorId,
        } = this.state;

        const updatedActor = {
            name: actorName,
            age: parseInt(age),
            'image_link': imageLink,
            gender
        };

        this.props.dispatch(handleUpdateActor(actorId, updatedActor));

        this.toggleDialog();
    }

    toggleDialog() {
        this.setState((prevState) => ({
            toOpenDialog: !prevState.toOpenDialog
        }));
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setDefaultValue() {

        const { actor } = this.props;

        const { name, age, gender, image_link } = actor;

        this.setState({
            actorName: name,
            age,
            gender,
            imageLink: image_link
        });
    }

    componentDidMount() {

        const { actorId } = this.props.location.state;

        this.setState({
            actorId
        });

        this.props.dispatch(handleGetActorDetails(actorId));
    }

    componentDidUpdate(prevProps) {
        if (this.props.actor !== prevProps.actor) {
            this.setDefaultValue();
        }
    }

    render() {

        const { actor } = this.props;

        const { toOpenDialog, actorName, age, imageLink, gender } = this.state;

        return (
            <CActor 
                actor={actor}
                handleDeleteActorById={this.handleDeleteActorById.bind(this)}
                toOpenDialog={toOpenDialog}
                closeActorDialog={this.toggleDialog.bind(this)}
                actorName={actorName}
                age={age}
                imageLink={imageLink}
                gender={gender}
                changeValue={this.changeValue.bind(this)}
                handleUpdateActorById={this.handleUpdateActorById.bind(this)}
            />
        );
    }
}

function mapStateToProps({ actors, movies }) {

    return {
        actors,
        movies,
        actor: actors.actor
    }
}

export default connect(mapStateToProps)(PActor);