import React, { Component, 
  PropTypes } from 'react';
import { 
  ActivityIndicator,
  Alert,
  Animated,
  AsyncStorage,
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
import Events from 'react-native-simple-events';

export default class Verify extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      codeValid: false,
      videoLoaded: false,
      opacity: new Animated.Value(0),
      isLoading: false,
      token: null,
    }
    this.verify = this.verify.bind(this);
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
            onChangeText={(text) => this.setState({token: text})}
            value={this.state.token}
            editable={!this.state.isLoading}
          />
          <Text style={ Styles.textInfo } >Please enter verification code from SMS</Text>
          <Button raised backgroundColor="#397af8" icon={{ name: 'done' }} title='VERIFY' onPress={this.verify} />
        </View>
        </KeyboardAvoidingView>
        <ActivityIndicator animating={this.state.isLoading} style={[Styles.centering, {height: 80}]} size="large" />
      </Animated.View>
    );
  }
  
  verify() {
    if (this.state.isLoading) {
      return;
    }
    
    this.setState({isLoading: true});

    AsyncStorage.getItem("username").then((username) =>{

    var url = 'https://neo.works:8445/verify?username=' + username + '&token=' + this.state.token;
    fetch(url, { method: 'GET', })
    .catch((error) => {
      Alert.alert('Verification fail');
      this.setState({ 
        isLoading: false,
      });
    })
    .then((response) => response.json())
    .then((res) => {
      if (res != undefined) {
        this.setState({ isLoading: false, });
        if (res.success) {
          AsyncStorage.setItem("pass", res.pass);
        } else {
          Alert.alert('Verification fail');
        }
      } else {
        Alert.alert('Verification fail');
      }
    });
    
    }).done();

  }

}

