import React from 'react';
import LogStream from 'react-log-stream';

export default class EventsView extends React.Component {
  render() {
    return (
      <LogStream {...this.props.viewConfig}/>
    );
  }
}
