import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import VideosView from './VideoList';

class xgamerocks extends Component {
  render() {
    return (
      <VideosView
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);
