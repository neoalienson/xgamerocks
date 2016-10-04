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
  TouchableHighlight,
  View,
 } from 'react-native';
import Video from 'react-native-video';
import Styles from './Styles';

export default class RegisterView extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      videoLoaded: false,
      opacity: new Animated.Value(0),
    }
  }
  
  render() {
    return (
      <Animated.View style={ [ Styles.container, { alignItems: 'center', opacity: this.state.opacity } ]} >
        <Video 
          repeat
          muted={ true }
          paused={ false }
          resizeMode="cover"
          onLoad={ () => {
            Animated.timing(this.state.opacity, {toValue: 1}).start();
          } }
          style={ [ Styles.background,  ]}
          source={ require('./assets/video/lighthouse_p.mp4') } />
        <KeyboardAvoidingView behavior="position" >
          <View style={ Styles.formView }>
          <Text style={ Styles.textHero } >Welcome to XGameROCKS!</Text>
          <TextInput style={ Styles.textInput }
            keyboardType="phone-pad"
            placeholder="8528888888"
          />
          <Text style={ Styles.textInfo } >Enter your phone numbers above to verify</Text>
          <TouchableHighlight onPress={() => Alert.alert(
               'Alert Title',
               'Alert',
               [ {text: 'OK' } ]
              )
            }>
            <Text style={ Styles.button } >Verify</Text>
          </TouchableHighlight>
        </View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
  
}

var styles = StyleSheet.create({
});
