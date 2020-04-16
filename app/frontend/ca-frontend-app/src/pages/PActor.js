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
        actorId: null
    }

    handleDeleteActorById(actorId) {

        this.props.dispatch(handleDeleteActor(actorId));

        this.props.history.goBack();
    }

    componentDidMount() {

        const { actorId } = this.props.location.state;

        this.setState({
            actorId
        });

        this.props.dispatch(handleGetActorDetails(actorId));
    }

    render() {

        const { actor } = this.props;

        return (
            <CActor 
                actor={actor}
                handleDeleteActorById={this.handleDeleteActorById.bind(this)}
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