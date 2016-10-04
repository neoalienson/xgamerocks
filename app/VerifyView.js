import React, { Component, 
  PropTypes } from 'react';
import { 
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ListView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
 } from 'react-native';
import Video from 'react-native-video';

export default class Verify extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      codeValid: false,
      videoLoaded: false,
      opacity: new Animated.Value(0),
    }
  }
  
  render() {
    return (
      <Animated.View style={ [ styles.container, { alignItems: 'center', opacity: this.state.opacity } ]} >
        <Video 
          repeat
          muted={ true }
          paused={ false }
          resizeMode="cover"
          onLoad={ () => {
            Animated.timing(this.state.opacity, {toValue: 1}).start();
          } }
          style={ [ styles.background,  ]}
          source={ require('./assets/video/lighthouse_p.mp4') } />
        <KeyboardAvoidingView behavior="position" >
          <View style={ styles.formView }>
          <Text style={ styles.textHero } >SMS Verification</Text>
          <TextInput style={ [ styles.textInput, { flex: 1 } ]}
            keyboardType="numeric"
            placeholder="0000000"
          />
          <Text style={ styles.textInfo } >Please enter verification code from SMS</Text>
          <TouchableOpacity 
            disabled={ this.state.codeValid }
            color={ this.state.codeValid ? 'white' : 'grey' }
            onPress={() => Alert.alert(
               'Alert Title',
               'Alert',
               [ {text: 'OK' } ]
              )
            }>
            <Text style={ styles.button } >Verify</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
  
}

var styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#3b5998',
    fontSize: 25,
    marginTop: 40,
    marginBottom: 40,
    padding: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  formView: {
    width: 300,
  },
  textHero: { 
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight : '800',
    fontSize : 40,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: 2,    
  },
  textInfo: { 
    backgroundColor: 'transparent',
    color: 'grey',
    marginTop : 10,
    fontSize : 16,
  },
  textInput: { 
    backgroundColor: 'white',
    height: 60,
    fontSize: 40,
    marginTop: 40,
    padding: 10,
    textAlign: 'center',
  },
  textPrefix: { 
    backgroundColor: 'transparent',
    color: 'black',
    height: 60,
    fontSize: 40,
    marginTop: 40,
    padding: 10,
  },
});
