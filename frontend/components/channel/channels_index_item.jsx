import React from 'react';

class ChannelsIndexItem extends React.Component {
    render() {
        debugger
        const { channel, select, className } = this.props;
        return (
            <li onClick={select} className={className}>
                { channel.name }
            </li>
        )
    }
}

export default ChannelsIndexItem;