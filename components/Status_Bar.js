import { StatusBar } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Status_Bar = props => {
  return (
    <StatusBar
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : Colors.statusBar
      }
      barStyle={props.barStyle ? props.barStyle : "light-content"}
      translucent={false}
    />
  );
};

export default Status_Bar;
