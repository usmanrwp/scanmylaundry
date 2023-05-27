/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
// import AppNavigator from "./App.js";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => AppNavigator);
