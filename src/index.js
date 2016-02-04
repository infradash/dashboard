import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import store from './stores/index';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const target = document.getElementById('root');
const node = (
    <Root store={store} />
);

ReactDOM.render(node, target);
