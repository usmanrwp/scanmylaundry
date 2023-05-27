import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Text from './CustomText';

export default class No_Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // refreshing: false,
    };
  }

  // _onRefresh = () => {
  //   this.setState({refreshing: true});
  //   // fetchData().then(() => {
  //   //   this.setState({refreshing: false});
  //   // });
  // };

  render() {
    return (
      // <View></View>
      <ScrollView
        // style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
          />
        }>
        <Text style={[styles.defaultStyle, this.props.style]}>
          {this.props.children}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // ... add your default style here
  container: {
    alignContent: 'center',
    flex: 1,
  },
  defaultStyle: {
    fontFamily: 'Raleway-BoldItalic',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000',
    padding: 10,
    fontSize: 20,
    textTransform: 'capitalize',
    marginVertical: 20,
  },
  // container: {
  //   flex: 1,
  //   marginTop: Constants.statusBarHeight,
  // },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
