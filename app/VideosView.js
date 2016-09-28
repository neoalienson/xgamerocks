import React, { Component, PropTypes } from 'react';
import { 
  ActivityIndicator,
  ListView,
  Text,
  StyleSheet,
  View,
 } from 'react-native';

var VideoList = require('./VideoList');

var API_URL = 'https://neo.works:8443/parse/classes/Video';

export default class VideosView extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      queryNumber: 0
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
    this.timeoutID = null;

    if (this.props.isLoading) {
      return;
    }
    
    this.setState({ isLoading: true });
    fetch(this._urlForPage(1), {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id' : 'xgamerocks',
          'X-Parse-REST-API-Key' : undefined,
        }
      })
      .then((response) => response.json())
      .catch((error) => {
        this.setState({ 
          dataSource: this.getDataSource([]),
          isLoading: false 
        });
      })
      .then((responseData) => {
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(responseData.results),
        });
      })
      .done();
  }

  getDataSource(videos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(videos);
  }
  
  render() {
    return (this.state.dataSource.getRowCount() === 0 ?
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.loadingText}>Loading</Text>
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
  loadingText: {
    color: '#888888',
  },
});

//module.exports = VideosView;