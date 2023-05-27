import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, BackHandler, ImageBackground, TextInput } from "react-native";
import styles from "./style";
import Header_ from "../../components/Header";
import Edit_Text from "../../components/Edit_Text";
import Text from "../../components/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import _fetch from "../../fetch_function/_fetch";
import _deleteData from "../../local_cache/new/_deleteData";
import _storeData from "../../local_cache/_storeData";
import _retrieveData from "../../local_cache/_retrieveData";
import Loader from "../../components/Loader";
import { firebase as fcm } from "@react-native-firebase/messaging";
import LinearGradient from 'react-native-linear-gradient';

class index extends Component {
  checkPermissions = () => {
    return new Promise((resolve, reject) => {
      fcm
        .messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
            console.warn("enable");
            resolve(true);
          } else {
            console.warn("disable");
            this.requestPermissions();
            resolve(false);
          }
          this.requestPermissions();
        });
    });
  };
  requestPermissions = async () => {
    return new Promise(async (resolve, reject) => {
      fcm
        .messaging()
        .requestPermission()
        .then(() => {
          console.warn("true");
          resolve(true);
        })
        .catch(error => {
          console.warn("false", error);
          resolve(false);
        });
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === fcm.AuthorizationStatus.AUTHORIZED ||
        authStatus === fcm.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.warn('Authorization status:', authStatus);
      }
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      cp: true,
      cpIcon: "ios-eye-off",
      email: "",
      password: "",
      error_email: "",
      loading: true,
      backTo: ""
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }
  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const navigation = this.props.navigation;
    const rb = navigation.getParam("rb", "Dashboard");
    this.setState({ backTo: rb }, () => this.retrieveEmail());
    const r = await this.checkPermissions();
  };
  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res.includes("Empty_LocalCache")) {
      this.setState({ loading: false, email: "" });
    } else { this.props.navigation.navigate("Profile", { rb: this.state.backTo }); }
  };
  cpPress = () => {
    if (this.state.cp === false) {
      this.setState({
        cp: true,
        cpIcon: "ios-eye-off"
      });
    } else {
      this.setState({
        cp: false,
        cpIcon: "ios-eye"
      });
    }
  };
  emailText = text => { this.setState({ email: text }); };
  passwordText = text => {
    this.setState({
      error_password: "",
      password: text
    });
  };
  nav_reg = () =>{
    // alert(this.state.backTo);
    if (this.state.backTo === "Basket") {
      this.props.navigation.navigate("Register", { rb: "Basket" });
    }
    this.props.navigation.navigate("Register")
  }
  render() {
    if (this.state.loading === true) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <ImageBackground source={require('../../Images/laundry.jpg')} style={styles.image_background}>
          <View style={{ backgroundColor: 'rgba(68,107,214,0.7)', flex: 1 }}   >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 2 }}>
                  <View style={styles.back_button}>
                    <Icon name="md-arrow-back" size={30} color="#fff" onPress={() => this.props.navigation.goBack()} />
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', }}>
                  <Text style={{ fontSize: 28, color: 'white', fontWeight: "bold", textAlign: 'center' }}>Login</Text>
                  <Text style={{ fontSize: 18, color: 'white', fontWeight: "bold", marginTop: 10 }}>Login into your account</Text>
                </View>
              </View>
            </View>
            <View style={styles.mid_view}>
              <ScrollView>
                <View style={styles.bodyContainer}>
                  <Text style={styles.input_placeholder}>Email Address</Text>
                  <View style={[styles.email_inputfield, { height: 50 }]}>
                    <Edit_Text
                      value={this.state.email}
                      keyboardType="email-address"
                      onChangeText={email => this.emailText(email)}
                      error={this.state.error_email} />
                  </View>
                  <Text style={styles.input_placeholder}>Password</Text>
                  <View style={[styles.email_inputfield, { height: 50 }]}>
                    <View
                      style={{ alignItems: "flex-end", justifyContent: "flex-end", flex: 1, marginBottom: 10 }}>
                      <Icon name={this.state.cpIcon} size={28} color="#00" onPress={() => this.cpPress()} />
                    </View>
                    <View
                      style={{ flex: 1, position: "absolute", width: "94%", marginLeft: 10 }}>
                      <Edit_Text
                        secureTextEntry={this.state.cp}
                        value={this.state.password}
                        onChangeText={password => this.passwordText(password)}
                        error={this.state.error_password} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={this.loginPress}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                      <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginTop: 22, marginRight: 15 }}
                    onPress={() => this.props.navigation.navigate('ForgetPassword')}
                    >
                    <Text style={{ color: "#446BD6", fontSize: 16, textDecorationLine: 'underline' }}>Forget Password</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 0.23, backgroundColor: 'white' }}>
              <View style={{ backgroundColor: '#EDEEF0', borderTopLeftRadius: 25, borderTopRightRadius: 25, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ color: this.state.agreeColor, paddingTop: 5, fontSize: 14, textAlign: 'center', marginRight: 5 }}>Don't have Account?</Text>
                  <TouchableOpacity onPress={() => this.nav_reg()}>
                    <Text
                      style={{ color: 'purple', paddingTop: 5, paddingBottom: 25, fontSize: 14, textAlign: 'center', textDecorationLine: 'underline' }}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  loginPress = async () => {
    if (this.state.email === "") {
      this.setState({
        error_email: "Please enter email"
      });
      return;
    }
    if (this.state.password === "") {
      this.setState({
        error_password: "Please enter password"
      });
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      this.setState({ error_email: "Invalid Email Address" });
      return;
    }
    if (!(this.state.error_email === "")) {
      this.setState({ error_email: "Please enter valid email" });
      return;
    }
    let token = null;
    await fcm
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log("FCM TOKEN", fcmToken);
          token = fcmToken;
        } else { console.warn("Error"); }
      })
      .catch(err => { console.warn("Error", err); });
    let param = {};
    param["email"] = this.state.email;
    param["password"] = this.state.password;
    param["firebase_token"] = token;
    const res = await _fetch("login", param);
    if (res.includes("Wrong credentials!")) {
      alert("Wrong credentials!");
    } else if (res.includes("false") || res.includes(false)) {
      this.props.navigation.navigate("Verification");
    } else if (res.includes("true") || res.includes(true)) {
      _deleteData("id");
      _storeData(this.state.email);
      this.props.navigation.navigate(this.state.backTo);
    } else {
      alert(res);
    }
  };
}
export default index;