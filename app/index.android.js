import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import VideosView from './VideosView';

class xgamerocks extends Component {
  render() {
    return (
      <VideosView />
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);
