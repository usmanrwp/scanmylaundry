import React, { Component } from "react";
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";

import { Icon, Button, Card, CardItem, Left, Body, Right, Title, Header } from 'native-base';
import Header_ from "../../components/Header";
import Text from "../../components/CustomText";
import Toast_ from "../../functions/Toast_";
import Edit_Text from "../../components/Edit_Text";
import Cache_Image from "../../components/Cache_Image";
import styles from "./style";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      mapVisible: false,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      mapRegionCurrent: null,
      latCurrent: null,
      longCurrent: null,
      animateLat: null,
      animateLong: null
    };
  }

  modalHeaderSavePress = () => {
    let region = {
      latitude: this.state.animateLat,
      longitude: this.state.animateLong,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.setState({
      lastLat: this.state.animateLat,
      lastLong: this.state.animateLong,
      mapRegion: region,
      mapVisible: false
    });
  };

  componentWillUnmount() {
    // Geolocation.clearWatch();
  }

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

  componentDidMount = async () => {
    const permissionres = await this.getPermission();
    if (permissionres === true) {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922 * 3.5,
            longitudeDelta: 0.00421 * 3.5
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
        { enableHighAccuracy: true, timeout: 20000 }
      );
    }
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

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <View>
          <Header_
            title="Your Basket"
            left
            back
            onBackPress={this.headerBackPress}
          />
        </View>
        {this.mapModal()}
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.mapContainer}
            onPress={() => {
              this.setState({
                mapVisible: true
              });
            }}
          >
            <MapView
              // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              cacheEnabled
              // followsUserLocation
              loadingEnabled
              loadingBackgroundColor="transparent"
              loadingIndicatorColor="#000000"
              showsBuildings
              zoomEnabled={false}
              zoomTapEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              region={this.state.mapRegion}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.animateLat || -36.82339,
                  longitude: this.state.animateLong || -73.03569
                }}
              />
            </MapView>
          </TouchableOpacity>
          <View>
            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="First Name"
                value={this.state.first_name}
                onChangeText={name => this.nameOnChangeText(name)}
                error={this.state.error_name}
              />
            </View>

            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="Postal Code"
                value={this.state.first_name}
                onChangeText={name => this.nameOnChangeText(name)}
                error={this.state.error_name}
              />
            </View>

            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="Address 1"
                value={this.state.first_name}
                onChangeText={name => this.nameOnChangeText(name)}
                error={this.state.error_name}
              />
            </View>

            <View style={styles.editTextStyle}>
              <Edit_Text
                labelText="Address 2 "
                value={this.state.first_name}
                onChangeText={name => this.nameOnChangeText(name)}
                error={this.state.error_name}
              />
            </View>
          </View>
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
        <View>
          <Header_
            title="Select Pickup Point"
            left
            back
            onBackPress={() => this.setState({ mapVisible: false })}
            save
            savePress={this.modalHeaderSavePress}
          />

          {/* 
<Header hasTabs style={{ backgroundColor: "#2caee6" }}>
        <Left>
        
            <TouchableOpacity  onPress={() =>
           this.setState({ mapVisible: false })
          } >
        
        <Icon name="ios-arrow-back" size={28} color="#fff" />

        </TouchableOpacity>
        </Left>
        <Body>
            <Title  style={{  marginLeft: 1}}>Select Pickup Point</Title>
        </Body>
        <Right>

        <TouchableOpacity  onPress={() =>
           this.modalHeaderSavePress()
          } >
        
        <Icon name="ios-done-all" size={48} color="#fff" />


        </TouchableOpacity>

        </Right>
       
    </Header>

 */}





        </View>
        <View style={styles.mapModalContainer}>
          <MapView
            style={styles.mapModal}
            region={this.state.mapRegion}
            loadingEnabled={true}
            loadingBackgroundColor="transparent"
            loadingIndicatorColor="#000000"
            cacheEnabled={true}
            onPress={event => this.animate(event.nativeEvent.coordinate)}
          >
            <MapView.Marker.Animated
              coordinate={{
                latitude: this.state.animateLat || -36.82339,
                longitude: this.state.animateLong || -73.03569
              }}
            // image={{
            //   uri:
            //     "https://cdn4.iconfinder.com/data/icons/social-messaging-productivity-5/128/map-location-person-512.png"
            // }}
            />
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
      </Modal>
    );
  };
}
