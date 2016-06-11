import React, {
  Component,
  PropTypes
} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Root from './root';

class setup extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(()=>{this.setState({isLoading: false})})
    }
  }
  render () {
    if (this.state.isLoading) {
      console.log('loading app')
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <Root/>
      </Provider>
    );
  }
}

export default setup;
