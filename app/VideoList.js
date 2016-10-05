import React, { Component, PropTypes } from 'react';
import { 
  ActivityIndicator,
  Dimensions,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View,
 } from 'react-native';

var API_URL = 'https://neo.works:8445/video';
const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_WIDTH = (SCREEN_WIDTH - 18) / 2;
const CELL_PADDING = 6;

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
            dataSource: this.getDataSource(responseData),
          });
        }
      })
      .done();
  }

  getDataSource(videos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(videos);
  }
  
  _renderRow(row, sectionID: number, rowID: number) {
    return (
        <View>
          <View style={styles.row} key={rowID}>
            <Image source={{uri: row.thumbUrl}} style={styles.thumb}></Image>
            <Text style={styles.textTitle} ellipsizeMode="tail" numberOfLines={3} >{row.title}</Text>
            <Text style={styles.textDesc} ellipsizeMode="tail" numberOfLines={3}>{row.description}</Text>
          </View>
        </View>
    );
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
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderScrollComponent={props => <ScrollView {...props} 
          style={{ backgroundColor:"#3b5998" }} />}
      />
    );
  }
  
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5998',
  },
  centerText: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
    padding: CELL_PADDING,
  },
  textDesc: {
    fontSize: 12,
    color: '#777777',
    padding: CELL_PADDING,
  },
  // 4:3 ration for video thumb
  thumb: {
    width: CELL_WIDTH,
    height: (CELL_WIDTH - CELL_PADDING * 2) * 3 / 4,
    backgroundColor: 'black',
  },
  row: {
    width: CELL_WIDTH,
    backgroundColor: 'white',
    marginTop: 8,
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#3b5998',
  },  
});

