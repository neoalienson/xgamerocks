import React, { Component, PropTypes } from 'react'
import { 
   AsyncStorage,
  View,
 } from 'react-native'

import RegisterView from './RegisterView'
import VerifyView from './VerifyView'
import VideoList from './VideoList'
import Eventx from 'react-native-simple-events'

const ID = 'MainView'
  
export default class MainView extends Component {

  
  componentDidMount() {
    AsyncStorage.getItem("username").then((value) =>{
      this.setState({"username":value})
    }).done()
    AsyncStorage.getItem("pass").then((value) =>{
      this.setState({"pass":value})
    }).done()

    this.onRegistered = this.onRegistered.bind(this)
    Eventx.on('onRegistered', ID, this.onRegistered)
    this.onVerified = this.onVerified.bind(this)
    Eventx.on('onVerified', ID, this.onVerified)
  }
  
  componentWillUnmount() { 
    Eventx.rm('onRegistered', ID) 
    Eventx.rm('onVerified', ID) 
  }
  
  onRegistered(username) {
    this.setState({ username: username })
    AsyncStorage.setItem("username", username)
  }

  onVerified(pass) {
    this.setState({ pass: pass })
    AsyncStorage.setItem("pass", pass)
  }
  
  
  constructor(props, context) {
    super(props, context)
    
    this.state = {
      username: null,
      pass: null,
    }
  }
  
  render() {
    if (this.state.username) {
      return (this.state.pass ? 
        <VideoList /> 
        : <VerifyView username={this.state.username} pass={this.state.pass} />)
    }
    return (
      <RegisterView />
    )
  }
  
}

