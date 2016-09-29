import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import VideoList from './VideoList';

class xgamerocks extends Component {
  render() {
    return (
      <VideoList
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);
