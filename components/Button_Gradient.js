import React from "react";
import GradientButton from "react-native-gradient-buttons";
import { ToastAndroid } from "react-native";

const Button_Gradient = props => {
  return (
    <GradientButton
      style={{
        marginVertical: props.marginVertical ? props.marginVertical : 0,
        marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0
      }}
      text={props.text ? props.text : "Default Text"}
      disabled={props.disabled ? props.disabled : false}
      textStyle={{ fontSize: props.fontSize ? props.fontSize : 20 }}
      gradientBegin={props.gradientBegin ? props.gradientBegin : "#d9207a"}
      gradientEnd={props.gradientEnd ? props.gradientEnd : "#4279dc"}
      gradientDirection={
        props.gradientDirection ? props.gradientDirection : "diagonal"
      }
      height={props.height ? props.height : 60}
      width={props.width ? props.width : 300}
      radius={props.radius ? props.radius : 0}
      impact={props.impact ? props.impact : false}
      impactStyle={props.impactStyle ? props.impactStyle : "Light"}
      onPressAction={
        props.onPress
          ? props.onPress
          : () => ToastAndroid.show("Button is pressed", ToastAndroid.SHORT)
      }
    />
  );
};

export default Button_Gradient;
