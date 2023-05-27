import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Platform,
  PermissionsAndroid,
  BackHandler,
  Text,
  Linking
} from "react-native";

import { Icon, Button, Left, Body, Right, Title, Header } from 'native-base';
import styles from "./style";
import Header_ from "../../../components/Header";
import Toast_ from "../../../functions/Toast_";
import Edit_Text from "../../../components/Edit_Text";
import Cache_Image from "../../../components/Cache_Image";
import CustomButton from "../../../components/CustomButton";
import _fetch from "../../../fetch_function/_fetch";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import _retrieveData from "../../../local_cache/_retrieveData";
import _deleteData from "../../../local_cache/_deleteData";
import TabViewLoader from "../../../components/TabViewLoader";
import Profile from "../index";
import DisableEditText from "../../../components/DisableEditText";
import ButtonPressLoader from "../../../components/ButtonPressLoader";
import { Footer } from "native-base";
import Colors from "../../../constants/Colors";
import LinearGradient from 'react-native-linear-gradient';


let profileThis;
let navigation_;
let backTo_;
const profile = null;

// const { navigation } = this.props;
// 

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cp: true,
      cpIcon: "ios-eye-off",
      name: "",
      email: "",
      mobile: "",
      phone: "",
      address: "",
      postal_code: "",
      error_name: "",
      error_email: "",
      error_mobile: "",
      error_phone: "",
      error_address: "",
      error_postal_code: "",
      mapVisible: false,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      mapRegionCurrent: null,
      latCurrent: null,
      longCurrent: null,
      animateLat: null,
      animateLong: null,
      isMapReady: false,
      loading: true,
      updateLoading: false,
      backTo: ''
    };
  }

  retrieveEmail = async () => {
    const res = await _retrieveData();

    if (res.includes("Empty_LocalCache")) {
      return "empty";
    } else {
      this.setState({
        email: res
      });
      return res;
    }
  };


  componentWillUnmount() {
    // BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    // this.props.navigation.navigate(this.state.backTo);
    // return true;
    // this.props.navigation.goBack()
  };

  componentDidMount = async () => {
    // this.backPressed = this.backPressed.bind(profileThis);
    // BackHandler.addEventListener("hardwareBackPress", this.backPressed);

    const email = await this.retrieveEmail();
    await this.setState({
      email
    });
    this.loadData();
    if (Platform.OS === "ios") {
      // your code using Geolocation and asking for authorisation with
      Geolocation.requestAuthorization();
      await this.currentLocation();
    } else {
      const permissionres = await this.getPermission();
      if (permissionres === true) {
        await this.currentLocation();
      }
    }
  };

  currentLocation = async () => {
    this.cLocation();
  };

  cLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.setState({
          mapRegionCurrent: region,
          latCurrent: position.coords.latitude,
          longCurrent: position.coords.longitude,
          animateLat: position.coords.latitude,
          animateLong: position.coords.longitude
        });
        this.onRegionChange(
          region,
          position.coords.latitude,
          position.coords.longitude
        );
      },
      error => {
        if (error.message.includes("No location provider available")) {
          Toast_("Please Enable Location");
        }
      },
      { enableHighAccuracy: false, timeout: 20000 }
    );
  };

  nameText = text => {
    let reg = /^(\s*)([a-zA-Z| ]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_name: "Name is only in English alphabet",
        name: text
      });
      return false;
    } else {
      const obj = new Profile();
      obj.changeName(text, profileThis);
      this.setState({
        error_name: "",
        name: text
      });
      return true;
    }
  };

  emailText = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, error_email: "Invalid" });
      return false;
    } else {
      this.setState({ email: text, error_email: "" });
      return true;
    }
  };

  mobileText = text => {
    let reg = /^(\s*)([0-9]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_mobile: "Invalid",
        mobile: text
      });
      return false;
    } else {
      this.setState({
        error_mobile: "",
        mobile: text
      });
      return true;
    }
  };

  phoneText = text => {
    let reg = /^(\s*)([0-9]*)(\s*)$/;
    if (reg.test(text) === false) {
      this.setState({
        error_phone: "Invalid",
        phone: text
      });
      return false;
    } else {
      this.setState({
        error_phone: "",
        phone: text
      });
      return true;
    }
  };



  modalHeaderSavePress = async () => {
    let region = {
      latitude: this.state.animateLat,
      longitude: this.state.animateLong,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    const res = await this.locationDetails(
      this.state.animateLat,
      this.state.animateLong
    );

    let address = res.results[0].formatted_address;
    console.warn("Componenet", address);

    this.setState({
      lastLat: this.state.animateLat,
      lastLong: this.state.animateLong,
      address,
      mapRegion: region,
      mapVisible: false
    });
  };

  getPermission() {
    return new Promise(async function (resolve, reject) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted) {
        resolve(true);
      } else {
        let grant = null;
        do {
          grant = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "ScanMyLaundry Location Permission",
              message:
                "ScanMyLaundry App needs access to your location " +
                "so we collect your item.",
              // buttonNeutral: "Ask Me Later",
              // buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
        } while (!(grant === PermissionsAndroid.RESULTS.GRANTED));
        resolve(true);
      }
    });
  }

  loadData = async () => {
    let param = {};
    param["email"] = this.state.email;

    let res = await _fetch("read_user_profile", param);
    console.warn("read_user_profile", res);
    let name = res[0].Name;
    let address = res[0].Address;
    let phone = res[0].Tel;
    let mobile = res[0].Mobile;

    if (name === "null" || name === null || name === "NA") {
      name = "";
    }
    if (address === "null" || address === null || address === "NA") {
      address = "";
    }
    if (phone === "null" || phone === null || phone === "NA") {
      phone = "";
    }
    if (mobile === "null" || mobile === null || mobile === "NA") {
      mobile = "";
    }

    await this.setState({
      name,
      address,
      // postal_code,
      phone,
      mobile,
      loading: false
    });
  };

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
      animateLat: lastLat || this.state.lastLat,
      animateLong: lastLong || this.state.lastLong
    });
    console.warn("Map REGION:\n", region);
  }

  onMapPress = e => {
    let region = {
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  };

  async animate(e) {
    await this.setState({
      animateLat: e.latitude,
      animateLong: e.longitude
    });
    const newCoordinate = {
      latitude: e.latitude,
      longitude: e.longitude
    };

    if (Platform.OS === "android") {
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    } else {
      const { coordinate } = this.state;
      coordinate.timing(newCoordinate).start();
    }
  }

  gotoCurrentLocation = () => {
    let region = {
      latitude: this.state.latCurrent,
      longitude: this.state.longCurrent,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  locationDetails(latitude, longitude) {
    return new Promise(async function (resolve, rejcet) {
      // Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4"); // use a valid API key
      let url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        latitude +
        "," +
        longitude +
        "&key=AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4";
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          return responseJson;
        })
        .catch(err => {
          console.log("Location Details==>", err);
          rejcet("error");
          return "error";
        });
    });
  }

  render() {
    if (this.state.loading) {
      return <TabViewLoader />;
    }
    return (
      <View style={styles.appContainer}>
        {this.mapModal()}

        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.bodyContainer}>
              <Text style={{ color: 'black', marginLeft: 15, marginBottom: 5 }}>Name</Text>
              <View style={styles.editTextStyle}>
                <Edit_Text
                  // labelText="Name"
                  value={this.state.name}
                  onChangeText={name => this.nameText(name)}
                  error={this.state.error_name}
                />
              </View>
              <Text style={{ color: 'black', marginLeft: 15, marginBottom: 5, marginTop: 5 }}>Email</Text>
              <View style={styles.editTextStyle}>
                <Edit_Text
                  // labelText="Email"
                  value={this.state.email}
                  keyboardType="email-address"
                  disabled
                  // labelHeight={20}
                  onChangeText={email => this.emailText(email)}
                  error={this.state.error_email}
                />
              </View>
              <Text style={{ color: 'black', marginLeft: 15, marginBottom: 5, marginTop: 5 }}>Mobile Number</Text>

              <View style={styles.editTextStyle}>
                <Edit_Text
                  // labelText="Mobile Number"
                  value={this.state.mobile}
                  keyboardType="phone-pad"
                  onChangeText={mobile => this.mobileText(mobile)}
                  error={this.state.error_mobile}
                />
              </View>
              {/* <Text style={{color:'black', marginLeft: 15, marginBottom: 5, marginTop:5}}>Phone Number</Text>
              
              <View style={styles.editTextStyle}>
                <Edit_Text
                  // labelText="Phone Number"
                  value={this.state.phone}
                  keyboardType="phone-pad"
                  onChangeText={phone => this.phoneText(phone)}
                  error={this.state.error_phone}
                />
              </View>
              <Text style={{color:'black', marginLeft: 15, marginBottom: 5, marginTop:5}}>Address</Text>
              
              <View style={styles.editTextStyle_add}>
                <DisableEditText
                  onPress={() => this.setState({ mapVisible: true })}
                  value={this.state.address}
                  // title="Addresss"
                />
              </View> */}

              {/* END OF EDIT TEXT */}

              {/* BUTTON START */}




              <View style={{ flexDirection: 'row' }}>

                {this.state.updateLoading ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      alignSelf: "flex-end",
                      alignContent: "flex-end",
                      top: 20,
                      right: 40
                    }}
                  >
                    <ButtonPressLoader />
                  </View>
                ) : (




                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this.signupPress}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                      <Text style={styles.buttonText1}>
                        Update
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => navigation_.navigate('ForgetPassword')}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText1}>
                      Change Password
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>


              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => Linking.openURL('https://scanmylaundry.com/view/faq/#faqs')}
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText1}>
                      FAQs
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => Linking.openURL('https://scanmylaundry.com/view/terms/')}
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText1}>
                      Terms {'&'} Conditions
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => Linking.openURL('https://scanmylaundry.com/view/privacy/')}
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText1}>
                      Privacy Policy
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => Linking.openURL('https://scanmylaundry.com/view/contact_updated/#support')}
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText1}>
                      Support
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  mapModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.mapVisible}
        style={styles.mapModalContainer}
        onRequestClose={() => {
          this.setState({
            mapVisible: false
          });
        }}
      >
        {this.state.mapVisible === false ? null : (
          <View>
            <View>
              <Header_
                title="Select Address"
                left
                back
                onBackPress={() => this.setState({ mapVisible: false })}
                save
                savePress={this.modalHeaderSavePress}
              />
            </View>
            <View style={styles.mapModalContainer}>
              <MapView
                style={styles.mapModal}
                provider={PROVIDER_GOOGLE}
                region={this.state.mapRegion}
                loadingEnabled={true}
                loadingBackgroundColor="transparent"
                loadingIndicatorColor="#000000"
                cacheEnabled={true}
                onPress={event => this.animate(event.nativeEvent.coordinate)}
                onLayout={this.onMapLayout}
              >
                {this.state.isMapReady && (
                  <MapView.Marker.Animated
                    coordinate={{
                      latitude: this.state.animateLat || -36.82339,
                      longitude: this.state.animateLong || -73.03569
                    }}
                  />
                )}
              </MapView>
            </View>
            <View style={styles.show_on_map1}>
              <TouchableOpacity onPress={() => this.gotoCurrentLocation()}>
                <View style={styles.show_on_map_logo_live}>
                  <Cache_Image
                    uri="https://img.icons8.com/metro/208/000000/north-direction.png"
                    style={{
                      height: 60,
                      width: 60
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    );
  };

  signupPress = async () => {
    if (this.state.name === "") {
      this.setState({
        error_name: "Please enter name"
      });
      return;
    }
    if (this.state.mobile === "") {
      this.setState({
        error_mobile: "Please enter mobile number"
      });
      return;
    }
    // if (this.state.phone === "") {
    //   this.setState({
    //     error_phone: "Please enter phone number"
    //   });
    //   return;
    // }

    if (!(this.state.error_name === "")) {
      this.setState({
        error_name: "Please enter valid name"
      });
      return;
    }
    if (!(this.state.error_mobile === "")) {
      this.setState({
        error_mobile: "Please enter valid mobile number"
      });
      return;
    }
    // if (!(this.state.error_phone === "")) {
    //   this.setState({
    //     error_mobile: "Please enter valid phone number"
    //   });
    //   return;
    // }
    // if (!(this.state.error_address === "")) {
    //   this.setState({
    //     error_address: "Please enter Address"
    //   });
    //   return;
    // }
    this.setState({
      updateLoading: true
    });
    let param = {};
    param["name"] = this.state.name;
    param["email"] = this.state.email;
    // param["phone"] = this.state.phone;
    // param["phone"] = "1234567";
    param["mobile"] = this.state.mobile;
    // param["address"] = this.state.address;
    // param["address"] = "abc";
    // param["latitude"] = this.state.animateLat;
    // param["latitude"] = "123";
    // param["longitude"] = this.state.animateLong;
    // param["longitude"] = "123";

    const res = await _fetch("add_agent_profile", param);
    console.warn("add_agent_profile", res);

    if (res.includes("Record created successfully")) {
      Toast_("Details updated");
      navigation_.navigate(backTo_);
    } else {
      Toast_(res);
    }
    this.setState({
      updateLoading: false
    });
  };

  navigate_data = (pt, navigation, rb) => {
    profileThis = pt;
    navigation_ = navigation;
    backTo_ = rb;

    this.componentDidMount();
  };


}
