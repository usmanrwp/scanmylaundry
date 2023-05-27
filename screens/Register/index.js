import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  BackHandler,
  ImageBackground
} from "react-native";
import styles from "./style";
import Header_ from "../../components/Header";
import Toast_ from "../../functions/Toast_";
import Edit_Text from "../../components/Edit_Text";
import Text from "../../components/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import _fetch from "../../fetch_function/_fetch";
import Colors from "../../constants/Colors";
import _storeData from "../../local_cache/_storeData";
import _deleteData from "../../local_cache/new/_deleteData";
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
            // console.warn("enable");
            resolve(true);
          } else {
            // user doesn't have permission
            // console.warn("disable");
            this.requestPermissions();
            resolve(false);
          }
        });
    });
  };

  requestPermissions = () => {
    return new Promise((resolve, reject) => {
      fcm
        .messaging()
        .requestPermission()
        .then(() => {
          // console.warn("true");
          resolve(true);
        })
        .catch(error => {
          console.warn("false", error);
          resolve(false);
        });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      cp: true,
      cp1: true,
      cpIcon: "ios-eye-off",
      cpIcon1: "ios-eye-off",
      agreeIcon: "ios-square-outline",
      agreeColor: Colors.black,
      email: "",
      password: "",
      confirm_password: "",
      error_email: "",
      error_password: "",
      error_confirm_password: "",
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

    // alert(rb);
    this.setState({
      backTo: rb
    });
    const r = await this.checkPermissions();
    // console.warn("response", r);
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

  cp1Press = () => {
    if (this.state.cp1 === false) {
      this.setState({
        cp1: true,
        cpIcon1: "ios-eye-off"
      });
    } else {
      this.setState({
        cp1: false,
        cpIcon1: "ios-eye"
      });
    }
  };

  emailText = text => {

    this.setState({ email: text, error_email: "" });
    return true;

  };

  passwordText = text => {
    if (this.state.confirm_password === text) {
      this.setState({
        error_confirm_password: ""
      });
    }
    this.setState({
      password: text,
      error_password: ""
    });
  };

  confirmPasswordText = text => {
    if (this.state.password === "") {
      this.setState({
        error_confirm_password: "Enter Password First",
        confirm_password: ""
      });
    } else {
      if (this.state.password === text) {
        this.setState({
          error_confirm_password: ""
        });
      } else {
        this.setState({
          error_confirm_password: "Password not match"
        });
      }
      this.setState({
        confirm_password: text
      });
    }
  };

  agreePress = () => {
    if (this.state.agreeIcon === "ios-square-outline") {
      this.setState({
        agreeIcon: "ios-checkbox-outline",
        agreeColor: Colors.black
      });
    } else {
      this.setState({
        agreeIcon: "ios-square-outline",
        agreeColor: Colors.black
      });
    }
  };

  render() {
    /* Email Password Address 1 2 Town County Post Code telephone mobile number  Name */

    //   <View>
    //   <Header_ title=" Essex Laundryy" />
    // </View>

    return (
      <View style={styles.appContainer}>

        <ImageBackground source={require('../../Images/laundry.jpg')} style={styles.image_background}>
          <View style={{ backgroundColor: 'rgba(68,107,214,0.7)', flex: 1 }}   >

            <View style={{ flex: 1 }}>
              <View style={{ flex: 1.5 }}>
                <View style={styles.back_button}>

                  <Icon
                    name="md-arrow-back"
                    size={30}
                    color="#fff"
                    onPress={() => this.props.navigation.goBack()}
                  />

                </View>

              </View>
              <View style={{ flex: 1, alignSelf: 'center' }}>

                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 28,
                    alignSelf: 'center',

                    // fontFamily: "Raleway-BoldItalic"
                  }}
                >
                  Sign up
                </Text>


                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 5,
                    marginBottom: 15,
                    // fontFamily: "Raleway-BoldItalic"
                  }}
                >
                  Sign up below to create your account
                </Text>

              </View>
            </View>
            <View style={styles.mid_view}>



              <ScrollView>
                <View style={styles.bodyContainer}>

                  <Text style={[styles.input_placeholder]}>Email Address</Text>
                  <View style={[styles.email_inputfield, { height: 50 }]}>
                    <Edit_Text
                      // labelText="Email"
                      value={this.state.email}
                      keyboardType="email-address"
                      onChangeText={email => this.emailText(email)}
                      error={this.state.error_email}
                    />
                  </View>





                  <Text style={styles.input_placeholder}>Password</Text>
                  <View style={[styles.email_inputfield, { height: 50 }]}>

                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        flex: 1,
                        marginBottom: 10
                      }}
                    >
                      <Icon
                        name={this.state.cpIcon}
                        size={28}
                        color="#00"
                        onPress={() => this.cpPress()}
                      />
                    </View>



                    <View
                      style={{
                        flex: 1,
                        position: "absolute",
                        width: "94%",
                        marginLeft: 10,
                        // backgroundColor:"black"
                      }}
                    >
                      <Edit_Text
                        // labelText="Password"
                        secureTextEntry={this.state.cp}
                        value={this.state.password}
                        onChangeText={password => this.passwordText(password)}
                        error={this.state.error_password}
                      // onFocus={() =>
                      //   this.confirmPasswordText(this.state.confirm_password)
                      // }
                      // onBlur={() =>
                      //   this.confirmPasswordText(this.state.confirm_password)
                      // }
                      />
                    </View>

                  </View>





                  <Text style={styles.input_placeholder}>Confirm Password</Text>
                  <View style={[styles.email_inputfield, { height: 50 }]}>

                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        flex: 1,
                        marginBottom: 10
                      }}
                    >
                      <Icon
                        name={this.state.cpIcon1}
                        size={28}
                        color="#00"
                        onPress={() => this.cp1Press()}
                      />
                    </View>



                    <View
                      style={{
                        flex: 1,
                        position: "absolute",
                        width: "94%",
                        marginLeft: 10
                      }}
                    >
                      <Edit_Text
                        // labelText="Confirm Password"
                        secureTextEntry={this.state.cp1}
                        value={this.state.confirm_password}
                        onChangeText={confirm_password =>
                          this.confirmPasswordText(confirm_password)
                        }
                        error={this.state.error_confirm_password}
                        onFocus={() =>
                          this.confirmPasswordText(this.state.confirm_password)
                        }
                        onBlur={() =>
                          this.confirmPasswordText(this.state.confirm_password)
                        }
                      />
                    </View>

                  </View>
                  {/* END OF EDIT TEXT */}



                  <View style={{ alignSelf: 'center' }}>

                    <View style={{ flexDirection: 'row', marginTop: 2, }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          // flex: 1,
                          // alignItems: "flex-start",
                          // justifyContent: "flex-start",
                          // width: "90%",
                          // marginLeft: 30,
                          // marginTop: 20
                        }}
                        onPress={() => this.agreePress()}
                      >
                        {/* <View  style={{backgroundColor:'#EDEEF0'}}> */}
                        <Icon
                          name={this.state.agreeIcon}
                          size={28}
                          color={this.state.agreeColor}
                        />

                        {/* </View> */}

                        <Text
                          style={{
                            textAlign: 'left',
                            color: this.state.agreeColor,
                            paddingLeft: 17,
                            paddingTop: 5,
                            fontSize: 13
                          }}
                        >
                          By clicking Sign Up, you agree to our
                        </Text>


                      </TouchableOpacity>




                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>

                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL("https://scanmylaundry.com/view/terms/");
                        }}
                      >
                        <Text
                          style={{
                            // color: Colors.black,
                            paddingLeft: 10,
                            paddingTop: 5,
                            fontSize: 13,
                            paddingLeft: 17,
                            color: '#446BD6'
                          }}
                        >
                          Terms and Conditions
                        </Text>
                      </TouchableOpacity>


                      <Text
                        style={{
                          color: Colors.black,
                          paddingLeft: 4,
                          paddingTop: 5,
                          fontSize: 13,
                          // color:'#446BD6'
                        }}
                      >
                        and
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL("https://scanmylaundry.com/view/privacy/");
                        }}
                      >
                        <Text
                          style={{
                            // color: Colors.black,
                            paddingLeft: 5,
                            paddingTop: 5,
                            fontSize: 13,
                            color: '#446BD6'
                          }}
                        >
                          policy
                        </Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                  {/* BUTTON START */}
                  {/* <View
                    style={{
                      flex: 1,
                      // position: "absolute",
                      width: "90%",
                      marginLeft: 10,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      flexDirection: "column"
                    }}
                  > */}
                  {/* <CustomButton
                      text="Sign up"
                      iconLeft
                      iconLeftName="user-plus"
                      onPress={this.signupPress}
                    /> */}



                  <TouchableOpacity onPress={this.signupPress}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                      <Text style={styles.buttonText}>
                        Sign up
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: Colors.black,
                    paddingLeft: 10,
                    paddingTop: 5,
                    fontSize: 14
                  }}
                >
                  Have Account? Login
                </Text>
              </TouchableOpacity> */}
                  {/* </View> */}
                </View>
              </ScrollView>


            </View>
            <View style={{ flex: 0.25, backgroundColor: 'white' }}>

              <View style={{
                backgroundColor: '#EDEEF0', borderTopLeftRadius: 25,
                borderTopRightRadius: 25, alignItems: 'center',
                // marginTop: 10 ,
              }}>


                <View style={{
                  flexDirection: 'row', marginTop: 10
                }}>

                  <Text
                    style={{
                      color: this.state.agreeColor,

                      paddingTop: 5,
                      fontSize: 14,
                      textAlign: 'center',
                      marginRight: 5,
                      // marginBottom: 20
                    }}
                  >
                    Have Account?
                  </Text>


                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        color: 'purple',

                        paddingTop: 5,
                        paddingBottom: 15,
                        fontSize: 14,
                        textAlign: 'center',
                        textDecorationLine: 'underline'
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>

                </View>



              </View>





            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  pay = async () => { };

  signupPress = async () => {


    if (this.state.email === "") {
      this.setState({
        error_email: "Please enter email"
      });
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      this.setState({ error_email: "Invalid Email Address" });
      return;
    }

    if (this.state.password === "") {
      this.setState({
        error_password: "Please enter password"
      });
      return;
    }
    if (this.state.confirm_password === "") {
      this.setState({
        error_confirm_password: "Please enter password"
      });
      return;
    }
    if (!(this.state.error_email === "")) {
      this.setState({
        error_email: "Please enter valid email"
      });
      return;
    }
    if (!(this.state.error_confirm_password === "")) {
      this.setState({
        error_confirm_password: "Password doesnot match"
      });
      return;
    }

    if (this.state.agreeIcon === "ios-square-outline") {
      this.setState({
        agreeColor: "red"
      });
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
        } else {
        }
      })
      .catch(err => {
        console.warn("Error", err);
      });

    let param = {};
    param["email"] = this.state.email;
    param["password"] = this.state.password;
    param["firebase_token"] = token;

    // var x = this.state.email;
    // alert(x.charAt(0)); // alerts 's'
    // param["image"] = this.state.password;

    let res = await _fetch("register", param);
    // console.warn("Register", res);

    res = res.toLowerCase();
    if (res.includes("user already exist")) {
      Toast_("Already Exist please Login!");
      this.props.navigation.navigate("Login", { rb: this.state.backTo });
    } else if (res.includes("User blocked")) {
      Toast_("Account is blocked!");
    } else if (res === "record created successfully") {
      _deleteData("id");
      _storeData(this.state.email);
      Toast_(res);
      this.props.navigation.navigate("Profile", { rb: this.state.backTo });
    } else {
      Toast_(res);
    }
  };
}

export default index;
