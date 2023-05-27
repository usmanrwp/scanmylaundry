import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import Text from "./CustomText";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast_ from "../functions/Toast_";

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : () => Toast_("Button Press")}
    >
      <Button
        style={[styles.defaultButtonStyle, props.buttonStyle]}
        active={props.active ? props.active : true}
        transparent={props.transparent ? props.transparent : true}
        disabled={props.disabled ? props.disabled : true}
        iconRight={props.iconRight ? props.iconRight : false}
        iconLeft={props.iconLeft ? props.iconLeft : false}
        light={props.light ? props.light : false}
        primary={props.primary ? props.primary : false}
        success={props.success ? props.success : true}
        info={props.info ? props.info : false}
        warning={props.warning ? props.warning : false}
        danger={props.danger ? props.danger : false}
        dark={props.dark ? props.dark : false}
        bordered={props.bordered ? props.bordered : false}
        rounded={props.rounded ? props.rounded : true}
        block={props.block ? props.block : false}
        full={props.full ? props.full : false}
      >
        {props.iconLeft === true ? (
          <Icon
            name={props.iconLeftName}
            size={props.iconLeftSize ? props.iconLeftSize : 20}
            color={props.iconLeftColor ? props.iconLeftColor : "#fff"}
            style={[styles.defaulticonLeftStyle, props.iconLeftStyle]}
          />
        ) : null}
        {props.iconRight === true ? (
          <Icon
            name={props.iconRightName}
            size={props.iconRightSize ? props.iconRightSize : 20}
            color={props.iconRightColor ? props.iconRightColor : "#fff"}
            style={[styles.defaulticonRightStyle, props.iconRightStyle]}
          />
        ) : null}

        <Text style={[styles.defaultStyle, props.textStyle]}>
          {props.text ? props.text : "Default text"}
        </Text>
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontFamily: "Raleway-Regular",
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize"
  },
  defaultButtonStyle: {
    margin: 10,
    padding: 10
  },
  defaulticonRightStyle: {
    paddingLeft: 5
  },
  defaulticonLeftStyle: {
    paddingRight: 5
  }
});

export default CustomButton;
