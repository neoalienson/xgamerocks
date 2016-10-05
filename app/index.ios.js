import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import VideoList from './VideoList';
import VerifyView from './VerifyView';
import RegisterView from './RegisterView';
import MainView from './MainView';

class xgamerocks extends Component {
  render() {
    return (
      <View style={{ marginTop: 20, flex: 1 }} >
        <MainView  />
      </View>
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);

