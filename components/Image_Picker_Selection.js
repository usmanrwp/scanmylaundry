import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Text from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
// import Button_Gradient from './Button_Gradient';

export default class Image_Picker_Selection extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.hideModal}
        onBackdropPress={this.props.hideModal}
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={1}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.backgroundColor,
              paddingTop: 30,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
              borderRadius: 10,
              height: null,
            }}>
            <Text style={{color: Colors.black, textAlign: 'center'}}>
              {this.props.text ? this.props.text : 'Choose Image from'}{' '}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.galcamView}
                onPress={this.props.gallery}>
                <Icon name="ios-image" size={40} color={Colors.black} />
                <Text style={styles.galcam}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.galcamView}
                onPress={this.props.camera}>
                <Icon name="ios-camera" size={40} color={Colors.black} />
                <Text style={styles.galcam}>Camera</Text>
              </TouchableOpacity>
            </View>
            {/* BUTTON START */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.props.cancel}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.button}
                  colors={[Colors.gradient1, Colors.gradient2]}>
                  <Text>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {/* BUTTON END */}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  galcam: {
    color: Colors.black,
    paddingHorizontal: 20,
    fontSize: 20,
    fontFamily: 'Raleway-BoldItalic',
  },
  galcamView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 25,
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
});
