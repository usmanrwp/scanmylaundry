import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import Modal from "react-native-modal";

const Custom_Indicator = props => {
  return (
    <Modal
      //   animationType="fade"
      //   transparent={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      coverScreen={true}
      backdropOpacity={0.3}
      isVisible={props.visible ? props.visible : false}
      //   onRequestClose={() => {}}
      //   deviceWidth={deviceWidth}
      //   deviceHeight={deviceHeight}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: 0
        // height: he,
        // width: wi
        // flex: 1
      }}
    >
      <View style={[styles.modal]}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <MaterialIndicator color="#fff" size={60} />
        </View>
      </View>
    </Modal>
  );
};
export default Custom_Indicator;

var modalBackgroundStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.3)"
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    // height: deviceHeight,
    // width: deviceWidth
  }
});
