import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StackNavigator from "./StackNavigator";

export default createAppContainer(
  createSwitchNavigator({
    StackNavigator
  })
);
