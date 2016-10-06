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
  TouchableHighlight,
  View,
 } from 'react-native';
import Video from 'react-native-video';
import Styles from './Styles';
import { Button } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
  
export default class RegisterView extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      opacity: new Animated.Value(0),
      cca2: 'HK',
      country: {
       name: 'Hong Kong',
       callingCode: '852',
      },
      isLoading: false,
      phone: '95881974',
    }
    this.register = this.register.bind(this);
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
          <View style={{ marginTop: 40, flexDirection: 'row'}}>
          <CountryPicker 
            onChange={(value)=> this.setState({country: value, cca2: value.cca2})}
            cca2={this.state.cca2}
            translation='eng'
            style={{ backgroundColor: 'transparent' }}
          />
          {this.state.country &&
            <Text style={ Styles.text }>
              { this.state.country.name } (+{ this.state.country.callingCode })
            </Text>
          }
          </View>
          <TextInput style={ [ Styles.textInput ] }
            keyboardType="numeric"
            placeholder="8888888"
            onChangeText={(text) => this.setState({phone: text})}
            value={this.state.phone}
            editable={!this.state.isLoading}
          />
          <Text style={ Styles.textInfo } >Enter your phone numbers above to verify</Text>
          <Button raised backgroundColor="#397af8" icon={{ name: 'done' }} title='VERIFY' onPress={this.register}  />
        </View>
        </KeyboardAvoidingView>
        <ActivityIndicator animating={this.state.isLoading} style={[Styles.centering, {height: 80}]} size="large" />
      </Animated.View>
    );
  }
  
  register() {
    if (this.state.isLoading) {
      return;
    }
    
    this.setState({isLoading: true});

    var url = 'https://neo.works:8445/register?phone=' + this.state.phone + '&country_code=' + this.state.country.callingCode;
    fetch(url, { method: 'GET', })
    .then((response) => response.json())
    .catch((error) => {
      Alert.alert('Registration fail', error);
      this.setState({
        isLoading: false,
      });
    })
    .then((res) => {
      if (res != undefined) {
        this.setState({ isLoading: false, });
        if (res.success) {
          AsyncStorage.setItem("username", res.username);
        } else {
          Alert.alert('Registration fail');
        }
      } else {
        Alert.alert('Registration fail');
      }
    });
  }

}
