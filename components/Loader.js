import React, { Component } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import Colors from "../constants/Colors";
import Header_ from "./Header";

let timer = null;
export default class Loader extends Component {
  state = {
    text: ".",
    color: "#bc2b78",
    index: 1
  };

  constructor(props) {
    super(props);
    timer = setInterval(() => {
      if (this.state.index === 1) {
        this.setState({
          color: "#bc2b78",
          index: 2,
          text: ".."
        });
      } else if (this.state.index === 2) {
        this.setState({
          color: "red",
          index: 3,
          text: "..."
        });
      } else if (this.state.index === 3) {
        this.setState({
          color: "green",
          index: 4,
          text: "...."
        });
      } else if (this.state.index === 4) {
        this.setState({
          color: "orange",
          index: 5,
          text: "....."
        });
      } else {
        this.setState({
          color: "#bc2b78",
          index: 1,
          text: "."
        });
      }
    }, 400);
  }
  componentWillUnmount = () => {
    clearInterval(timer);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header_ title="ScanMyLaundry" />
        <View style={styles.container}>
          <ActivityIndicator
            color={this.state.color}
            size="large"
            style={styles.activityIndicator}
          />
          <View style={{ marginTop: 10 }}>
            <CustomText style={styles.textStyle}>
              Please wait
              <CustomText style={styles.textStyle1}>
                {this.state.text}
              </CustomText>
            </CustomText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 20,
    color: "#000"
  },
  textStyle1: {
    fontSize: 35,

    color: "#000"
  }
});
