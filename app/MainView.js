import React, { Component, PropTypes } from 'react';
import { 
  ActivityIndicator,
  Alert,
  Animated,
  AsyncStorage,
  Dimensions,
  Modal,
  View,
 } from 'react-native';

import RegisterView from './RegisterView';
import VerifyView from './VerifyView';
import VideoList from './VideoList';
import Events from 'react-native-simple-events';
  
export default class MainView extends Component {

  componentDidMount() {
//    AsyncStorage.removeItem('pass');
    AsyncStorage.getItem("username").then((value) =>{
      this.setState({"username":value})
    }).done();
    AsyncStorage.getItem("pass").then((value) =>{
      this.setState({"pass":value})
    }).done();
  }
  
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      username: null,
      pass: null,
    }
  }
  
  render() {
    if (this.state.username) {
      return (this.state.pass ? <VideoList /> : <VerifyView username={this.state.username} pass={this.state.pass} />);
    }
    return (
      <RegisterView />
    );
  }
  
}

