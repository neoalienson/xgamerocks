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

  
export default class MainView extends Component {

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) =>{
      this.setState({"username":value})
    }).done();
    AsyncStorage.getItem("password").then((value) =>{
      this.setState({"password":value})
    }).done();
  }
  
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      username: null,
      password: null,
    }
  }
  
  render() {
    if (this.state.username) {
      return (this.state.password ? <MainView /> : <VerifyView />);
    }
    return (
      <RegisterView />
    );
  }
  
}

