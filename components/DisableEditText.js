import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import Colors from '../constants/Colors';

export default class DisableEditText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.et} onPress={this.props.onPress} activeOpacity={.9} >
        <CustomText style={[styles.customETtitle, this.props.titleStyle]}>
          {this.props.title ? this.props.title : ''}
        </CustomText>
        {this.props.value === '' ? null : (
          <CustomText style={[styles.customETtext, this.props.valueStyle]}>
            {this.props.value}
          </CustomText>
        )}
        <View style={[styles.customETborder, this.props.borderStyle]} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  et: {
    flex: 1,
    width: '100%',
    marginLeft:10,

    // alignItems:"center",
    // alignContent:"center"
    // marginHorizontal: 15,
    // paddingVertical: 10,
  },
  customETtitle: {
    fontSize: 14,
    // paddingTop: 15,
    // paddingBottom: 5,
    color: '#B3AFAF',
    // fontFamily: 'Raleway_LightItalic',
    // alignSelf:"center"
  },
  customETtext: {
    fontSize: 14,
    // paddingVertical: 5,
    // fontFamily: 'Raleway_LightItalic',
    color: "#5F5f5f",
  },
  customETborder: {
    // borderBottomColor: '#B3AFAF',
    // borderBottomWidth: 0.5,
  },
});
