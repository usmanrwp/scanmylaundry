/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-floating-decimal */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button, ToastAndroid, ImageBackground } from 'react-native';


import {
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  FlatList,
  Dimensions,
  BackHandler

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import _retrieveData from "../../local_cache/_retrieveData";



var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
export class LoginMain extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);



  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  retrieveEmail = async () => {
    const res = await _retrieveData();
    console.warn(res);

    if (res.includes("Empty_LocalCache")) {
      this.setState({
        loading: false,
        email: ""
      });
    } else {
      // await _deleteData("id");
      // return;
      this.props.navigation.navigate("Profile", { rb: "Dashboard" });
    }
  };

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
            // user doesn't have permission
            console.warn("disable");
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
          console.warn("true");
          resolve(true);
        })
        .catch(error => {
          console.warn("false", error);
          resolve(false);
        });
    });
  };



  render() {

    return (
      <View style={styles.container}>

        <Image source={require('../../Images/laundry.jpg')} style={styles.image}>

        </Image>


        <View style={{
          backgroundColor: 'white', position: 'absolute', bottom: 0, width: screen_size_width * 1,
          height: screen_size_height * .55, borderTopLeftRadius: 20, borderTopRightRadius: 20,
          alignContent: "center", alignItems: 'center', paddingLeft: 20, paddingRight: 20
        }}>

          <Image source={require('../../Images/logo_h.png')}
            style={{ height: 55, width: 45, marginTop: 14 }}
            resizeMode={"contain"} />

          <Text style={{ fontWeight: "bold", fontSize: 34, color: "#446BD6" }} >ScanMyLaundry</Text>
          <Text style={{ fontSize: 17, marginTop: 11, textAlign: "center" }}>Replacing Stress with Quality Time </Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient1}>
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginTop: 22 }}
            onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Text style={{ color: "#446BD6", fontSize: 16 }}>
              Skip to Home
            </Text>
          </TouchableOpacity>



        </View>



      </View>
    );
  }
}

export default LoginMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    //justifyContent: 'center',
    //paddingTop: '8%',
    // marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  image: {
    // resizeMode: "",
    width: screen_size_width * 1, height: screen_size_height * .5,


  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 22,

    borderRadius: 23,
    width: screen_size_width * .9,

  },
  linearGradient1: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 10,

    borderRadius: 23,
    width: screen_size_width * .9,

  },
  buttonText: {
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

});
