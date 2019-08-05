import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
    debugger
    let subscribedChannels = {};
    // state.entities.users[state.session.id].channel_ids.forEach( id => {
    state.entities.users[state.session.id].channel_ids.forEach( id => {
        debugger
        if (state.entities.channels[id]) {
            debugger
            subscribedChannels[id] = state.entities.channels[id];
        }
    });
    // if (state.ui.selected.id) {
    if (ownProps.location.pathname.includes('preview')) {
        // const previewedChannels = { [state.ui.selected.id]: state.entities.channels[state.ui.selected.id]};
        debugger
        let previewedChannels = {};
        if (state.entities.channels[ownProps.match.params.channelId]) {
            previewedChannels = { [ownProps.match.params.channelId]: state.entities.channels[ownProps.match.params.channelId]};
        }
        subscribedChannels = merge(previewedChannels, subscribedChannels);
    }
    debugger
    return {
        currentUser: state.entities.users[state.session.id],
        channels: Object.values(subscribedChannels),
        // selected: state.ui.selected.id || 1, 
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: userId => dispatch(getChannels(userId)),
    // selectChannel: channelId => dispatch(selectChannel(channelId)),
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentUser, getChannels, selected, selectChannel } = this.props;
        // getChannels().then(() => selectChannel(selected));
        getChannels();
    }

    select(id) {
        const { selectChannel } = this.props;
        return e => {
            // selectChannel(id);
            // if (this.props.location.pathname.includes('preview')) {
                this.props.history.push(`/home/${id}`);
            // } else {
                // this.props.history.push(`/home/${id}`)
            // }
        }
    }

    render() {
        // const { selected } = this.props;
        debugger
        return (
            <div className="index-container">
                <Link to='/add-channel' className="tooltip">Channels</Link>
                <Link className="create-channel" to='/create-channel'></Link>
                <ul className="channels-index">
                    {this.props.channels.map(channel => 
                        <ChannelsIndexItem key={channel.id} 
                            channel={channel}
                            select={this.select(channel.id)}
                            className={(channel.id == this.props.match.params.channelId) ? 'selected-channel' : 'unselected'}
                        />)}
                </ul>

            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex));