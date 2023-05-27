import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  BackHandler,
  Alert
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Colors from "../../constants/Colors";
import Active from "./Active";
import Servicing from "./Servicing";
import Completed from "./Completed";
import Header_ from "../../components/Header";
import _fetch from "../../fetch_function/_fetch";
import { NavigationEvents } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';


export default class index extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      

    // };
  }
  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      return "empty";
    } else {
      await this.setState({
        email: res
      });
      return res;
    }
  };

  state = {
    index: 0,
    routes: [
      { key: "first", title: "Active", indx: 0},
      { key: "second", title: "Servicing", indx: 1},
      { key: "third", title: "Complete", indx: 2}
    ],
    email: "",
    selectedItem: 0

  };

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const active = new Active();
    active.navigate_data(this.props.navigation);
    const servicing = new Servicing();
    servicing.navigate_data(this.props.navigation);
    const completed = new Completed();
    completed.navigate_data(this.props.navigation);
  };

 

  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({selectedItem: index});
    //  alert(index);
  }

  render() {
    return (
      <View style={{ flex: 1, 
        backgroundColor: "#E8E6EE"  }}>
        {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} */}

        <Header_ title="Orders" left back onBackPress={this.headerBackPress} />
        <NavigationEvents onWillFocus={() => this.componentDidMount()} />
        <TabView
          navigationState={this.state}
          tabStyle={styles.tab_Style}
          lazy={true}
          renderTabBar={props => (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
              style={{ borderBottomLeftRadius: 40 }}>
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: "transparent"
                }}
                style={{ backgroundColor: "transparent" }}
                renderLabel={({ route, focused, color }) => (
                  <View 
                  style={
                    this.state.selectedItem === route.indx ? {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 30,
                      width: 100,
                      alignItems: "center"
                  } : {
                    alignItems: "center"
                  }}>
                    <Text
                      style={{color: Colors.tabTextIcon, padding: 7, margin: 5, fontSize: 12,fontFamily: "Raleway-BoldItalic"}}>
                      {route.title}
                    </Text>
                   </View>
                )}
              />
            </LinearGradient>
          )}
          style={{ marginTop: 0 }}
          renderScene={SceneMap({
            first: Active,
            second: Servicing,
            third: Completed
          })}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />

      </View>
    );
  }
}
const s_he = StatusBar.currentHeight;
const styles = StyleSheet.create({
  tab_Style: {
    top: s_he,
    backgroundColor: "#E8E6EE"
  }
});
