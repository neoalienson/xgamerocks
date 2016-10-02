import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import VideoList from './VideoList';

class xgamerocks extends Component {
  render() {
    return (
      <View style={{ marginTop: 20, flex: 1 }} >
        <VideoList  />
      </View>
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);

