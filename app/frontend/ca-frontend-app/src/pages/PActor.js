import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    handleGetActorDetails
} from '../actions/actors';
import CActor from '../components/CActor';

class PActor extends Component {

    state = {
        actorId: null
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