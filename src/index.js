// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './root';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/visualization.css';

injectTapEventPlugin();

ReactDOM.render(<Root />, document.getElementById('root'));
