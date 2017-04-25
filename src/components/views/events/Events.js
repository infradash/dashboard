import React from 'react';
import LogStream from 'react-log-stream';

export default class EventsView extends React.Component {
  render() {
    const {
      url,
      mapping,
      matching
    } = this.props.viewConfig;
    const config = { matching, mapping };
    return (
      <LogStream
        url={url}
        config={config}
      />
    );
  }
}
