import React, { Component } from "react";
import {
  View,
  ScrollView,
  Modal,

  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity //android
} from "react-native";

// import { TouchableOpacity } from 'react-native-gesture-handler'

import { Button, Card, CardItem, Left, Body, Right, Title, Header } from 'native-base';
import Header_ from "../../components/Header";
import Text from "../../components/CustomText";
import Toast_ from "../../functions/Toast_";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Cache_Image from "../../components/Cache_Image";
import styles from "./style";
import Toast from "react-native-root-toast";
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE
} from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Colors from "../../constants/Colors";
import CartBag from "../../Database/CartBag";
import { Footer } from "native-base";
import CustomButton from "../../components/CustomButton";
import _retrieveData from "../../local_cache/_retrieveData";
import _fetch2Param from "../../fetch_function/_fetch2Param";
import _fetch from "../../fetch_function/_fetch";
import _deleteData from "../../local_cache/new/_deleteData";
import Loader from "../../components/Loader";
import TimeGenerating from "../../functions/TimeGenerating";
import { StackActions, NavigationActions } from "react-navigation";
import SubCategory from "../../Database/SubCategory";
import DeliverTimeGenerating from "../../functions/DeliverTimeGenerating";
import TimeSlot from "../../components/TimeSlot";
import moment from "moment";
import ButtonPressLoader from "../../components/ButtonPressLoader";
import LinearGradient from 'react-native-linear-gradient';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesInput from 'react-native-places-input';
import AsyncStorage from "@react-native-community/async-storage";
import { Image_Show_Url } from "../../urls/Image_Show_Url";

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const cartDB = new CartBag();
const subCategoryDB = new SubCategory();

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      first_name: "",
      mapVisible: false,
      timeVisible: false,
      timeVisibleDelivery: false,
      mapRegion: null,
      mapRegionMain: null,
      lastLat: null,
      lastLong: null,
      mapRegionCurrent: null,
      latCurrent: null,
      longCurrent: null,
      animateLat: null,
      animateLong: null,
      address1: "",
      house_no: "",
      address2: "",
      delivery_note: "",
      postal_code: "",
      error_address1: "",
      error_address2: "",
      error_postal_code: "",
      error_delivery_note: "",
      timeData: [],
      metaData: false,
      collectionDate: [],
      collectionDayName: [],
      deliveryDate: [],
      deliveryDayName: [],
      collectionSelect: [],
      deliverySelect: [],
      deliveryDisplayTime: "Select Time",
      deliveryDisplayDay: "Select Day",
      collectionDisplayTime: "Select Time",
      collectionDisplayDay: "Select Day",
      deliveryCompleteDateTime: [],
      collectionCompleteDateTime: [],
      orderItemData: [],
      metaDataItem: false,
      totalCart: 0,
      totalPricee: 0,
      paymentModalVisible: false,
      cod: "ios-square-outline",
      card: "ios-square-outline",
      paymentVia: "",
      paymentError: "",
      collectionColor: Colors.black,
      deliveryColor: Colors.black,
      collectionHeader: [],
      deliveryHeader: [],
      service_res: [],
      placeOrderLoading: false,
      data1: '',
      Discount: "Enter promo code",
      promoModal: false,
      PromoCode: '',
      miniLoding: false,
      DiscountedPrice: 0,
      bagitem: ''
    };
  }

  setLocationDetail = async (latitude, longitude) => {
    const res = await this.locationDetails(latitude, longitude);

    let address = "false";
    let town = "false";
    let county = "false";
    let postal_code = "false";
    let house_noo = "false";

    let location = res;

    // console.warn("qwqwqwqw " + JSON.stringify(res.results[0].address_components[0].long_name));
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
    // console.warn("qwqwqwqw " + JSON.stringify(res.results[0].address_components[0].long_name));
    house_noo = res.results[0].address_components[0].long_name;

    if (!(house_noo === "false")) {
      this.setState({
        house_no: house_noo
      });
    }

    if (!(address === "false")) {
      this.setState({
        address1: address
      });
    } else if (!(town === "false")) {
      this.setState({
        address1: town
      });
    } else if (!(county === "false")) {
      this.setState({
        address1: county
      });
    }

    if (!(town === "false")) {
      this.setState({
        address2: town + " " + county
      });
    } else if (!(county === "false")) {
      this.setState({
        address2: county
      });
    }
    this.setState({
      postal_code
    });

    if (this.state.address1 === "false") {
      this.setState({
        address1: ""
      });
    }
    if (this.state.address2 === "false") {
      this.setState({
        address2: ""
      });
    }
    if (this.state.postal_code === "false") {
      this.setState({
        postal_code: ""
      });
    }
  };

  modalHeaderSavePress = async () => {
    let region = {
      latitude: this.state.animateLat,
      longitude: this.state.animateLong,
      latitudeDelta: 0.00922 * 0.25,
      longitudeDelta: 0.00421 * 0.25
    };
    this.setLocationDetail(this.state.animateLat, this.state.animateLong);
    this.setState({
      lastLat: this.state.animateLat,
      lastLong: this.state.animateLong,
      mapRegion: region,
      mapRegionMain: region,
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

  currentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 0.25,
          longitudeDelta: 0.00421 * 0.25
        };
        this.setState({
          mapRegionCurrent: region,
          latCurrent: position.coords.latitude,
          longCurrent: position.coords.longitude,
          animateLat: position.coords.latitude,
          animateLong: position.coords.longitude
        });
        this.onRegionChangeStart(
          region,
          position.coords.latitude,
          position.coords.longitude
        );
        this.setLocationDetail(
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
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const service_res = await _fetch("available_time", "essex_available");
    this.setState({
      service_res
    });
    const collection = await TimeGenerating(-8, 0);
    const deliver = await TimeGenerating(-7, 2);

    let cList = [];

    for (let i = 0; i < 24; i++) {
      let na1 = parseInt(i) + parseInt(1);
      let myObject = {};
      myObject["id"] = i;
      myObject["Time"] = i + "->" + na1;
      cList.push(myObject);
    }

    const item = this.props.navigation.getParam("item", null);
    this.setState({ bagitem: item })
    // alert(JSON.stringify(item))


    const orderItemData = await cartDB.cartList();

    // alert(JSON.stringify(orderItemData))

    const totalCart = await cartDB.totalCartItems();
    const totalP = await cartDB.totalPrice();
    const totalPricee = totalP.toFixed(2);
    let dataa = [];
    let selectt;
    let j = 0;
    for (let index = 1; index < collection.length; index++) {
      const element = collection[index];
      if (element.Day !== "Sun") {
        if (j === 0) {
          selectt = true

        }
        else {
          selectt = false
        }



        dataa.push({
          Select: selectt,
          id: j,
          Date: element.Date,
          Day: element.Day,
          Complete: element.Complete,
          Available: element.Available
        });
        j++;
      }



    }

    let dataaa = [];
    let selecttt;
    let jj = 0;

    for (let index = 0; index < deliver.length; index++) {
      const elementt = deliver[index];
      if (elementt.Day !== "Sun") {
        if (jj === 0) {
          selecttt = true

        }
        else {
          selecttt = false
        }
        dataaa.push({
          Select: selecttt,
          id: jj,
          Date: elementt.Date,
          Day: elementt.Day,
          Complete: elementt.Complete,
          Available: elementt.Available
        });
        jj++;
      }
    }
    await this.setState({
      timeData: cList,
      collectionHeader: dataa,
      deliveryHeader: dataaa,
      orderItemData,
      totalCart,
      totalPricee,
      loading: false
    });
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
  onRegionChangeStart(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      mapRegionMain: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
      animateLat: lastLat || this.state.lastLat,
      animateLong: lastLong || this.state.lastLong
    });
  }

  async animate(e) {
    await this.setState({
      animateLat: e.latitude,
      animateLong: e.longitude
    });
    const newCoordinate = {
      latitude: e.latitude,
      longitude: e.longitude
      // latitude: e.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      // longitude: e.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2)
    };

    if (Platform.OS === "android") {
      this.mapRef.animateToRegion(newCoordinate, 6000);
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }

  getlocation_ = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        try {
          setTimeout(() => {
            Geolocation.getCurrentPosition(
              position => {
                this.get_address(position.coords.latitude, position.coords.longitude)
              },
              error => {
                if (error.message.includes("No location provider available")) {
                  Toast_("Please Enable Location");
                }
              },
              { enableHighAccuracy: true, timeout: 20000 }
            );
          }, 3500);

        } catch (error) {
          alert(error);
        }
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (error) {

    }
  }

  get_address = async (lat, long) => {
    let region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChangeStart(region, lat, long);
  }

  gotoCurrentLocation = () => {
    try {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
        .then(data => {
          // alert(data);
          this.getlocation_();

        }).catch(err => {
          alert(err);
        });
    } catch (err) {
      console.warn(err)
    }
  };

  locationDetails(latitude, longitude) {
    return new Promise(async function (resolve, rejcet) {
      // Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4"); // use a valid API key
      url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        latitude +
        "," +
        longitude +
        "&sensor=true&key=AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4";
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

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  changeCollectionSelect = async index => {
    let a = this.state.collectionHeader;
    for (let i = 0; i < a.length; i++) {
      const element = a[i];
      if (element.id === index) {
        a[i].Select = true;
      } else {
        a[i].Select = false;
      }
    }
    // alert(JSON.stringify(a));
    this.setState({
      collectionHeader: a
    });
    this.timeList(index, this.state.timeData, "Collection", a);
  };

  changeDeliverySelect = async index => {
    let a = this.state.deliveryHeader;
    for (let i = 0; i < a.length; i++) {
      const element = a[i];
      if (element.id === index) {
        a[i].Select = true;
      } else {
        a[i].Select = false;
      }
    }
    this.setState({
      deliveryHeader: a
    });
    this.timeList(index, this.state.timeData, "delivery", a);
  };

  removeItem = async (ID, Item_ID, C_ID, data) => {
    const res = await cartDB.removeItem(Item_ID, C_ID);
    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    if (
      (Quantity === 0 || Quantity === "0") &&
      (Total_Price === 0 || Total_Price === "0")
    ) {
      const orderItemData = await cartDB.cartList();
      this.setState({
        orderItemData
      });
      return;
    }
    const price = Number(Quantity) * Number(data.Price);
    const totalCart = await cartDB.totalCartItems();
    const totalPricee = await cartDB.totalCartItems();

    this.changeCart(data, Quantity, totalCart, price);
  };

  addItem = async (ID, C_ID, Item_Id, Name, Price, data) => {
    const res = await cartDB.addItem(Item_Id, C_ID, Name, Price);
    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    const price = Number(Quantity) * Number(Price);
    const totalCart = await cartDB.totalCartItems();
    this.changeCart(data, Quantity, totalCart, price);

  };

  changeCart = (data, Quantity, totalCart, total_item_price) => {
    let abcde = this.state.orderItemData;
    let t_price = 0;
    let count = 0;
    for (let i = 0; i < abcde.length; i++) {
      if (abcde[i].ID === data.ID) {
        abcde[i].Quantity = Number(Quantity).toFixed(2);
        abcde[i].Total_Price = Number(total_item_price).toFixed(2);
      }
    }
    for (let i = 0; i < abcde.length; i++) {
      count = parseFloat(abcde[i].Total_Price)
      t_price += count
      t_price = t_price;
    }



    //  alert(t_price);
    this.setState({
      totalPricee: t_price,
      orderItemData: abcde,
      metaDataItem: !this.state.metaDataItem,
      totalCart
    });
  };

  deliverySelectCompleteDateTime = () => {
    let deliverySelect = this.state.deliveryHeader;
    for (let i = 0; i < 7; i++) {
      if (
        deliverySelect[i].Select === true ||
        deliverySelect[i].Select === "true"
      ) {
        return deliverySelect[i].Complete;
      }
    }
  };
  collectionSelectCompleteDateTime = () => {
    let collectionSelect = this.state.collectionHeader;
    for (let i = 0; i < 7; i++) {
      if (
        collectionSelect[i].Select === true ||
        collectionSelect[i].Select === "true"
      ) {
        return collectionSelect[i].Complete;
      }
    }
    // alert(collectionSelect);
  };

  details_fun = (a, b) => {
    alert(b);
  }

  place_oder = async () => {
    if (
      this.state.totalCart === 0 ||
      this.state.totalCart === null ||
      this.state.totalCart === "null"
    ) {
      alert("No item is selected");
      this.props.navigation.navigate("Dashboard");
      return;
    }
    if (this.state.animateLat === "" || this.state.animateLat === null) {
      Toast_("Please Enter Address ");
      this.setState({
        collectionColor: Colors.error
      });
      return;
    }

    // if (this.state.totalPricee < 1) {
    //   Toast_("Our minimum order value is £ 1. Your order is below our minimum order value.");
    //   return;
    // }

    if (this.state.collectionDisplayDay === "Select Day") {
      Toast_("Select Collection Day");
      this.setState({
        collectionColor: Colors.error
      });
      return;
    }
    if (this.state.collectionDisplayTime === "Select Time") {
      Toast_("Select Collection Time");
      this.setState({
        collectionColor: Colors.error
      });
      return;
    }
    if (this.state.deliveryDisplayDay === "Select Day") {
      Toast_("Select Delivery Day");
      this.setState({
        deliveryColor: Colors.error
      });
      return;
    }
    if (this.state.deliveryDisplayTime === "Select Time") {
      Toast_("Select Delivery Time");
      this.setState({
        deliveryColor: Colors.error
      });
      return;
    }
    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      try {
        await AsyncStorage.setItem('basket_return', 'basket_login');
      } catch (error) {
      }
      this.props.navigation.navigate("Login", { rb: "Basket" });
    } else {

      // this.creatingRecord();
      this.setState({
        paymentVia: "card",
      });
      this.creatingRecord();
    }
  };

  place_get = async (value) => {
    this.setState({ address1: value })
    value = value.replace(/\s\s+/g, ' ').trim();
    const url =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      value +
      '&key=AIzaSyA74q6YTHVs6EtoPqJKqSOCgbciOi28dPA';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let r = responseJson.predictions;
        this.setState({ data1: r });
      })
      .catch(error => {
        console.error(error);
      });

  };

  location_select = async item => {
    const place_id = item.place_id;
    const description = item.description;
    const url =
      'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
      place_id +
      '&key=AIzaSyA74q6YTHVs6EtoPqJKqSOCgbciOi28dPA';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson))


        const lat = responseJson.result.geometry.location.lat;
        const lng = responseJson.result.geometry.location.lng;


        this.setLocationDetail(responseJson.result.geometry.location.lat, responseJson.result.geometry.location.lng);

        // alert(JSON.stringify(res))

        this.setState({
          animateLat: responseJson.result.geometry.location.lat,
          animateLong: responseJson.result.geometry.location.lng,
          address1: description,
          data1: "",

        });
        let region = {
          latitude: responseJson.result.geometry.location.lat,
          longitude: responseJson.result.geometry.location.lng,
          latitudeDelta: 0.00922 * 0.25,
          longitudeDelta: 0.00421 * 0.25
        };
        this.setState({
          mapRegion: region,
          mapRegionMain: region,
          mapVisible: false
        });



      })
      .catch(error => {
        console.error(error);
      });
  };


  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.location_select(item)}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  promoFun = async () => {

    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      Toast_("Please Login First");
    } else {
      this.setState({ promoModal: true })
    }

  }
  addPromo = async () => {
    // alert(this.state.PromoCode)

    if (this.state.PromoCode === '') {
      alert("Please Enter Promo Code");

    } else {
      const email = await this.retrieveEmail();

      if (email === "empty") {
        try {
          this.setState({ promoModal: false })

          await AsyncStorage.setItem('basket_return', 'basket_login');
        } catch (error) {
        }
        this.props.navigation.navigate("Login", { rb: "Basket" });
      } else {
        this.setState({ miniLoding: true })
        let param = {};
        param["email"] = email;
        param["promo"] = this.state.PromoCode;
        const res = await _fetch("promo", param);
        if (res === 0) {
          alert("Invalid Promo Code");

          // alert(afterDis)
        } else {
          // alert(JSON.stringify(res))
          let Tprice = this.state.bagitem.product_price
          let Discount = Tprice / 100 * res;
          let afterDis = Tprice - Discount;
          this.setState({ DiscountedPrice: afterDis })
          this.setState({ promoModal: false })

        }
        this.setState({ miniLoding: false })

        // alert(JSON.stringify(email))

      }
    }

  }

  closecomment = () => {
    this.setState({ promoModal: false })
  }

  render() {
    if (this.state.loading === true) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <View style={{ backgroundColor: 'transparent', }}>
          <Header_
            title="Your Basket"
            left
            back
            round_corner={35}
            backgroundColor="#446BD6"
            onBackPress={this.headerBackPress}
          />
        </View>
        {this.mapModal()}
        {this.timeModalCollection()}
        {this.timeModalDelivery()}
        {this.paymentModal()}
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.mapContainerMain}
            onPress={() => { this.setState({ mapVisible: true }) }}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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
              region={this.state.mapRegionMain}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.animateLat || -36.82339,
                  longitude: this.state.animateLong || -73.03569
                }} />
            </MapView>
          </TouchableOpacity>
          <KeyboardAvoidingView>

            <View>
              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 14 }}> Property No</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={house_no => this.setState({ house_no })}
                  value={this.state.house_no}
                  ref="house_no"
                  numberOfLines={1}
                  style={styles.editTextStyle}
                  clearTextOnFocus={true} />
              </View>
            </View>

            <View>
              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 14 }}>Address 1</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={address1 => this.place_get(address1)}
                  value={this.state.address1}
                  ref="address1"
                  numberOfLines={1}
                  style={styles.editTextStyle} />

                <FlatList
                  extraData={this.state}
                  data={this.state.data1}
                  extraData={this.state.metaData}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={this.renderItem} />

              </View>
            </View>

            <View>

              <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Address 2</Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  onChangeText={address2 => this.setState({ address2 })}
                  value={this.state.address2}
                  ref="address2"
                  numberOfLines={1}
                  style={styles.editTextStyle} />
              </View>
            </View>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Postal Code</Text>
            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={postal_code => this.setState({ postal_code })}
                value={this.state.postal_code}
                ref="postal_code"
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Delivery notes</Text>
            <View style={styles.editTextContainer}>

              <TextInput
                onChangeText={delivery_note => this.setState({ delivery_note })}
                value={this.state.delivery_note}
                onFocus={() => this.setState({ delivery_note: "" })}
                ref="delivery_note"
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>
          </KeyboardAvoidingView>
          {/* START OF COLLECTION AND Delivery */}
          <View style={{ flexDirection: "column", marginBottom: 10 }}>
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Collection time</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  timeVisible: true,
                  collectionColor: Colors.black
                });
                let ind = 0;
                for (let i = 0; i < 7; i++) {
                  if (this.state.collectionSelect[i] === true) {
                    ind = i;
                  }
                }
                this.timeList(ind, this.state.timeData, "collection");
              }}
              style={{ flex: 1 }}
            >
              <View style={styles.editTextContainer}>
                <TextInput
                  value={this.state.collectionDisplayTime + "  " + this.state.collectionDisplayDay}
                  editable={false}
                  numberOfLines={1}
                  placeholder="Select date and time"
                  style={styles.editTextStyle}
                  clearTextOnFocus={true}
                />
              </View>

            </TouchableOpacity>

            {/* Delivery START */}
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3, }}>Delivery time</Text>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "column" }}
              onPress={() => {
                if (this.state.collectionDisplayDay === "Select Day") {
                  Toast_("Please first select collection time!");
                  return;
                }
                this.setState({
                  timeVisibleDelivery: true,
                  deliveryColor: Colors.black
                });
                let ind = 0;
                for (let i = 0; i < 7; i++) {
                  if (this.state.deliverySelect[i] === true) {
                    ind = i;
                  }
                }
                this.timeList(ind, this.state.timeData, "delivery");
              }}
            >
              <View style={styles.editTextContainer}>

                <TextInput
                  value={this.state.deliveryDisplayTime + "  " + this.state.deliveryDisplayDay}
                  editable={false}
                  numberOfLines={1}
                  style={styles.editTextStyle}
                  clearTextOnFocus={true}
                />
              </View>
            </TouchableOpacity>
            {/* Delivery END */}
          </View>
          {/* END OF COLLECTION AND Delivery */}
          <View style={[styles.line_break, { marginVertical: 10 }]} />
          <View style={{ flexDirection: "column", marginBottom: 5 }}>
            <Text style={{ color: Colors.black, paddingHorizontal: 17 }}>
              Your items
            </Text>

            {this.orderItemList()}

            {/* </ScrollView> */}

          </View>
          {/* END OF YOUR ITEM */}
          {/* <View style={styles.line_break} /> */}
          <View style={{ flexDirection: "column", margin: 10 }}>
            {/* <View style={{ flexDirection: "row", padding: 10 }}>
              <View
                style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
                <Text
                  style={{ fontSize: 20, color: Colors.black, }}>
                  Total Items
                </Text>
              </View>

              <View
                style={{ alignItems: "flex-end", justifyContent: "flex-end", flex: 1 }}>
                <Text style={{ fontSize: 20, color: Colors.black }}>
                  {Number(this.state.totalCart)}
                </Text>
              </View>
            </View> */}
            {/* END OF TOTAL */}



            <TouchableOpacity
              onPress={() => this.promoFun()}>

              <TextInput
                value={this.state.Discount}
                numberOfLines={1}
                editable={false}
                style={styles.editTextStyle} />
            </TouchableOpacity>

            {/* <View style={{ flexDirection: "row", padding: 10 }}>
              <View style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
                <Text style={{ fontSize: 20, color: Colors.black, }}>
                  Total Price
                </Text>
              </View>

              {this.state.DiscountedPrice === 0 ?
                <View style={{
                  alignItems: "flex-end", justifyContent: "flex-end",
                  flex: 1, flexDirection: "row", marginTop: -10
                }}>
                  <Text style={{
                    fontSize: 20, color: Colors.black,
                    fontFamily: "Raleway-BoldItalic", fontWeight: "500"
                  }}>
                    {"£ "}
                  </Text>
                  <Text style={{
                    fontSize: 20, color: Colors.black,
                    fontFamily: "SpaceMono-Regular", fontWeight: "bold", marginTop: 10
                  }}>
                    {Number(this.state.totalPricee).toFixed(2)}
                  </Text>
                </View>
                :
                <View style={{
                  alignItems: "flex-end", justifyContent: "flex-end",
                  flex: 1, flexDirection: "row", marginTop: -10
                }}>
                  <Text style={{
                    fontSize: 20, color: Colors.black,
                    fontFamily: "Raleway-BoldItalic", fontWeight: "500"
                  }}>
                    {"£ "}
                  </Text>
                  <Text style={{
                    fontSize: 20, color: Colors.black,
                    fontFamily: "SpaceMono-Regular", fontWeight: "bold", marginTop: 10
                  }}>
                    {Number(this.state.DiscountedPrice).toFixed(2)}
                  </Text>
                </View>
              }
            </View> */}
          </View>
        </ScrollView>
        <View>
          {this.state.placeOrderLoading ? (
            <Footer
              style={{
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: Colors.backgroundColor
              }}
            >
              <ButtonPressLoader />
            </Footer>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  // this.props.navigation.navigate("Payment")
                  this.place_oder()
                }>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 35,
                  height: 50,
                  justifyContent: "center"
                }}>
                  <Footer
                    style={{ backgroundColor: 'transparent' }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}>
                      <Text
                        style={{ color: Colors.white, fontSize: 20, alignItems: "center" }}>PLACE ORDER</Text>
                    </View>
                  </Footer>
                </LinearGradient>
              </TouchableOpacity>
            )}
        </View>


        <Modal
          style={{ height: "50%", }}
          animationType="slide"
          transparent={true}
          visible={this.state.promoModal}
          onRequestClose={() => { this.setState({ promoModal: false }) }}>
          <View style={styles.modelViewComment}>
            <TouchableOpacity
              onPress={() => this.closecomment()}
              style={{ alignSelf: "flex-end", }}>
              {/* <Entypo name="circle-with-cross" size={38} color={'#446BD6'} /> */}
              <Image
                style={{ height: 29, width: 29, borderRadius: 8, marginTop: 3, marginRight: 4 }}
                source={require('../../Images/cross.png')}
              />

            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>


              <View style={{ width: "100%", marginTop: 50 }}>
                <Text style={{
                  color: '#000000', marginHorizontal: 22, marginTop: 3,
                  textAlign: "left", fontWeight: "bold", paddingLeft: 5
                }}>Add Promo</Text>
              </View>


              <TextInput
                onChangeText={PromoCode => this.setState({ PromoCode })}
                value={this.state.PromoCode}
                placeholder={"Enter promo code"}
                numberOfLines={1}
                style={[styles.editTextStyle, { width: screen_size_width * .75 }]} />
              {/* </View> */}

              <TouchableOpacity
                onPress={() => this.addPromo()}
                style={{ marginTop: 40, marginBottom: 50 }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={[styles.linearGradient, { width: screen_size_width * .75 }]}>
                  <Text style={styles.buttonText}>Activate code</Text>
                </LinearGradient>

              </TouchableOpacity>
            </View>


            {this.state.miniLoding &&
              <View style={styles.loading}>
                <ActivityIndicator size='large' color="#446BD6" />
              </View>
            }
          </View>

        </Modal>
      </View>
    );
  }

  orderItemList = () => {
    return (

      <ScrollView style={{ height: 170 }} nestedScrollEnabled={true}>

        <View style={styles.itemList}>


          {/* <FlatList
          style={styles.itemList}
          data={this.state.orderItemData}
          extraData={this.state.metaDataItem}
          renderItem={post => {
            const item = post.item;
            const totalItemPrice = Number(item.Total_Price).toFixed(2);
            const Quantity = parseInt(item.Quantity); */}

          {/* return ( */}
          <View
            style={{
              paddingVertical: 8,
              height: 103,
              paddingLeft: 1,
              paddingRight: 5,
              borderTopLeftRadius: 1,
              borderTopRightRadius: 1,
              flexDirection: "row",
              marginRight: 15,
              backgroundColor: "white", marginBottom: 5
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   this.addItem(
              //     item.ID,
              //     item.C_ID,
              //     item.Item_Id,
              //     item.Name,
              //     item.Price,
              //     item
              //   );
              // }}
              style={{ flexDirection: "row" }}
            >

              <View
                style={{
                  marginLeft: 10,
                  marginRight: 15
                }}
              >
                {/* IMAGE  START */}

                {/* <Cache_Image
                      uri={item.Picture}
                      style={{
                        height: 85,
                        width: 80,
                        borderRadius: 5,
                        paddingBottom: 10
                      }}
                    /> */}

                <Image
                  style={{
                    height: 85,
                    width: 80,
                    borderRadius: 5,
                    paddingBottom: 10
                  }}
                  // resizeMode={'contain'}
                  source={{ uri: Image_Show_Url + this.state.bagitem.product_image }} />

              </View>
              <View style={{
                flexDirection: "column",
                height: 118,

              }}>
                <Text style={{
                  color: Colors.black,
                  fontSize: 14,
                  fontFamily: "Raleway-BoldItalic", marginBottom: 30
                }}>
                  <Text style={{ color: Colors.textGolden, padding: 5 }}>
                    {1} x{" "}
                  </Text>{" "}
                  {this.state.bagitem.bag_no}
                </Text>



                {/* <View
                  style={{
                    flex: 2.5,
                    alignItems: "flex-start",
                    alignContent: "flex-start"
                  }}>
                  <LinearGradient
                    style={{ borderRadius: 23, flexDirection: "row", paddingHorizontal: 15 }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#446BD6', '#446BD6', '#5652D5']} >
                    <Text
                      style={{
                        textAlign: "center",
                        paddingBottom: 5,
                        paddingTop: Platform.OS === 'ios' ? 8 : 5,
                        fontSize: 17,
                        fontWeight: Platform.OS === 'ios' ? "500" : "bold",
                        justifyContent: "center"
                      }}>
                      £
                        </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        paddingBottom: 5,
                        marginLeft: 2,
                        paddingTop: 5,
                        fontSize: 17,
                        justifyContent: "center",
                        fontFamily: "SpaceMono-Regular",
                        fontWeight: "bold"
                      }}>
                      {this.state.bagitem.product_price}
                    </Text>
                  </LinearGradient>
                </View> */}
             
              </View>
            </TouchableOpacity>


            {/* <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    flex: 1,
                    marginBottom: 5,
                    marginRight: 12,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.removeItem(item.ID, item.Item_Id, item.C_ID, item)}>
                    <Image
                      style={{ height: 29, width: 29, borderRadius: 8 }}
                      source={require('../../Images/minus.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginLeft: 10, marginRight: 5 }}
                    onPress={() => {
                      this.addItem(
                        item.ID,
                        item.C_ID,
                        item.Item_Id,
                        item.Name,
                        item.Price,
                        item
                      );
                    }}
                  >
                    <Image
                      style={{ height: 28, width: 28, borderRadius: 8 }}
                      source={require('../../Images/plus.png')} />
                  </TouchableOpacity>
                </View> */}
          </View>
          {/* ); */}
          {/* }}
        /> */}
        </View>

      </ScrollView>
    );
  };

  timeModalCollection = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.timeVisible}
        style={[styles.mapModalContainer, { flex: 1 }]}
        onRequestClose={() => {
          this.setState({
            timeVisible: false
          });
        }}
      >
        <View style={{ backgroundColor: "#E8E6EE" }}>
          <Header_
            title="Collection"
            left
            back
            onBackPress={() => this.setState({ timeVisible: false })}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "#E8E6EE" }}>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 25 }}>Select date</Text>

          <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#E8E6EE" }}>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.dateDayListCollection(0)}

              {this.dateDayListCollection(1)}

              {this.dateDayListCollection(2)}

              {this.dateDayListCollection(3)}

              {this.dateDayListCollection(4)}

              {this.dateDayListCollection(5)}

              {/* {this.dateDayListCollection(6)} */}
            </ScrollView>

          </View>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 20, marginBottom: 15 }}>Select time</Text>

          {this.timeList(
            0,
            this.state.timeData,
            "collection",
            this.state.collectionHeader
          )}
          <TouchableOpacity
            onPress={() => this.next_btn()

            }
            style={{ marginTop: 5, marginBottom: 5 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#446BD6', '#446BD6', '#5652D5']} style={{
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 23,
              }}>
              <Text style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 12,
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}>
                Next
                </Text>
            </LinearGradient>
          </TouchableOpacity>


        </View>
      </Modal>
    );
  };

  dateDayListCollection = index => {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingLeft: 5,
          paddingRight: 5,
          alignItems: "center",
          justifyContent: "center",
          // flex: 1,
          // width:60
          // backgroundColor:"#000"
        }}
      >
        <TouchableOpacity
          onPress={() => this.changeCollectionSelect(index)}
          style={{
            backgroundColor:
              this.state.collectionHeader[index].Select === true
                ? Colors.header
                : Colors.white,
            padding: 15,
            color:
              this.state.collectionHeader[index].Select === true
                ? Colors.white
                : Colors.black,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            width: 90
          }}
        >
          <Text
            style={{
              color:
                this.state.collectionHeader[index].Select === true
                  ? Colors.white
                  : Colors.black,
              fontSize: 16
            }}
          >
            {this.state.collectionHeader[index].Day}
          </Text>
          <Text
            style={{
              color:
                this.state.collectionHeader[index].Select === true
                  ? Colors.white
                  : Colors.black,
              fontSize: 16
            }}
          >
            {this.state.collectionHeader[index].Date}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  timeModalDelivery = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.timeVisibleDelivery}
        style={[styles.mapModalContainer, { flex: 1 }]}
        onRequestClose={() => {
          this.setState({
            timeVisibleDelivery: false
          });
        }}
      >
        <View style={{ backgroundColor: "#E8E6EE" }}>

          <Header_
            title="Delivery"
            left
            back
            onBackPress={() => this.setState({ timeVisibleDelivery: false })}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "#E8E6EE" }}>

          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 25 }}>Select date</Text>

          <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#E8E6EE" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.dateDayListDelivery(0)}

              {this.dateDayListDelivery(1)}

              {this.dateDayListDelivery(2)}

              {this.dateDayListDelivery(3)}

              {this.dateDayListDelivery(4)}

              {this.dateDayListDelivery(5)}

              {/* {this.dateDayListDelivery(6)} */}
            </ScrollView>
          </View>
          <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 20, marginBottom: 15 }}>Select time</Text>

          {this.timeList(
            0,
            this.state.timeData,
            "delivery",
            this.state.deliveryHeader
          )}
          <TouchableOpacity
            onPress={() => this.next_btn()

            }
            style={{ marginTop: 5, marginBottom: 5 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#446BD6', '#446BD6', '#5652D5']} style={{
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 23,
              }}>
              <Text style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 12,
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}>
                Next
                </Text>
            </LinearGradient>
          </TouchableOpacity>


        </View>
      </Modal>
    );
  };

  dateDayListDelivery = index => {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingLeft: 5,
          paddingRight: 5,
          alignItems: "center",
          justifyContent: "center",
          // flex: 1,
          // width:60
          // backgroundColor:"#000"
        }}
      >
        <TouchableOpacity
          onPress={() => this.changeDeliverySelect(index)}
          style={{
            backgroundColor:
              this.state.deliveryHeader[index].Select === true
                ? Colors.header
                : Colors.white,
            padding: 15,
            color:
              this.state.deliveryHeader[index].Select === true
                ? Colors.white
                : Colors.black,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            width: 90
          }}
        >
          <Text
            style={{
              color:
                this.state.deliveryHeader[index].Select === true
                  ? Colors.white
                  : Colors.black,
              fontSize: 16
            }}
          >
            {this.state.deliveryHeader[index].Day}
          </Text>
          <Text
            style={{
              color:
                this.state.deliveryHeader[index].Select === true
                  ? Colors.white
                  : Colors.black,
              fontSize: 16
            }}
          >
            {this.state.deliveryHeader[index].Date}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  next_btn = async () => {
    if (this.state.collectionDisplayTime === "Select Time") {

      if (Platform.OS === 'ios') {

        alert("Select Collection Time");

      } else {

        ToastAndroid.showWithGravity(
          "Select Collection Time",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

      }


    }
    else {
      this.setState({ timeVisibleDelivery: false, timeVisible: false })

    }

  }

  timePress = async (item, type, headerData) => {
    let dateforMatch = null;
    for (let i = 0; i < headerData.length; i++) {
      const element = headerData[i];
      if (element.Select === true) {
        dateforMatch = element.Complete;
        // alert(JSON.stringify(dateforMatch));
        break;
      }
    }

    if (type === "collection") {
      const ra = await DeliverTimeGenerating(7, dateforMatch);
      let dataaa = [];
      let selecttt;
      let jj = 0;

      for (let index = 0; index < ra.length; index++) {
        const elementt = ra[index];
        if (elementt.Day !== "Sun") {
          if (jj === 0) {
            selecttt = true

          }
          else {
            selecttt = false
          }



          dataaa.push({
            Select: selecttt,
            id: jj,
            Date: elementt.Date,
            Day: elementt.Day,
            Complete: elementt.Complete,
            // Available: elementt.Available
          });
          jj++;
        }
      }

      this.setState({
        deliveryHeader: dataaa
      });
      // alert(JSON.stringify(ra));
    }


    let uk_date = dateforMatch.split('/')[1] + '/' + dateforMatch.split('/')[0] + '/' + dateforMatch.split('/')[2]
    // alert(uk_date)

    if (type === "delivery") {
      this.setState({
        // timeVisibleDelivery: false,
        deliveryDisplayDay: uk_date,
        deliveryDisplayTime: item.time
      });
    } else {
      this.setState({
        // timeVisible: false,
        collectionDisplayDay: uk_date,
        collectionDisplayTime: item.time
      });
    }
  };

  timeList = (index, data, type, headerData) => {
    return (
      <TimeSlot
        type={type}
        headerData={headerData}
        timePress={item => this.timePress(item, type, headerData)}
      />
    );
  };

  mapModal = () => {
    return (
      <Modal
        style={{ flex: 1 }}
        animationType="slide"
        transparent={false}
        visible={this.state.mapVisible}
        onRequestClose={() => {
          this.setState({ mapVisible: false });
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
        <View style={{ flex: 1 }}>
          <MapView
            ref={component => (this._map = component)}
            provider="google"
            initialRegion={
              this.state.mapRegion
              //   {
              //   latitude: 33.626057,
              //   longitude: 73.071442,
              //   latitudeDelta: 0.0043,
              //   longitudeDelta: 0.0034
              // } 
            }
            style={styles.mapModal}
            onPress={e => this.animate(e.nativeEvent.coordinate)}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{
                latitude: this.state.animateLat || -36.82339,
                longitude: this.state.animateLong || -73.03569
              }}
            />
          </MapView>

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
      </Modal>
    );
  };

  paymentModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.paymentModalVisible}
        style={styles.mapModalContainer}
        onRequestClose={() => {
          this.setState({
            paymentModalVisible: false
          });
        }}
      >
        <View style={{
          backgroundColor: "#E8E6EE",
          // marginBottom: 20,
          marginBottom: Platform.OS === 'ios' ? 20 : 0,


        }}>
          <Header_
            title="Select Payment"
            left
            back
            round_corner={35}
            onBackPress={() => this.setState({ paymentModalVisible: false })}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            // alignContent: "center",
            // alignSelf: "center",
            flex: 1,
            backgroundColor: "#E8E6EE",
          }}
        >
          <TouchableOpacity
            onPress={this.cod}
            style={{ flexDirection: "row", padding: 15, backgroundColor: "white", width: screen_size_width * 1, marginTop: screen_size_height * .1 }}
          >
            <Icon
              name={this.state.cod}
              style={{ paddingLeft: 5 }}
              size={35}
              color={Colors.dullBlack}
            />
            <Text style={{ color: "black", marginLeft: 10, marginTop: 7 }}>
              Cash on Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.card}
            style={{ flexDirection: "row", padding: 15, marginTop: 5, backgroundColor: "white", width: screen_size_width * 1 }}
          >
            <Icon
              name={this.state.card}
              style={{ paddingLeft: 5 }}
              size={35}
              color={Colors.dullBlack}
            />
            <Text style={{ color: "black", marginLeft: 10, marginTop: 7 }}>
              Via Card
            </Text>
          </TouchableOpacity>

          <View
            style={{
              margin: 10,
              padding: 10
            }}
          >
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {this.state.paymentError}
            </Text>
          </View>


          <TouchableOpacity onPress={this.paymentSubmit} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Submit
                </Text>
            </LinearGradient>
          </TouchableOpacity>



          {/* 
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              alignContent: "flex-end",
              margin: 10,
              padding: 10,
              width: "100%"
            }}
          >
            <CustomButton
              text="Submit"
              iconLeft
              iconLeftName="hand-o-right"
              onPress={this.paymentSubmit}
            />
          </View> */}
        </View>
      </Modal>
    );
  };

  cod = () => {
    if (this.state.cod === "ios-square-outline") {
      this.setState({
        card: "ios-square-outline",
        cod: "ios-checkbox-outline",
        paymentError: ""
      });
    } else {
      this.setState({
        cod: "ios-square-outline",
        card: "ios-square-outline",
        paymentError: ""
      });
    }
  };
  card = () => {
    if (this.state.card === "ios-square-outline") {
      this.setState({
        cod: "ios-square-outline",
        card: "ios-checkbox-outline",
        paymentError: ""
      });
    } else {
      this.setState({
        cod: "ios-square-outline",
        card: "ios-square-outline",
        paymentError: ""
      });
    }
  };

  paymentSubmit = async () => {
    if (
      this.state.card === "ios-square-outline" &&
      this.state.cod === "ios-square-outline"
    ) {
      this.setState({
        paymentError: "Must select any method"
      });
      return;
    }
    if (
      this.state.card === "ios-checkbox-outline" &&
      this.state.cod === "ios-checkbox-outline"
    ) {
      this.setState({
        paymentError: "Only one should select"
      });
      return;
    }
    if (this.state.card === "ios-checkbox-outline") {
      this.setState({
        paymentVia: "card",
        // paymentModalVisible: false
      });
      alert("...");
    } else {
      this.setState({
        paymentVia: "cod",
        // paymentModalVisible: false
      });
      //for cod

      this.creatingRecord();
    }
  };

  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      return "empty";
    } else {
      return res;
    }
  };

  creatingRecord = async () => {

    let col_time = ""
    let del_time = ""

    if (this.state.collectionDisplayTime === "4-7 PM") {
      col_time = "4pm-7pm"
    }
    else {
      col_time = "7pm-10pm"
    }
    if (this.state.deliveryDisplayTime === "4-7 PM") {
      del_time = "4pm-7pm"
    }
    else {
      del_time = "7pm-10pm"
    }


    // console.warn("111221211221122121"+ col_time+ " 857868476"+ del_time);
    this.setState({
      placeOrderLoading: true
    });
    const email = await this.retrieveEmail();
    let param = {};
    param["email"] = email;
    param["lattitute"] = this.state.animateLat;
    param["longitude"] = this.state.animateLong;
    param["Collection_Day"] = this.state.collectionDisplayDay;
    param["Collection_Time"] = col_time;
    param["Delivery_Day"] = this.state.deliveryDisplayDay;
    param["Delivery_Time"] = del_time;
    param["Total_Cart_All"] = "1";
    let no = this.state.delivery_note;
    if (no === "") {
      no = "NA";
    }
    param["Delivery_Notes"] = no;
    param["Postal_Code"] = this.state.postal_code;
    let dis = this.state.DiscountedPrice;
    if (dis === 0) {
      param["total_bill"] = this.state.bagitem.product_price;
    }
    else {
      param["total_bill"] = this.state.DiscountedPrice;
    }
    param["house_no"] = this.state.house_no;
    let param1 = {};
    // for (let i = 0; i < this.state.orderItemData.length; i++) {
    //   const element = this.state.orderItemData[i];
    //   let a = "SC_ID" + i;
    //   let b = "Quantity" + i;

    //   param1[a] = element.SC_ID;
    //   param1[b] = element.Quantity;
    // }
    param1["SC_ID"] = this.state.bagitem.product_id;
    param1["Quantity"] = "1";
    param1["bag_no"] = this.state.bagitem.bag_no;


    // alert(JSON.stringify(param))
    this.setState({
      placeOrderLoading: true
    });
    let res = await _fetch2Param("place_order_bag", param1, param);
    // alert(JSON.stringify(res));

    if (res.toString().split(':')[0] === "Record created successfully") {
      this.setState({
        loading: false
      });


      let payamount = '';

      let dis = this.state.DiscountedPrice;
      if (dis === 0) {
        payamount = this.state.bagitem.product_price;
      }
      else {
        payamount = this.state.DiscountedPrice;
      }


      this.props.navigation.navigate("PaymentBag",
        {
          item_number: res.toString().split(':')[1],
          item_name: this.state.orderItemData[0],
          amount: payamount,
          screenName: "bagScreen"
          // amount: this.state.totalPricee,
          // email: email
        }
      );
      // this.setState({
      //   placeOrderLoading: false
      // });

    } else if (res === "User doesnot exists.") {
      await _deleteData("id");
    } else {
      // Toast_("ggg"+res);
      // Toast.show(res, {
      //   duration: Toast.durations.SHORT,
      //   position: Toast.positions.CENTER
      // });
      // alert(res);

      if (Platform.OS === 'ios') {

        alert(res);

      } else {
        ToastAndroid.show(res, ToastAndroid.SHORT);
      }

      this.setState({
        placeOrderLoading: false
      });
    }
    this.setState({
      placeOrderLoading: false
    });
  };
}
