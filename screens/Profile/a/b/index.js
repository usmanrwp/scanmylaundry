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
  Linking
} from "react-native";

import {  Button, Card, CardItem, Left, Body, Right, Title, Header } from 'native-base';

import styles from "./style";
import Header_ from "../../components/Header";
import Toast_ from "../../functions/Toast_";
import Edit_Text from "../../components/Edit_Text";
import Cache_Image from "../../components/Cache_Image";
import Text from "../../components/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import _fetch from "../../fetch_function/_fetch";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import _retrieveData from "../../local_cache/_retrieveData";
import _deleteData from "../../local_cache/_deleteData";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cp: true,
      cpIcon: "ios-eye-off",
      name: "",
      email: "",
      mobile: "",
      phone: "",
      town: "",
      city: "",
      county: "",
      postal_code: "",
      error_name: "",
      error_email: "",
      error_mobile: "",
      error_phone: "",
      error_town: "",
      error_city: "",
      error_county: "",
      error_postal_code: "",
      placeSet: false,
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
      backTo: "",
      moreModalVisible: false
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
    const email = await this.retrieveEmail();
    this.setState({
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
    // if (Platform.OS === "ios") {
    //   this.cLocation();
    // } else {
    // const permissionres = await this.getPermission();
    // if (permissionres === true) {
    this.cLocation();
    //   }
    // }
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

  townText = text => {
    let reg = /^[ \w@./#&+-]*$/;
    if (reg.test(text) === false) {
      this.setState({ town: text, error_town: "Invalid" });
      return false;
    } else {
      this.setState({ town: text, error_town: "" });
      return true;
    }
  };

  cityText = text => {
    let reg = /^[ \w@./#&+-]*$/;
    if (reg.test(text) === false) {
      this.setState({ city: text, error_city: "Invalid" });
      return false;
    } else {
      this.setState({ city: text, error_city: "" });
      return true;
    }
  };

  countyText = text => {
    let reg = /^[ \w@./#&+-]*$/;
    if (reg.test(text) === false) {
      this.setState({ county: text, error_county: "Invalid" });
      return false;
    } else {
      this.setState({ county: text, error_county: "" });
      return true;
    }
  };

  postalCodeText = text => {
    let reg = /^[ \w@./#&+-]*$/;
    if (reg.test(text) === false) {
      this.setState({ postal_code: text, error_postal_code: "Invalid" });
      return false;
    } else {
      this.setState({ postal_code: text, error_postal_code: "" });
      return true;
    }
  };

  headerBackPress = () => {
    this.props.navigation.navigate(this.state.backTo);
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

    let address = "false";
    let town = "false";
    let county = "false";
    let postal_code = "false";

    let location = res;
    location.results[0].address_components.forEach(component => {
      if (component.types.indexOf("administrative_area_level_2") !== -1) {
        county = component.long_name;
      }

      if (component.types.indexOf("postal_code") !== -1) {
        postal_code = component.long_name;
      }

      if (component.types.indexOf("sublocality_level_1") !== -1) {
        town = component.long_name;
      }

      if (component.types.indexOf("route") !== -1) {
        address = component.long_name;
      }
    });

    this.setState({
      lastLat: this.state.animateLat,
      lastLong: this.state.animateLong,
      placeSet: true,
      town,
      city: address,
      county,
      postal_code,
      mapRegion: region,
      mapVisible: false
    });
  };

  getPermission() {
    return new Promise(async function(resolve, reject) {
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
    const param = {};
    param["email"] = this.state.email;
    const res = await _fetch("read_user_profile", param);
    console.warn("read_user_profile", res);

    // this.setState({
    //   name: res[0].Name,
    //   city: res[0].Address,
    //   town: res[0].Town,
    //   county: res[0].County,
    //   postal_code: res[0].Postcode,
    //   phone: res[0].Tel,
    //   mobile: res[0].Mobile,
    //   placeSet: true
    // });
  };

  onRegionChange(region, lastLat, lastLong) {
    let r = {
      latitude: this.state.animateLat || -36.82339,
      longitude: this.state.animateLong || -73.03569
    };
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
      animateLat: lastLat || this.state.lastLat,
      animateLong: lastLong || this.state.lastLong,
      coordinate: r
    });
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
      // coordinate.timing(newCoordinate).start();
      // if (this.marker) {
      //   this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
      // }
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    } else {
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
    return new Promise(async function(resolve, rejcet) {
      // Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4"); // use a valid API key
      url =
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

  morePress = () => {
    this.setState({
      moreModalVisible: true
    });
  };

  render() {
    /* Email Password Address 1 2 Town County Post Code telephone mobile number  Name */

    return (
      <View style={styles.appContainer}>
        {this.moreModal()}
        <View>
          <Header_
            title="Profile"
            left
            back
            onBackPress={this.headerBackPress}
            right
            rightIcon1
            rightIcon1Name="ios-more"
            rightIcon1Press={this.morePress}
          />
        </View>
        {this.mapModal()}
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.bodyContainer}>
              <View style={styles.editTextStyle}>
                <Edit_Text
                  labelText="Name"
                  value={this.state.name}
                  onChangeText={name => this.nameText(name)}
                  error={this.state.error_name}
                />
              </View>

              <View style={styles.editTextStyle}>
                <Edit_Text
                  labelText="Email"
                  value={this.state.email}
                  keyboardType="email-address"
                  disabled
                  labelHeight={20}
                  onChangeText={email => this.emailText(email)}
                  error={this.state.error_email}
                />
              </View>

              <View style={styles.editTextStyle}>
                <Edit_Text
                  labelText="Mobile Number"
                  value={this.state.mobile}
                  keyboardType="phone-pad"
                  onChangeText={mobile => this.mobileText(mobile)}
                  error={this.state.error_mobile}
                />
              </View>

              <View style={styles.editTextStyle}>
                <Edit_Text
                  labelText="Phone Number"
                  value={this.state.phone}
                  keyboardType="phone-pad"
                  onChangeText={phone => this.phoneText(phone)}
                  error={this.state.error_phone}
                />
              </View>

              {this.state.placeSet === false ? (
                <TouchableOpacity
                  style={styles.editTextStyle}
                  onPress={() =>
                    this.setState({ mapVisible: true, error_city: "" })
                  }
                >
                  <Edit_Text
                    labelText="Address"
                    value=""
                    disabled
                    labelHeight={20}
                    onChangeText={() => {}}
                    error={this.state.error_city}
                  />
                </TouchableOpacity>
              ) : this.state.address === "false" ? null : (
                <TouchableOpacity
                  style={styles.editTextStyle}
                  onPress={() => this.setState({ mapVisible: true })}
                >
                  <Edit_Text
                    labelText="Address"
                    value={this.state.city}
                    onChangeText={city => this.cityText(city)}
                    error={this.state.error_city}
                    disabled
                    labelHeight={20}
                  />
                </TouchableOpacity>
              )}

              {this.state.placeSet === false ? null : this.state.town ===
                "false" ? null : (
                <TouchableOpacity
                  style={styles.editTextStyle}
                  onPress={() => this.setState({ mapVisible: true })}
                >
                  <Edit_Text
                    labelText="Town"
                    value={this.state.town}
                    onChangeText={town => this.townText(town)}
                    error={this.state.error_town}
                    disabled
                    style={{ color: "red" }}
                    labelHeight={20}
                  />
                </TouchableOpacity>
              )}

              {this.state.placeSet === false ? null : this.state.county ===
                "false" ? null : (
                <TouchableOpacity
                  style={styles.editTextStyle}
                  onPress={() => this.setState({ mapVisible: true })}
                >
                  <Edit_Text
                    labelText="County"
                    value={this.state.county}
                    onChangeText={county => this.countyText(county)}
                    error={this.state.error_county}
                    disabled
                    labelHeight={20}
                  />
                </TouchableOpacity>
              )}

              {this.state.placeSet === false ? null : this.state.postal_code ===
                "false" ? null : (
                <TouchableOpacity
                  style={styles.editTextStyle}
                  onPress={() => this.setState({ mapVisible: true })}
                >
                  <Edit_Text
                    labelText="Postal Code"
                    value={this.state.postal_code}
                    onChangeText={postal_code =>
                      this.postalCodeText(postal_code)
                    }
                    error={this.state.error_postal_code}
                    disabled
                    labelHeight={20}
                  />
                </TouchableOpacity>
              )}

              {/* END OF EDIT TEXT */}

              {/* BUTTON START */}
              <View
                style={{
                  flex: 1,
                  // position: "absolute",
                  width: "90%",
                  marginLeft: 10,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flexDirection: "column"
                }}
              >
                <CustomButton
                  text="Update"
                  iconLeft
                  iconLeftName="save"
                  onPress={this.signupPress}
                />
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
                    ref={marker => {
                      this.marker = marker;
                    }}
                    coordinate={this.state.coordinate}
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

  moreModal = () => {
    return (
      <Modal
        transparent={true}
        visible={this.state.moreModalVisible}
        onRequestClose={() => {
          this.setState({
            moreModalVisible: false
          });
        }}
      >
        <View style={styles.moreModalApp}>
          <View style={styles.moreModalContainer}>
            <TouchableOpacity onPress={this.helpPress}>
              <Text style={styles.moreModalText}>Help</Text>
            </TouchableOpacity>
            <View style={styles.moreModalDivider} />
            <TouchableOpacity onPress={this.logoutPress}>
              <Text style={styles.moreModalText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  helpPress = () => {
    this.setState({
      moreModalVisible: false
    });
    const url = "https://www.google.com";
    Linking.openURL(url);
  };

  logoutPress = async () => {
    this.setState({
      moreModalVisible: false
    });
    const res = await _retrieveData();
    console.warn(res);
    if (res.includes("Empty_LocalCache")) {
      Toast_("Not login!");
    } else {
      await _deleteData();
      this.props.navigation.navigate("Dashboard");
    }
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
    if (this.state.phone === "") {
      this.setState({
        error_phone: "Please enter phone number"
      });
      return;
    }
    if (this.state.placeSet === false) {
      this.setState({
        error_city: "Please enter Address"
      });
      return;
    }

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
    if (!(this.state.error_phone === "")) {
      this.setState({
        error_mobile: "Please enter valid phone number"
      });
      return;
    }
    if (!(this.state.error_city === "")) {
      this.setState({
        error_city: "Please enter Address"
      });
      return;
    }
    console.warn("Lattitude", this.state.animateLat);

    let param = {};
    param["name"] = this.state.name;
    param["email"] = this.state.email;
    param["town"] = this.state.town;
    param["address"] = this.state.city;
    param["county"] = this.state.county;
    param["postal_code"] = this.state.postal_code;
    param["latitude"] = this.state.animateLat;
    param["longitude"] = this.state.animateLong;
    param["phone"] = this.state.phone;
    param["mobile"] = this.state.mobile;

    const res = await _fetch("add_user_profile", param);
    if (res.includes("Record created successfully")) {
      Toast_("Details updated");
    } else {
      Toast_(res);
    }
  };
}

export default index;
