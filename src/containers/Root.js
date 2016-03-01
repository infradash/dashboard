import React from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';

export default class Root extends React.Component {

    static propTypes = {
        store: React.PropTypes.object.isRequired
    };

    render () {
        return (
            <div>
                <Provider store={this.props.store}>
                      {routes}
                </Provider>
            </div>
        );
    }
}
