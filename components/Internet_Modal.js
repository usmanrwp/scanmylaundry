import React, { Component } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import Modal from "react-native-modal";
import strings from "../strings/string";
import Button_Gradient from "./Button_Gradient";

let visible = false;

const Internet_Modal = props => {
  return (
    <Modal
      isVisible={props.visible ? props.visible : false}
      onBackButtonPress={() => {
        BackHandler.exitApp();
      }}
      onBackdropPress={() => {
        BackHandler.exitApp();
      }}
      customBackdrop={<View style={{ flex: 1 }} />}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#2f2e34",
            paddingTop: 30,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            width: "100%",
            height: null
          }}
        >
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15
              // flexDirection: "column"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#fff",
                fontFamily: "Raleway"
              }}
            >
              {strings.No_Internet_Connection_Available}
            </Text>
          </View>

          <View
            style={{
              margin: 7,
              alignContent: "flex-end",
              alignSelf: "flex-end",
              alignItems: "flex-end",
              flexDirection: "row"
            }}
          >
            <View style={{ padding: 5 }}>
              <Button_Gradient
                width="50%"
                radius={25}
                fontSize={16}
                height={40}
                width={100}
                text={strings.button_Exit}
                onPress={() => {
                  BackHandler.exitApp();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Internet_Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    // height: deviceHeight,
    // width: deviceWidth
  }
});
