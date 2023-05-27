import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
  ImageBackground,

} from "react-native";



var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;


import { Icon, Button, Card, CardItem, Left, Body, Right, Title, Header } from 'native-base';
import Text from "../../components/CustomText";
import { NavigationEvents } from "react-navigation";
import _retrieveData from "../../local_cache/_retrieveData";
import _fetch from "../../fetch_function/_fetch";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import LinearGradient from "react-native-linear-gradient";
import Button_Icon from "../../components/Button_Icon";
import styles from "./style";
import _storeData from "../../local_cache/_storeData";
import Header_ from "../../components/Header";
import Image_Picker_Selection from "../../components/Image_Picker_Selection";
import Image_Picker from "../../functions/Image_Picker";
import _imageUpload from "../../fetch_function/_imageUpload";
import Loader from "../../components/Loader";
import Update from "./Update/index";
import _deleteData from "../../local_cache/new/_deleteData";
import RandomString from "../../functions/RandomString";
import LinearGradient from 'react-native-linear-gradient';


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{ key: "first", title: "Profile" }],
      loading: true,
      Image_Picker_SelectionModel: false,
      email: null,
      picture: "",
      name: "",
      backTo: ""
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = async() => {
    // this.props.navigation.navigate(this.state.backTo);
    // return true;
    this.props.navigation.goBack()
  };
  backPressed1 = async() => {
    this.props.navigation.navigate("Dashboard");
    // return true;
    // this.props.navigation.goBack()
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const navigation = this.props.navigation;
    const rb = navigation.getParam("rb", "Dashboard");
    await this.setState({
      backTo: rb
    });
    this.load_data();
    const updateObj = new Update(this.props.navigation);
    updateObj.navigate_data(this, this.props.navigation, this.state.backTo);
  };

  changeName = async (name, ot) => {
    ot.setState({
      name
    });
  };
  changePicture = async (picture, ot) => {
    await ot.setState({
      picture
    });
  };

  load_data = async () => {
    this.setState({
      loading: false
    });
    const email = await _retrieveData();
    let param = {};
    param["email"] = email;
    const res = await _fetch("read_user_profile", param);
    console.warn("read_user_profile Profile TOP==>\n", res);
    if (res === "User doesnot exists.") {
      await _deleteData("id");
      this.props.navigation.navigate("Login", { rb: this.state.backTo });
      return;
    }

    let name = res[0].Name;
    let picture = res[0].Picture;
    if (name === "null" || name === null) {
      name = "";
    }
    if (picture === "null" || picture === null) {
      picture = "";
    }

    await this.setState({
      name,
      email,
      picture
    });
  };

  hideModal = () => {
    this.setState({
      Image_Picker_SelectionModel: false
    });
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        {/* <Header_
          title="Profile"
          left
          back
          onBackPress={this.backPressed}
          save={true}
          // saveIcon="ios-log-out"
          savePress={this.logoutPress}
        /> */}
        
        <Image_Picker_Selection
          isVisible={this.state.Image_Picker_SelectionModel}
          hideModal={() => this.hideModal()}
          cancel={() => this.hideModal()}
          gallery={() => this.openGallery()}
          camera={() => this.openCamera()}
        />
        <View style={styles.headerContainer}>

          <Image
            source={{
              uri: this.state.picture
            }}
            style={styles.profilePicture1} />
            <View style={styles.color_f}>
            </View>
          <View style={{ position: "absolute" }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
              style={{ borderBottomLeftRadius: 35, height: 80, width: screen_size_width * 1, justifyContent:"center", alignContent:"center",}}>
              <View style={styles.header_style}>
                <Header hasTabs style={{ backgroundColor: "transparent" }}>
                  <Left>
                    <TouchableOpacity onPress={() =>
                      this.backPressed()} style={{ marginLeft: 10, marginRight: -20 }}>
                      <Image
                        style={{ height: 23, width: 20 }}
                        source={require('../../Images/back.png')}/>
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <View style={{flexDirection:"row"}}> 

                    <Title style={{color:"white" }}>Profile</Title>
                    <TouchableOpacity onPress={() =>
                      this.backPressed1()} style={{ marginLeft: 25, }}>
                      <Image
                        style={{ height: 23, width: 20 }}
                        source={require('../../Images/home.png')}/>
                    </TouchableOpacity>
                    </View>

                  </Body>
                  <Right>
                    <TouchableOpacity onPress={() =>
                      this.logoutPress()
                    } >


                      <Text>Logout</Text>

                    </TouchableOpacity>

                  </Right>

                </Header>
              </View>


            </LinearGradient>




            <TouchableOpacity
              style={styles.profilePictureMainContainer}
              onPress={() => this.setState({ Image_Picker_SelectionModel: true })}
            >
              <View >
                <Image
                  source={{
                    uri: this.state.picture
                  }}
                  style={styles.profilePicture}
                />
              </View>
              <View style={styles.profilePictureIconContainer}>
                <Button_Icon
                  size={50}
                  onPress={() =>
                    this.setState({ Image_Picker_SelectionModel: true })
                  }
                />
              </View>
            </TouchableOpacity>

          </View>
         
         
          {/* <View style={styles.nameBusinessContainer}>
            <Text style={styles.nameBusiness}>{this.state.name}</Text>
          </View> */}


        </View>
        <TabView
          navigationState={this.state}
          lazy={true}
          style={{ marginTop: -24 }}
          renderScene={SceneMap({
            first: Update
          })}
          renderTabBar={props => (


            <Text style={{
              color: 'black', backgroundColor: "#E8E6EE", borderTopLeftRadius: 20,
              borderTopRightRadius: 20, height: 30, bottom: 0
            }}>

            </Text>
            // <LinearGradient
            //   start={{ x: 0, y: 0 }}
            //   end={{ x: 1, y: 0 }}
            //   colors={["#d9207a", "#4279dc"]}
            // >
            // {/* <TabBar
            //   {...props}
            //   indicatorStyle={styles.indicatorStyle}
            //   style={styles.tabBarContainer}
            //   // renderLabel={({ route, focused, color }) => (
            //   //   <Text style={styles.tabViewText}>{route.title}</Text>
            //   // )}
            // /> */}
            // </LinearGradient>

          )}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />
      </View>
    );
  }

  openCamera = async () => {
    const res = await Image_Picker("camera");
    console.warn("camera\n", res);

    this.setState({ Image_Picker_SelectionModel: false });
    if (res === false || res === "cancel") {
      return;
    }

    this.uploadImage(
      this.state.email,
      res.filename,
      res.mime,
      res.data,
      res.path
    );
    this.setState({
      picture: res.path
    });
  };

  openGallery = async () => {
    const res = await Image_Picker("gallery");
    console.warn("gallery\n", res);

    this.setState({ Image_Picker_SelectionModel: false });
    if (res === false || res === "cancel") {
      return;
    }
    this.setState({
      loading: true
    });
    console.warn("gallery\n", res);

    this.uploadImage(
      this.state.email,
      res.filename,
      res.mime,
      res.data,
      res.path
    );
  };

  uploadImage = async (email, fileName, imageType, base_64, path) => {
    console.warn("email", email);
    console.warn("fileName", fileName);
    console.warn("imageType", imageType);
    console.warn("base_64", base_64);
    console.warn("path", path);
    let fn = fileName;
    if (fileName === undefined || fileName === "undefined") {
      let rns = await RandomString();
      fn = rns + ".jpg";
    }
    const res = await _imageUpload("upload_dp", email, fn, imageType, base_64);
    console.warn("Image Upload res==>", res);
    if (res.includes("The file has been uploaded.")) {
      this.setState({
        loading: false,
        picture: path
      });
    } else {
      alert("Not Upload.");
      this.setState({
        loading: false
      });
    }
  };

  logoutPress = async () => {
    const res = await _retrieveData();
    console.warn(res);
    if (res.includes("Empty_LocalCache")) {
      Toast_("Not login!");
    } else {
      console.warn("1");
      await _deleteData("id");
      console.warn("2");
      // this.props.navigation.navigate(this.state.backTo);
      // this.props.navigation.navigate('Dashboard');
      this.props.navigation.goBack()
      // _storeData(this.state.email);
      // this.props.navigation.pop(3);

      // navigation.pop(n);
    }
  };
}
