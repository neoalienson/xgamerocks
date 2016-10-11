import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraView extends Component {

  constructor(props, context) {
    super(props, context)
    this.camera = null
    
    this.state = {
      isRecording: false
    }
    
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }
  
  render() {
    return (
        <Camera 
          ref={(cam) => { this.camera = cam }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.video}
        >
         { !this.state.isRecording &&
          <Text style={styles.capture} onPress={this.startRecording}>[CAPTURE]</Text>
          ||
          <Text style={styles.capture} onPress={this.stopRecording}>[STOP]</Text>
         }
        </Camera>
    )
  }

  startRecording() {
    if (!this.camera) return;
    this.camera.capture({mode: Camera.constants.CaptureMode.video})
      .then((data) => {} )
      .catch(err => {
        this.setState({ isRecording: false });
        console.error(err)
      });
      this.setState({ isRecording: true });
  }
                                                        
  stopRecording() {
    if (!this.camera) return;
    this.camera.stopCapture();
    this.setState({ isRecording: false });
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
