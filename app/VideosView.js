import React, { Component, PropTypes } from 'react';
import { 
  ActivityIndicator,
  ListView,
  Text,
  StyleSheet,
  View,
 } from 'react-native';

import VideoList from './VideoList';

var API_URL = 'https://neo.works:8443/parse/classes/Video';

export default class VideosView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loadError: null,
    };
  }
  
  componentDidMount() {
    this.loadVideos('');
  }
  
  _urlForPage(pageNumber: number): string {
    return (
      API_URL
    );
  }

  loadVideos() {
    this.loadError = null;

    if (this.props.isLoading) {
      return;
    }
    
    this.setState({ isLoading: true });
    fetch(this._urlForPage(1), {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id' : 'xgamerocks',
          'X-Parse-REST-API-Key' : null,
        }
      })
      .then((response) => response.json())
      .catch((error) => {
        this.setState({ 
          dataSource: this.getDataSource([]),
          isLoading: false,
          loadError: error,
        });
      })
      .then((responseData) => {
        if (responseData != undefined) {
          this.setState({
            isLoading: false,
            dataSource: this.getDataSource(responseData.results),
          });
        }
      })
      .done();
  }

  getDataSource(videos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(videos);
  }
  
  render() {
    if (this.state.loadError != null) {
      return (
        <View style={[styles.container, styles.centerText]}>
          <Text>Network error</Text>
        </View>
      );
    }
    return (this.state.dataSource.getRowCount() === 0 ?
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicator style={{flex:1}} />
      </View> : 
      <View style={styles.container}>
        <VideoList dataSource={this.state.dataSource}/>
      </View>
    );

  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
});

