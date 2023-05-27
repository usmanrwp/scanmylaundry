import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Text from "../../components/CustomText";
import { NavigationEvents } from "react-navigation";
import _retrieveData from "../../local_cache/_retrieveData";
import _fetch from "../../fetch_function/_fetch";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import LinearGradient from "react-native-linear-gradient";
import styles from "./style";
import Header_ from "../../components/Header";
import _imageUpload from "../../fetch_function/_imageUpload";
import Loader from "../../components/Loader";
import Profile from "./Profile/index";
import Review from "./Review/index";


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Profile", indx: 0 },
        { key: "second", title: "Review", indx: 1 }
      ],
      loading: true,
      email: null,
      picture: "",
      name: "",
      item: [],
      res: [],
      selectedItem: 0
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
    const item = navigation.getParam("item", null);
    console.warn("item", item);
    this.setState(
      {
        item
      },
      () => this.load_data()
    );
  };

  load_data = async () => {
    let param = {};
    param["email"] = this.state.item.email;
    const res = await _fetch("read_user_profile", param);
    let name = res[0].Name;
    let picture = res[0].Picture;
    if (name === "null" || name === null) {
      name = "";
    }
    if (picture === "null" || picture === null) {
      picture = "";
    }
    await this.setState({
      res,
      name,
      email: this.state.item.email,
      picture,
      loading: false
    });
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Profile data={this.state.res} email={this.state.email} />;
      case "second":
        return <Review email={this.state.email} />;
      default:
        return null;
    }
  };

  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({ selectedItem: index });
    //  alert(index);
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        {/* <Profile data={this.state.res} /> */}
        {/* <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.profilePictureMainContainer}
            onPress={() => this.setState({ Image_Picker_SelectionModel: true })}
          >
            <View style={styles.profilePictureContainer}>
              <Image
                source={{
                  uri: this.state.picture
                }}
                style={styles.profilePicture}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.nameBusinessContainer}>
            <Text style={styles.nameBusiness}>{this.state.name}</Text>
          </View>
        </View> */}

        {/* <Image
          source={{
            uri: this.state.picture
          }}
          style={styles.profilePicture1} />

<View style={styles.color_f}>


</View> */}




        {/* <View style={{ width: screen_size_width* 1}}> */}


        <Header_ title="Profile" left back onBackPress={this.backPressed} />



        {/* <View style={{ flexDirection:"row" , backgroundColor:"blue"}}> */}

        <TabView
          navigationState={this.state}
          lazy={true}
          style={{ marginTop: 0 }}
          // renderScene={SceneMap({
          //   first: Profile,
          //   second: Review
          // })}
          renderScene={this._renderScene}
          renderTabBar={props => (


            <View>



              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                style={{ borderBottomLeftRadius: 40 }}>
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: "transparent"
                  }}
                  style={{ backgroundColor: "transparent" }}
                  // renderIcon={({ route, focused, color }) => (
                  //   <Icon name={"images"} color="#fff" />
                  // )}
                  renderLabel={({ route, focused, color }) => (
                    <View
                      style={
                        this.state.selectedItem === route.indx ? {
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          borderRadius: 30,
                          width: 100,
                          alignItems: "center"

                        } : {
                            alignItems: "center"

                          }
                      }
                    >
                      <Text
                        style={{
                          color: "white",
                          padding: 7,
                          margin: 5,
                          fontSize: 12,
                          fontFamily: "Raleway-BoldItalic"
                        }}
                      >
                        {route.title}
                      </Text>
                    </View>
                  )}
                />
              </LinearGradient>



              <View style={styles.headerContainer}>
                <TouchableOpacity
                  style={styles.profilePictureMainContainer}
                  onPress={() => this.setState({ Image_Picker_SelectionModel: true })}
                >
                  <View style={styles.profilePictureContainer}>
                    <Image
                      source={{
                        uri: this.state.picture
                      }}
                      style={styles.profilePicture}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.nameBusinessContainer}>
                  <Text style={styles.nameBusiness}>{this.state.name}</Text>
                </View>
              </View>

              {/* <Image
                source={{
                  uri: this.state.picture
                }}
                style={styles.profilePicture1} /> */}

              {/* <View style={styles.color_f}>


              </View> */}



              {/* <View style={styles.headerContainer}>
                 
                    <View style={styles.profilePictureContainer}>
                      <Image
                        source={{
                          uri: this.state.picture
                        }}
                        style={styles.profilePicture}
                      />
                    </View>

                  <View style={styles.nameBusinessContainer}>
                    <Text style={styles.nameBusiness}>{this.state.name}</Text>
                  </View>
                </View> */}



            </View>




          )}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />


        {/* </View> */}




        {/* </View> */}








      </View>
    );
  }
}
