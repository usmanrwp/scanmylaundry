import React, { Component } from "react";
import {
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import Header_ from "../../components/Header";
import Text from "../../components/CustomText";
import Cache_Image from "../../components/Cache_Image";
import No_Record from "../../components/No_Record";
import styles from "./style";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Colors from "../../constants/Colors";
import _retrieveData from "../../local_cache/_retrieveData";
import _fetch from "../../fetch_function/_fetch";
// import _deleteData from '../../../local_cache/new/_deleteData';
import Loader from "../../components/Loader";
import { Image_Show_Url } from "../../urls/Image_Show_Url";
import LinearGradient from "react-native-linear-gradient";
import OrderStatusEssex from "../../functions/OrderStatusEssex";
import DisableEditText from "../../components/DisableEditText";
// import {appImageUrl} from '../../../urls/appImageUrl';


export default class index extends Component {
  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      return "empty";
    } else {
      await this.setState({
        email: res
      });
      return res;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mapRegionMain: null,
      mapRegionMain1: null,
      item: "",
      loading: true,
      orderItemData: [],
      res: [],
      status: "",
      address1: "",
      house_no: "",
      address2: "",
      postal_code: "",
      mapVisible: false,
      workCurrentStatus: "NA",
      refreshing: false
    };
  }

  loadData = async () => {
    let param = {};
    param["email"] = this.state.email;
    param["order_id"] = this.state.item.id;
    param["order_type"] = this.state.item.order_type;
    console.warn("param", param);

    const res = await _fetch("read_user_order_details", param);
    // alert(JSON.stringify(res))
    if (res.length === 0) {
      this.setState({
        res: "No record",
        loading: false,
        refreshing: false
      });
      return;
    }
    let region = {
      latitude: Number(res[0].latitude) || 33.6060094,
      longitude: Number(res[0].longitude) || 73.0759443,
      latitudeDelta: 0.00922 * 0.25,
      longitudeDelta: 0.00421 * 0.25
    };
    let region1 = {
      latitude: Number(res[0].latitude) || 33.6060094,
      longitude: Number(res[0].longitude) || 73.0759443,
      latitudeDelta: 0.00922 * 0.5,
      longitudeDelta: 0.00421 * 0.5
    };
    console.warn("resss", res);
    let workCurrentStatus = await OrderStatusEssex(res[0].work_status);
    workCurrentStatus = workCurrentStatus.textStatus;
    console.warn("workCurrentStatus", res[0].house_no);
    this.setState({
      house_no: res[0].house_no,
    });
    
    if (workCurrentStatus === "Not seen") {
      this.setState({
        workCurrentStatus: "Seen",
      });
    } else {
      this.setState({
        workCurrentStatus
      });

    }

    this.setState({
      mapRegionMain: region,
      mapRegionMain1: region1,
      orderItemData: res,
      res,
      loading: false,
      refreshing: false
    });
    this.setLocationDetail(Number(res[0].latitude), Number(res[0].longitude));
    console.warn("res", res);
  };

  setLocationDetail = async (latitude, longitude) => {
    const res = await this.locationDetails(latitude, longitude);

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
    const item = navigation.getParam("item", null);
    const email = await this.retrieveEmail();
    await this.setState({
      item,
      email
    });
    await this.loadData();
  };

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        loading: true
      },
      () => this.loadData()
    );
  };

  render() {
    if (this.state.loading === true) {
      return <Loader />;
    }

    if (this.state.res === "No record") {
      return (
        <No_Record
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        >
          No Record
        </No_Record>
      );
    }

    return (
      <View style={styles.appContainer}>
        {this.mapModal()}
        <View>
          <Header_
            title="Details"
            left
            back
            round_corner={35}
            onBackPress={this.headerBackPress}
          />
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.mapContainerMain}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              cacheEnabled
              loadingEnabled
              loadingBackgroundColor="transparent"
              loadingIndicatorColor="#000000"
              showsBuildings
              zoomEnabled={false}
              zoomTapEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              region={this.state.mapRegionMain}
            >
              <MapView.Marker coordinate={this.state.mapRegionMain} />
            </MapView>
          </View>

          <TouchableOpacity onPress={() => this.setState({ mapVisible: true })}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.mapClickContainer}
              colors={[Colors.gradient1, Colors.gradient2]}
            >
              <Text style={styles.mapClickText}>Click to view full map</Text>
            </LinearGradient>
          </TouchableOpacity>

          <KeyboardAvoidingView>
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 14 }}>Status</Text>


            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.workCurrentStatus}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>


            <Text style={{ color: '#000000', marginHorizontal: 22 }}>House #</Text>



            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.house_no}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>


            <Text style={{ color: '#000000', marginHorizontal: 22 }}>Address 1</Text>



            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.address1}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>


            <Text style={{ color: '#000000', marginHorizontal: 22 }}>Address 2</Text>



            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.address2}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>





            <Text style={{ color: '#000000', marginHorizontal: 22 }}>Postal Code</Text>



            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.postal_code}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>


            <Text style={{ color: '#000000', marginHorizontal: 22 }}>Delivery Note</Text>



            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.res[0].notes}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>


          </KeyboardAvoidingView>



          <View style={{ flexDirection: "column", marginBottom: 10 }}>
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Collection time</Text>

            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.res[0].receiving_time + "  " + this.state.res[0].receiving_date}
                editable={false}
                numberOfLines={1}
                placeholder="Select date and time"
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>

            {/* Delivery START */}
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 3 }}>Delivery time</Text>


            <View style={styles.editTextContainer}>

              <TextInput
                value={this.state.res[0].delivery_time + "  " + this.state.res[0].receiving_date}
                editable={false}
                numberOfLines={1}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>
            {/* Delivery END */}
          </View>










          {/* START of ITEM */}
          {/* <View style={[styles.line_break, { marginVertical: 10 }]} /> */}

          <View style={{ flexDirection: "column", marginBottom: 5 }}>
            <Text style={{ color: Colors.black, paddingHorizontal: 17 }}>
              Your items
            </Text>
            {this.orderItemList()}
            {/* </ScrollView> */}
          </View>
          {/* END OF YOUR ITEM */}
          {/* <View style={styles.line_break} /> */}
          <View
            style={{ flexDirection: "column", marginBottom: 5, margin: 10 }}
          >


            <View style={{ flexDirection: "row", padding: 10 }}>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    // fontFamily: "Raleway-ExtraBoldItalic"
                  }}
                >
                  Total Items
                </Text>
              </View>

              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    // fontFamily: "Raleway-ExtraBoldItalic"
                  }}
                >
                  {Number(this.state.res[0].Total_quantity)} Items
                </Text>
              </View>
            </View>
            {/* END OF TOTAL */}

            <View style={{ flexDirection: "row", padding: 10 }}>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    // fontFamily: "Raleway-ExtraBoldItalic"
                  }}
                >
                  Total Price
                </Text>
              </View>

              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    // fontFamily: "Raleway-ExtraBoldItalic"
                  }}
                >
                  {"£ " + Number(this.state.res[0].Total_bill)}
                  {/* £ 777 */}

                </Text>
              </View>
            </View>




          </View>
        </ScrollView>
      </View>
    );
  }

  orderItemList = () => {
    return (


      <ScrollView style={{ height: 160 }} nestedScrollEnabled={true}>


        <FlatList
          style={styles.itemList}
          data={this.state.orderItemData}
          extraData={this.state.metaDataItem}
          renderItem={post => {
            const item = post.item;
            const totalItemPrice = Number(item.total_price).toFixed(2);
            const Quantity = parseInt(item.product_quantity);


            return (
              <View
                style={{
                  // flexDirection: "row",
                  paddingVertical: 8,
                  height: 80,
                  // paddingHorizontal: 10,
                  paddingLeft: 1,
                  paddingRight: 5,
                  borderTopLeftRadius: 1,
                  borderTopRightRadius: 1,
                  flexDirection: "row",
                  marginRight: 15,
                  backgroundColor: "white", marginBottom: 5
                }}
              >


                <View
                  style={{
                    marginLeft: 10,
                    marginRight: 15
                  }}
                >
                  {/* IMAGE  START */}

                  <Cache_Image
                    uri={Image_Show_Url + item.ProductImage}
                    style={{
                      height: 60,
                      width: 55,
                      borderRadius: 5,
                      paddingBottom: 10
                    }}
                  />
                </View>


                <View style={{
                  flexDirection: "column",
                  // marginTop:15

                }}>
                  <Text style={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: "Raleway-BoldItalic", marginBottom: 5
                  }}>
                    <Text style={{ color: Colors.textGolden, padding: 5, }}>
                      {Quantity} x{" "}
                    </Text>{" "}
                    {item.ProductTitle}
                  </Text>


                  <LinearGradient
                    style={{ borderRadius: 23, width: 100 }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#446BD6', '#446BD6', '#5652D5']} >

                    <Text
                      style={{
                        textAlign: "center",
                        paddingBottom: 5,
                        paddingTop: 5,
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      £ {item.ProductPrice}
                      {/* vhgjjg */}
                    </Text>

                  </LinearGradient>

                </View>

              </View>
            );
          }}
        />



      </ScrollView>


    );
  };

  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res === "Empty_LocalCache") {
      return "empty";
    } else {
      return res;
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
            title="Location"
            left
            back
            onBackPress={() => this.setState({ mapVisible: false })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MapView
            ref={component => (this._map = component)}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.mapModal}
            cacheEnabled
            loadingEnabled
            loadingBackgroundColor="transparent"
            loadingIndicatorColor="#000000"
            showsBuildings
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            region={this.state.mapRegionMain1}
          >
            <MapView.Marker coordinate={this.state.mapRegionMain1} />
          </MapView>
        </View>
      </Modal>
    );
  };
}
