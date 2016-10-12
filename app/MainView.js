import React, { Component, PropTypes } from 'react'
import { 
  AsyncStorage,
  Modal,
  View,
 } from 'react-native'

import RegisterView from './RegisterView'
import VerifyView from './VerifyView'
import VideoList from './VideoList'
import Eventx from 'react-native-simple-events'
import CameraView from './CameraView'
import { Button } from 'react-native-elements'

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
    
    this.showCamera = this.showCamera.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);

  }
  
  componentWillUnmount() { 
    Eventx.rm('onRegistered', ID) 
    Eventx.rm('onVerified', ID) 
  }
  
  showCamera() {
    this.setState({ cameraVisible: true });
  }

  showImagePicker() {
    this.setState({ imagePickerVisible: true });
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
      cameraVisible: false,
      imagePickerVisible: false,
    }
  }
  
  render() {
    if (this.state.username) {
      return (this.state.pass ? 
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1, }} >
            <VideoList />
          </View>
          <View style={{ backgroundColor:"#3b5998", padding: 10, flex: -1, flexDirection: 'row' }}  >
            <View style={{ flex: 1 }} >
              <Button raised backgroundColor="#397af8" icon={{ name: 'collections' }} 
                title='PICK FROM LIBRARY' small onPress={ this.showImagePicker }
                buttonStyle={{ flex: 1, marginLeft: 0, marginRight: 5, }}
                />
            </View>
            <View style={{ flex: 1 }} >
              <Button raised backgroundColor="#397af8" icon={{ name: 'videocam' }} 
                title='TAKE VIDEO' small onPress={ this.showcamera }
                buttonStyle={{ flex: 1, marginLeft: 5, marginRight: 0,  }}
                />
            </View>
          </View>
          <Modal animationType={ "slide" } transparent={ false } visible={ this.state.cameraVisible } >
            <CameraView />
          </Modal>
        </View>
        : <VerifyView username={ this.state.username } pass={ this.state.pass } />)
    }
    return (
      <RegisterView />
    )
  }
  
}

