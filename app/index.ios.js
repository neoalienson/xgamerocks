import React, { Component } from 'react';
import { NavigatorIOS, AppRegistry } from 'react-native';

var VideosView = require('./VideosView');

class xgamerocks extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Welcome to XGameRocks',
          component: VideosView,
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('xgamerocks', () => xgamerocks);

module.exports = xgamerocks;