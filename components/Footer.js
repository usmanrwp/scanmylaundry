import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Footer, Left, Right } from "native-base";
import Text from "./CustomText";
import Colors from "../constants/Colors";
import _retrieveData from "../local_cache/new/_retrieveData";

export default class Footer_ extends Component {
  state = {
    amount: "ORDER"
  };
  componentDidMount = async () => {
    const res = await _retrieveData("amount");
    // console.warn("amount", res);

    if (res === "Empty_LocalCache") {
      this.setState({
        amount: "ORDER"
      });
    } else {
      this.setState({
        amount: "£ " + Math.ceil(res) + " >"
      });
    }
  };

  render() {
    const font = this.props.fontFamily
      ? this.props.fontFamily
      : "Raleway-Regular";
    const color = this.props.color ? this.props.color : "#fff";
    const fontSize = this.props.fontSize ? this.props.fontSize : 16;
    const backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : "transparent";

    const style = [
      { fontFamily: font, color: color, fontSize: fontSize },
      { backgroundColor: backgroundColor },
      this.props.style || {}
    ];
    const allProps = Object.assign({}, this.props, { style: style });
    return (
      <TouchableOpacity {...allProps} onPress={this.props.footerPress}>
        <Footer
          style={{
            backgroundColor: "transparent",
            // borderTopColor: Colors.header,
            // borderTopWidth: 3,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            paddingTop: 15,
            paddingBottom: 15
          }}
        >
          <Left>
            <Text
              style={{ color: Colors.white, paddingLeft: 15, fontSize: 18 , fontWeight: 'bold'}}
            >
              {this.props.left ? this.props.left : "Your basket"}
            </Text>
          </Left>

          <Right>
            <Text
              style={{ color: Colors.white, paddingRight: 15, fontSize: 15 , fontWeight: 'bold' , textDecorationLine: 'underline'}}
            >
              {this.props.right ? this.props.right : this.state.amount}
            </Text>
          </Right>
        </Footer>
      </TouchableOpacity>
    );
  }
}
