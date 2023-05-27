import React, { Component } from "react";
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  PagerScroll,
  Alert,
  PermissionsAndroid,
  Modal,
  Image,
  TextInput,
  SafeAreaView,
  FlatList
} from "react-native";
import Header_ from "../../components/Header";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Colors from "../../constants/Colors";
import Internet_Check from "../../functions/Internet_Check";


import Custom_List1 from "../Custom_List1";
import Custom_List2 from "../Custom_List2";
import _fetch from "../../fetch_function/_fetch";
import { Image_Show_Url } from "../../urls/Image_Show_Url";
import Cache_Image from "../../components/Cache_Image";
import Version from "../../Database/Version";
import Category from "../../Database/Category";
import S_category from "../../Database/S_category";
import SubCategory from "../../Database/SubCategory";
import CreditCard from "../../Database/CreditCard";

import Footer_ from "../../components/Footer";
import DB from "../../Database/DB";
import Loader from "../../components/Loader";
import Toast_ from "../../functions/Toast_";
import _retrieveData from "../../local_cache/new/_retrieveData";
import _retrieveData1 from "../../local_cache/_retrieveData";

import Cart from "../../Database/Cart";
import CartBag from "../../Database/CartBag";
import { NavigationEvents } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';

import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from "@react-native-community/async-storage";
import Geolocation from "@react-native-community/geolocation";
import { CameraKitCameraScreen } from 'react-native-camera-kit';

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const db = new DB();
const versionDB = new Version();
const categoryDB = new Category();
const categoryDBSuper = new S_category();
const subCategoryDB = new SubCategory();
const cartDB = new Cart();
const cartDBBag = new CartBag();
const CreditCardDB = new CreditCard();


let data = [];

const SCREEN_WIDTH_RATIO = 3.75;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
  },
];

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      categories: [],
      s_categories: [],
      loading: true,
      prodId: "1",
      prodName: "Top",
      prodType: "1",
      prodPicture: "Shirt",
      amount: "ITEMS",
      accountIconShow: false,
      backTo: "",
      opneScanner: false,
      qrvalue: '',
      promoModal: false,
      BagCode: '',
      bagData: '',
      scannerCount: ''
    };
  }

  backPressed = () => {
    if (this.state.opneScanner === true) {
      this.setState({ opneScanner: false })
    } else {
      BackHandler.exitApp();
      return true;
    }

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

  amountSet = async () => {

    // alert("ggg");

    this.setState({
      amount: "ITEM"
    });

    let Total_Price = await cartDB.totalCartItems();

    Total_Price = Number(Total_Price);
    if (
      Total_Price === "0" ||
      Total_Price === 0 ||
      Total_Price === "null" ||
      Total_Price === null ||
      Total_Price === NaN ||
      Total_Price === "NaN"
    ) {
      this.setState({
        amount: "ITEMS"
      });
    } else {
      this.setState({
        amount: Total_Price + " Items"
      });
    }
  };

  refreshAmount = async (this_, Total_Price) => {
    if (
      Total_Price === "0" ||
      Total_Price === 0 ||
      Total_Price === "null" ||
      Total_Price === null ||
      Total_Price === NaN ||
      Total_Price === "NaN"
    ) {
      this_.setState({
        amount: "ITEMS"
      });
    } else {
      this_.setState({
        amount: Total_Price + " Items"
      });
    }
  };

  componentDidMount = async () => {
    // this.fetch_data();
    // await CreditCardDB.clearCart();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetch_data();
      }
    );

    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
    } else {
      await this.getPermission();
    }


  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }


  fetch_data = async () => {

    try {
      await AsyncStorage.setItem('check_firstTime', '2222');
    } catch (error) {
      // Error saving data
    }

    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    // await db.clearOnlyDB();
    // return;
    let local_check = 0;
    const res = await versionDB.existanceCheck();
    let param = {};
    // console.warn(res.Entity);
    // return;
    // console.warn(res);

    if (
      res === "Empty" ||
      res.Entity === null ||
      res.Entity === "null" ||
      res.Version === null ||
      res.Version === "null"
    ) {
      param["version"] = "0";
      param["entity"] = "category";
    } else {
      param["version"] = res.Version;
      param["entity"] = res.Entity;
      // param.push({ entity: "category" });
    }
    let version = true;
    const ic_res = await Internet_Check();
    if (!(ic_res === false || ic_res === "false")) {
      version = await _fetch("version", param);
      console.warn("versionnnnnnm", version);
      // alert(JSON.stringify(version))
    }

    if (!(version === true || version === "true")) {
      // ToastAndroid.show("Storing...", ToastAndroid.SHORT);
      local_check = 1;
      await db.clearDB();
      await versionDB.addVersion(version[0]);

      const s_categories = version[1];

      // alert(JSON.stringi fy(s_categories));

      let s_data = [];
      for (let index = 0; index < s_categories.length; index++) {
        const elementt = s_categories[index];
        const picturee = Image_Show_Url + elementt.picture;
        s_data.push({
          OID: elementt.id,
          Name: elementt.name,
          Picture: picturee,
          type: elementt.type,
          status: elementt.status
        });
      }

      for (let index = 0; index < s_data.length; index++) {
        const elementt = s_data[index];
        await categoryDBSuper.addCategory(elementt);
      }

      //categories adding
      const categories = version[2];

      let dataa = [];
      for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        const picture = Image_Show_Url + element.picture;
        dataa.push({
          OID: element.id,
          Name: element.name,
          super_category_id: element.super_cat_id,
          Type: element.type,
          Picture: picture,
          status: element.status
        });
      }
      for (let index = 0; index < dataa.length; index++) {
        const element = dataa[index];

        await categoryDB.addCategory(element);
      }
      //categories adding end

      //displaying categories
      const categories_Show = await categoryDB.listCategory();

      const categories_Show_super = await categoryDBSuper.listCategory();

      const tabRoute = [];

      categories_Show_super.forEach(item => {
        tabRoute.push({
          title: item.Name,
          key: item.OID,
          type: item.type
        });
      });

      categories_Show.forEach(item => {
        data.push({
          value: item.Name,
          key: item.OID
        });
      });

      const s_tabRoute = [];
      categories_Show_super.forEach(item => {
        s_tabRoute.push({
          super_t: item.Name,
          super_k: item.OID
        });
      });

      // alert(JSON.stringify(categories_Show_super));

      //end of displaying categories

      //sub categories adding start
      const subCategories = version[3];
      let sub_Categories_data = [];
      for (let index = 0; index < subCategories.length; index++) {
        const element = subCategories[index];
        const picture = Image_Show_Url + element.image;
        sub_Categories_data.push({
          ID: parseInt(element.id),
          C_ID: element.category_id,
          Name: element.name,
          Detail: element.detail,
          Picture: picture,
          Price: element.price,
          status: element.status
        });
      }

      // alert(JSON.stringify(subCategories))

      for (let index = 0; index < sub_Categories_data.length; index++) {
        const element = sub_Categories_data[index];
        await subCategoryDB.addCategory(element);
      }
      await this.setState({
        routes: tabRoute,
        loading: false,
        categories: categories_Show,
        s_categories: categories_Show_super
      });
      //sub categories adding end
    } //end of local db filling

    if (local_check === 0) {
      const categories_Show_super = await categoryDBSuper.listCategory();
      const categories = await categoryDB.listCategory();
      const tabRoute = [];

      categories_Show_super.forEach(item => {
        tabRoute.push({
          title: item.Name,
          key: item.OID,
          type: item.type
        });
      });

      categories.forEach(item => {
        data.push({
          value: item.Name,
          key: item.OID
        });
      });

      const s_tabRoute = [];
      categories_Show_super.forEach(item => {
        s_tabRoute.push({
          super_t: item.Name,
          super_k: item.OID
        });
      });

      this.amountSet();
      await this.setState({
        routes: tabRoute,
        s_categories: categories_Show_super,
        loading: false,
        categories
      });
    }
  }


  onOpenlink = () => {
    Linking.openURL(this.state.qrvalue);
  };

  onBarcodeScan = async (qrvalue) => {
    this.setState({ opneScanner: false })
    if (qrvalue === "https://qr1.be/LRUT") {
      const res = await _retrieveData1();
      let param = {};
      param["email"] = res;
      let ress = await _fetch("read_bags", param);
      if (ress.includes("No")) {
        if (this.state.scannerCount === "1") {
          this.setState({ scannerCount: "2", opneScanner: false })
          alert(JSON.stringify(ress))
        }
      } else {
        await this.setState({ qrvalue, opneScanner: false, promoModal: true, BagCode: '', bagData: ress, })
      }
    } else {
      this.setState({ scannerCount: "2", opneScanner: false })
      alert('Wrong QR code, please try again')
    }

  };

  onOpneScanner = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "ScanMyLaundry Camera Permission",
            message:
              "ScanMyLaundry App needs access to your camera ",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({ qrvalue: '', scannerCount: "1", opneScanner: true })

        } else {
          alert('CAMERA permission denied');

        }
      } catch (err) {
        console.warn(err);
      }

    } else {
      this.setState({ qrvalue: '', scannerCount: "1", opneScanner: true, })

    }
  }

  headerQrcode = async () => {
    const res = await _retrieveData1();
    if (res === "Empty_LocalCache") {
      this.props.navigation.navigate("LoginMain");
    } else {
      this.onOpneScanner()
      // this.onBarcodeScan()
    }
  };

  headerSearchPress = () => {
    this.props.navigation.navigate("Search");

  };

  headerAccountPress = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        let value_split = value.split('"');
        this.props.navigation.navigate("Profile", { rb: "Dashboard" });

        // alert(JSON.stringify(value)+ "  "+value);
      } else {
        this.props.navigation.navigate("LoginMain");


      }

    } catch (error) {
      // Error retrieving data
      console.warn("Local cache _retrieveData error=>", error);
    }

  };

  headerOrderPress = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        this.props.navigation.navigate("History");
        // alert(JSON.stringify(value)+ "  "+value);
      } else {
        this.props.navigation.navigate("LoginMain");
      }

    } catch (error) {
      // Error retrieving data
      console.warn("Local cache _retrieveData error=>", error);
    }
  };

  footerPress = () => {
    if (this.state.amount === "ITEMS") {
      alert("No Item Selected");
    } else {
      this.props.navigation.navigate("Basket");
    }
  };

  getTabBarIcon = props => {
    const { route } = props;

    for (let index = 0; index < this.state.s_categories.length; index++) {
      const element = this.state.s_categories[index];

      if (route.key === element.OID) {
        let pic = element.Picture.replace(/ /g, '')

        return (
          <Cache_Image
            uri={pic}
            style={{ height: 78, width: 78 }}
          />
        );
      }
    }
  };

  _handleChangeTab = index => {
    this.setState({ index });
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    );
  };

  onChangeText = async (text) => {
    for (let i = 0; i < data.length; i++) {
      abc = data[i].value;
      if (abc === text) {
        const obj = new Custom_List1();
        obj.navigate_data(this.props.navigation, data[i].key, this);
        return <Custom_List1 />;
      }

    }
  }

  checkOut = () => {
    if (this.state.amount === "ITEMS") {
      alert("If");
    } else {
      alert("else");
    }

  }

  _renderScene = ({ route }) => {
    switch (route.type) {
      case "1":
        const obj = new Custom_List1();
        obj.navigate_data(this.props.navigation, route.key, this);
        return <Custom_List1 />;
      case "2":
        const obj1 = new Custom_List2();
        obj1.navigate_data(this.props.navigation, route.key, this);
        return <Custom_List2 />;
      default:
        return null;
    }


  };

  closecomment = () => {
    this.setState({ promoModal: false })
  }

  _renderTabBar = props => {
    let tabWidthStyle = Math.round(
      Dimensions.get("window").width / SCREEN_WIDTH_RATIO
    );
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color: Colors.tabTextIcon,
              fontSize: 13,
              fontFamily: "Raleway-Regular",
              width: tabWidthStyle,
              flex: 1
            }}
          >
            {route.title}
          </Text>
        )}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={[tabWidthStyle, { height: 45 }]}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      />
    );
  };

  open2ndCart = async (item) => {
    await cartDBBag.clearCart();
    this.addItem(parseInt(item.product_id), item.id, item.bag_no, item.product_price)
    this.closecomment()
    setTimeout(async () => {
      this.closecomment()
      this.props.navigation.navigate("BasketCopy", { item: item });
    }, 500);
  }

  addItem = async (ID, C_ID, Name, Price) => {
    const res = await cartDBBag.addItem(ID, C_ID, Name, Price);
  };

  render() {
    if (this.state.loading === true) {
      return (
        <View style={{ flex: 1 }}>
          <NavigationEvents onWillFocus={() => this.componentDidMount()} />
          <Loader />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#E8E6EE" }}>
          <Header_
            title="ScanMyLaundry"
            right
            rightIcon1
            rightIcon2
            rightIcon3
            round_corner={35}
            rightIconPress={this.headerQrcode}
            rightIcon1Press={this.headerSearchPress}
            rightIcon2Press={this.headerAccountPress}
            rightIcon3Press={this.headerOrderPress}
          />
          <View style={styles.tabview_style}>
            <TabView
              navigationState={this.state}
              renderScene={this._renderScene}
              // renderScene={SceneMap(this._renderScene)}
              // renderScenes = {this._renderScenes}
              // onRequestChangeTab={this._handleChangeTab}
              renderPager={props => <PagerScroll {...props} />}
              onIndexChange={index => { this._handleChangeTab(index) }}
              initialLayout={{ width: Dimensions.get("window").width }}
              // renderTabBar={this._renderTabBar}
              // style={{ borderTopWidth: 3, borderTopColor: Colors.header }}
              lazy={false}
              // renderHeader={this._renderHeader}
              renderTabBar={props => (

                <View >

                  <TabBar
                    {...props}
                    indicatorStyle={{
                      backgroundColor: "transparent"
                    }}
                    tabStyle={styles.bubble}
                    style={{ backgroundColor: "transparent" }}
                    scrollEnabled={true}
                    renderIcon={props => this.getTabBarIcon(props)}
                    renderLabel={({ route, focused, color }) => (
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontFamily: "Raleway-Regular",
                          paddingTop: 5
                        }}
                      >
                        {route.title}
                      </Text>
                    )}
                  />

                </View>


              )}
              labelStyle={styles.noLabel}
            />
          </View>

          <TouchableOpacity
            onPress={() => { this.footerPress() }}
          >
            <LinearGradient
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#446BD6', '#446BD6', '#5652D5']} >


              <Footer_ right={this.state.amount} footerPress={this.footerPress} />


            </LinearGradient>
          </TouchableOpacity>

          <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={true}
            visible={this.state.opneScanner}
            onRequestClose={() => { this.setState({ opneScanner: false }) }}>
            <View style={styles.modelViewLoc}>

              <View style={{ flex: 1 }}>
                <CameraKitCameraScreen
                  showFrame={false}
                  // Show/hide scan frame
                  scanBarcode={true}
                  // Can restrict for the QR Code only
                  laserColor={'blue'}
                  // Color can be of your choice
                  frameColor={'yellow'}
                  // If frame is visible then frame color
                  colorForScannerFrame={'black'}
                  // focusMode={'on'}
                  // Scanner Frame color
                  onReadCode={(event) =>
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                  }
                />
              </View>
            </View>
          </Modal>


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
                <Image style={{ height: 29, width: 29, borderRadius: 8, marginTop: 3, marginRight: 4 }}
                  source={require('../../Images/cross.png')} />
              </TouchableOpacity>

              <View style={{}}>
                <View style={{ width: "100%", marginTop: 2, marginLeft: 13 }}>
                  <Text style={styles.bagCodeText}>Baskets</Text>
                  <Text style={[styles.bagCodeText, { fontSize: 16, fontWeight: "normal", marginTop: 5 }]}>Select your basket</Text>
                </View>
                <SafeAreaView style={{ marginHorizontal: 5, marginTop: 8, height: "80%" }}>

                  <FlatList
                    data={this.state.bagData}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    contentContainerStyle={{ marginHorizontal: 15 }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ flex: 1 / 2, justifyContent: "space-evenly" }}
                    renderItem={({ item, index }) => (
                      <View style={{ maxWidth: '50%', marginTop: 8, backgroundColor: "#fff", }}>
                        <TouchableOpacity onPress={() => this.open2ndCart(item)}>
                          <Image
                            style={{ height: 90, width: 120, marginTop: 5 }}
                            resizeMode={'contain'}
                            source={{ uri: Image_Show_Url + item.product_image }} />
                          {/* source={require('../../Images/shopping_bag.png')} /> */}
                          <Text style={{ alignSelf: "center" }}>{item.bag_no}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </SafeAreaView>
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
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  bubble: {

    // borderRadius: 10,
    width: "auto",
    paddingHorizontal: 10
  },
  tabview_style: {
    flex: 1,
    marginTop: 5,
    marginTop: Platform.OS === 'ios' ? 22 : 0,

  },
  noLabel: {
    display: "none",
    height: 0
  },
  modelViewLoc: {
    width: '100%', alignSelf: 'center',
    borderRadius: 1, backgroundColor: "#f4f4f4", height: "100%", top: "0%",
  },
  modelViewComment: {
    width: '90%', alignSelf: 'center',
    borderRadius: 15, backgroundColor: "#E8E6EE", top: "10%",
    borderWidth: 3, borderColor: "#446BD6", height: "70%"
  },
  editTextStyle: {
    // width: "85%",
    color: Colors.black,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 45,
    paddingLeft: 10

  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: -10,

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
  bagCodeText: {
    color: '#000000', fontWeight: "bold", fontSize: 20, alignSelf: "center"
  }
});
