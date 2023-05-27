import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import strings from "../strings/string";

const FB_Btn = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "#3b5998",

          flexDirection: props.flexDirection ? props.flexDirection : "row",

          borderRadius: props.borderRadius ? props.borderRadius : 50,
          margin: props.margin ? props.margin : 15,
          padding: props.padding ? props.padding : 15,
          width: props.width ? props.width : "100%",
          alignItems: "center"
        }}
      >
        <Icon
          style={{
            paddingLeft: props.paddingLeft ? props.paddingLeft : 20,
            paddingTop: props.paddingTop ? props.paddingTop : 5
          }}
          name={props.name ? props.name : "facebook"}
          size={props.size ? props.size : 40}
          color={props.color ? props.color : "#fff"}
        />
        <Text
          style={{
            padding: props.padding ? props.padding : 15,
            color: props.color ? props.color : "#fff",
            textAlign: props.textAlign ? props.textAlign : "center",
            fontSize: props.fontSize ? props.fontSize : 16,
            fontWeight: props.fontWeight ? props.fontWeight : "bold"
          }}
        >
          {strings.button_Continue_with_facebook}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FB_Btn;
