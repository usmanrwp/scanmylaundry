import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";
import styles from "./style";
import Header_ from "../../components/Header";
import Toast_ from "../../functions/Toast_";
import Cache_Image from "../../components/Cache_Image";
import Text from "../../components/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import _fetch from "../../fetch_function/_fetch";
import Colors from "../../constants/Colors";
import _retrieveData from "../../local_cache/_retrieveData";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index0: "",
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      email: "",
      backTo: ""
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.navigate(this.state.backTo);
    return true;
  };
  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const navigation = this.props.navigation;
    const rb = navigation.getParam("rb", "Dashboard");
    this.setState({
      backTo: rb
    });

    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      this.props.navigation.navigate("Register");
    } else {
      this.setState({
        email: res
      });
    }
  };

  onChangeText0 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index0: ""
      });
      return false;
    } else {
      this.setState({
        index0: text
      });
      this.refs.input_1.focus();
      return true;
    }
  };

  onChangeText1 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index1: ""
      });
      return false;
    } else {
      this.setState({
        index1: text
      });
      this.refs.input_2.focus();
      return true;
    }
  };

  onChangeText2 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index2: ""
      });
      return false;
    } else {
      this.setState({
        index2: text
      });
      this.refs.input_3.focus();
      return true;
    }
  };

  onChangeText3 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index3: ""
      });
      return false;
    } else {
      this.setState({
        index3: text
      });
      this.refs.input_4.focus();
      return true;
    }
  };

  onChangeText4 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index4: ""
      });
      return false;
    } else {
      this.setState({
        index4: text
      });
      this.refs.input_5.focus();
      return true;
    }
  };

  onChangeText5 = text => {
    let reg = /^([0-9])$/;
    if (reg.test(text) === false) {
      this.setState({
        index5: ""
      });
      return false;
    } else {
      this.setState({
        index5: text
      });
      // this.refs.input_2.focus();
      const code =
        this.state.index0 +
        this.state.index1 +
        this.state.index2 +
        this.state.index3 +
        this.state.index4 +
        text;
      this.verify(code);
      return true;
    }
  };

  verify = async code => {
    let param = {};
    param["email"] = this.state.email;
    param["code"] = code;
    const res = await _fetch("verify_email", param);
    if (res === "Verified") {
      _deleteData("id");
      _storeData(this.state.email);
      this.props.navigation.navigate("Profile", { rb: this.state.backTo });
    } else {
      Toast_("Wrong Code!");
      this.setState({
        index0: "",
        index1: "",
        index2: "",
        index3: "",
        index4: "",
        index5: ""
      });
      this.refs.input_0.focus();
    }
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <View>
          <Header_ title="ScanMyLaundry" />
        </View>
        <ScrollView>
          <KeyboardAvoidingView style={styles.bodyContainer}>
            <View style={styles.bodyContainer}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 24,
                  marginTop: 15,
                  marginBottom: 10,
                  fontFamily: "Raleway-BoldItalic"
                }}
              >
                Email Verification
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <TextInput
                  onChangeText={text => this.onChangeText0(text)}
                  value={this.state.index0}
                  onFocus={() => this.setState({ index0: "" })}
                  ref="input_0"
                  keyboardType="phone-pad"
                  autoFocus={true}
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
                <TextInput
                  onChangeText={text => this.onChangeText1(text)}
                  value={this.state.index1}
                  onFocus={() => this.setState({ index1: "" })}
                  ref="input_1"
                  keyboardType="phone-pad"
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
                <TextInput
                  onChangeText={text => this.onChangeText2(text)}
                  value={this.state.index2}
                  onFocus={() => this.setState({ index2: "" })}
                  ref="input_2"
                  keyboardType="phone-pad"
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
                <TextInput
                  onChangeText={text => this.onChangeText3(text)}
                  value={this.state.index3}
                  onFocus={() => this.setState({ index3: "" })}
                  ref="input_3"
                  keyboardType="phone-pad"
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
                <TextInput
                  onChangeText={text => this.onChangeText4(text)}
                  value={this.state.index4}
                  onFocus={() => this.setState({ index4: "" })}
                  ref="input_4"
                  keyboardType="phone-pad"
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
                <TextInput
                  onChangeText={text => this.onChangeText5(text)}
                  value={this.state.index5}
                  onFocus={() => this.setState({ index5: "" })}
                  ref="input_5"
                  keyboardType="phone-pad"
                  maxLength={1}
                  numberOfLines={1}
                  style={{
                    height: 60,
                    width: 60,
                    color: Colors.textColorDull,
                    borderRadius: 30,
                    borderColor: Colors.textColorDull,
                    borderWidth: 2,
                    textAlign: "center",
                    margin: 3
                  }}
                  clearTextOnFocus={true}
                />
              </View>
              {/* END OF INPUT */}
              <View style={{ flexDirection: "column", marginTop: 10 }}>
                <Text style={{ color: "#000" }}>
                  Email send at {this.state.email}.
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ color: "#000", fontFamily: "Raleway-ExtraLight" }}
                  >
                    {" "}
                    Didn't recieve? Resend
                  </Text>
                </TouchableOpacity>
              </View>
              {/* END OF RESEND */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default index;
