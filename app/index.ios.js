import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import VideosView from './VideosView';

class xgamerocks extends Component {
  render() {
    return (
      <View style={{ marginTop: 20, flex: 1 }} >
        <VideosView  />
      </View>
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);

