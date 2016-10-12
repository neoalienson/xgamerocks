import React, { Component, 
  PropTypes } from 'react'
import { 
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
 } from 'react-native'
import Styles from './Styles'
import { Button } from 'react-native-elements'
import Eventx from 'react-native-simple-events'
  
export default class RegisterView extends Component {

  constructor(props, context) {
    super(props, context)
    
    this.state = {
      isUploading: false,
      title: null,
      desc: null,
      tags: null,
    }
    this.upload = this.upload.bind(this)
  }
  
  render() {
    return (
    <View style={ [ Styles.container, { backgroundColor: '#3b5998' } ] } >
      <KeyboardAvoidingView behavior="position" >
        <View style={ Styles.formView }>

          <Text style={ Styles.textHero } >Video upload</Text>
          
          <TextInput style={ [ Styles.textInputSmall ] }
            placeholder="Video title"
            onChangeText={ (text) => this.setState({title: text}) }
            value={ this.state.title }
            editable={ !this.state.isUploading }
          />
          <Text style={ [ Styles.textInfo, localStyle.textInfo ] } >What should the video call?</Text>

          <TextInput style={ [ Styles.textInputTiny, { height: 70 }  ] }
            placeholder="Desciption"
            onChangeText={ (text) => this.setState({desc: text}) }
            value={ this.state.desc }
            editable={ !this.state.isUploading }
            multiline={ true }
          />
          <Text style={ [ Styles.textInfo, localStyle.textInfo ] } >Details about your video</Text>

          <TextInput style={ [ Styles.textInputSmall ] }
            placeholder="Tags"
            onChangeText={ (text) => this.setState({tags: text}) }
            value={ this.state.tags }
            editable={ !this.state.isUploading }
          />
          <Text style={ [ Styles.textInfo, localStyle.textInfo ] } >A few space separated keywords</Text>

          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  }}>
            <Button raised backgroundColor="orange" icon={{ name: 'clear' }} 
              small title='CANCEL' buttonStyle={{ flex: 1 }} />
            <Button raised backgroundColor="#397af8" icon={{ name: 'send' }} 
              small title='UPLOAD' buttonStyle={{ flex: 1 }} onPressed={ this.upload }  />
          </View>

        </View>
      </KeyboardAvoidingView>
      <ActivityIndicator animating={this.state.isUploading} style={[Styles.centering, {height: 80}]} size="large" />
    </View>
    )
  }
  
  upload() {
    if (this.state.isUploading) {
      return
    }
    
    this.setState({ isUploading: true })
    
    // create an entry into the database
    var url = 'https://neo.works:8445/uploadVideo?title=' + this.state.title + '&desc=' + this.state.desc 
      + '&tags=' + this.state.tags
    fetch(url, { method: 'GET', })
    .then((response) => response.json())
    .catch((error) => {
      Alert.alert('Video creation failure', error)
      this.setState({ isUploading: false, })
    })
    .then((res) => {
      if (res != undefined) {
        this.setState({ isUploading: false, })
        if (res.success) {
          Eventx.trigger('onUploadCompleted', res.title )
        } else {
          Alert.alert('Video creation failure')
        }
      } else {
        Alert.alert('Video creation failure')
      }
    })
  }

}

var localStyle = StyleSheet.create({
  textInfo: {
    color: 'white',
  },
})