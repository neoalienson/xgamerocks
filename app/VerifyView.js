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
import Styles from './Styles';
import { Button } from 'react-native-elements';

export default class Verify extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      codeValid: false,
      videoLoaded: false,
      opacity: new Animated.Value(0),
      isLoading: false,
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
          <Text style={ Styles.textHero } >SMS Verification</Text>
          <TextInput style={ [ Styles.textInput, { flex: 1 } ]}
            keyboardType="numeric"
            placeholder="0000000"
            editable={!this.state.isLoading}
          />
          <Text style={ Styles.textInfo } >Please enter verification code from SMS</Text>
          <Button raised backgroundColor="#397af8" icon={{ name: 'done' }} title='VERIFY' />
        </View>
        </KeyboardAvoidingView>
        <ActivityIndicator animating={this.state.isLoading} style={[Styles.centering, {height: 80}]} size="large" />
      </Animated.View>
    );
  }
  
}

var styles = StyleSheet.create({
});
