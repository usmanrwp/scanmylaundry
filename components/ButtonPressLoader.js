import React, {Component} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export default class ButtonPressLoader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color="#3291bc"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
