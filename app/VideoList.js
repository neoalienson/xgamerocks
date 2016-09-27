import React, { Component } from 'react';
import { 
  Image, 
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
 } from 'react-native';
import AutoResponisve from 'autoresponsive-react-native';
import ListViewDataSource from 'ListViewDataSource';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_WIDTH = (SCREEN_WIDTH - 18) / 2;
const CELL_PADDING = 6;

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 4,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  textDesc: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  // 4:3 ration for video thumb
  thumb: {
    width: CELL_WIDTH - CELL_PADDING * 2,
    height: (CELL_WIDTH - CELL_PADDING * 2) * 3 / 4,
  },
});


class VideoList extends Component {
  getChildStyle(row) {
    var _height = 220;
    _height += (row.description.length == 0) ? 0 : 55;
    console.log(_height);
    return {
      height: _height,
      width: CELL_WIDTH,
      backgroundColor: '#FFFFEE',
      padding: CELL_PADDING,
      borderRadius: 4,
    };
  }
  
  getAutoResponsiveProps() {
    return {
      itemMargin: 8,
    };
  }

  renderChildren() {
    var ds = this.props.dataSource;
    var data = Array();
    
    for (i =0; i < ds.getRowCount(); i++) {
      var row = ds.getRowData(0, i);
      data.push(
          <View style={this.getChildStyle(row)} 
            key={i}>
            <Image source={{uri: row.thumbUrl}}
            style={styles.thumb}></Image>
            <Text style={styles.textTitle}
              ellipsizeMode="tail" numberOfLines={3}
            >{row.title}</Text>
            <Text style={styles.textDesc}
              ellipsizeMode="tail" numberOfLines={3}
            >{row.description}</Text>
          </View>
      );
    }
    return data;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <AutoResponisve {...this.getAutoResponsiveProps()}>
          {this.renderChildren()}
        </AutoResponisve>
      </ScrollView>
    );
  }
}

module.exports = VideoList;