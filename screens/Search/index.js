import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Image
} from "react-native";
import styles from "./style";
import Colors from "../../constants/Colors";
import { Header, Left, Button, Body, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import Cache_Image from "../../components/Cache_Image";
import SubCategory from "../../Database/SubCategory";
import Text from "../../components/CustomText";
import Cart from "../../Database/Cart";
import LinearGradient from 'react-native-linear-gradient';


const subCategoriesDB = new SubCategory();

const cartDB = new Cart();

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      data: [],
      subCategories: [],
      metaData: false
    };
  }

  onBackPress = () => {
    this.props.navigation.goBack();
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
    this.loadAllSubcategories();
  };

  loadAllSubcategories = async () => {
    const res = await subCategoriesDB.listAllSubCategorywithQuantityTotalPrice();
    // console.warn(res);

    this.setState({
      data: res,
      subCategories: res
    });
  };

  searchInput = async searchInput => {
    this.setState({ searchInput });
    this.search(searchInput);
  };

  search = async text => {
    if (text === null || text === "") {
      this.setState({
        metaData: !this.state.metaData,
        subCategories: this.state.data
      });
      return;
    }
    let filteredData = this.state.data.filter(function (item) {
      let res = item.Name.includes(text);
      if (res === true) {
        return res;
      }
    });
    this.setState({
      subCategories: filteredData,
      metaData: !this.state.metaData
    });
  };

  removeItem = async (ID, Item_ID, C_ID, data) => {
    const res = await cartDB.removeItem(Item_ID, C_ID);

    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    const price = Number(Quantity) * Number(data.Price);

    this.changeCart(data, Quantity, Total_Price, price);
  };

  addItem = async (ID, C_ID, Item_Id, Name, Price, data) => {
    // console.warn(Item_Id);

    const res = await cartDB.addItem(Item_Id, C_ID, Name, Price);
    // console.warn(res);

    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    const price = Number(Quantity) * Number(Price);
    this.changeCart(data, Quantity, Total_Price, price);
  };

  changeCart = (data, Quantity, Total_Price, total_item_price) => {
    let abcde = this.state.subCategories;

    for (let i = 0; i < abcde.length; i++) {
      if (abcde[i].ID === data.ID) {
        abcde[i].Quantity = Number(Quantity).toFixed(2);
        abcde[i].Total_Price = Number(total_item_price).toFixed(2);
      }
    }
    this.setState({
      orderItemData: abcde,
      metaData: !this.state.metaData
    });
  };

  render() {
    return (
      <View style={styles.appContainer}>

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
          style={{ borderBottomLeftRadius: 35, height: 80, alignContent: "center", alignItems: "center", }}>

          <View style={{ flexDirection: "row", marginTop: 17 }}>
            <Button onPress={this.onBackPress} transparent style={{ marginTop: 5, marginLeft: 10 }}>
              <Icon name="md-arrow-back" size={28} color="#fff" />
            </Button>

            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={searchInput => this.searchInput(searchInput)}
                value={this.state.searchInput}
                onFocus={() => this.setState({ searchInput: "" })}
                ref="searchInput"
                placeholder="Search Item"
                numberOfLines={1}
                placeholderTextColor={Colors.dullWhite}
                style={styles.editTextStyle}
                clearTextOnFocus={true}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Basket");
              }}>

              
              <Image


                style={styles.editTextImage}
                source={require('../../Images/cartt.png')}
              />
            </TouchableOpacity>

          </View>


        </LinearGradient>


        <View style={styles.bodyContainer}>
          <FlatList
            style={styles.itemList}
            data={this.state.subCategories}
            extraData={this.state.metaData}
            renderItem={post => {
              const item = post.item;
              let totalItemPrice = item.Total_Price;
              let Quantity = item.Quantity;
              if (Quantity === null || Quantity === "") {
                Quantity = "";
              } else {
                Quantity = parseInt(item.Quantity);
              }
              if (totalItemPrice === null || totalItemPrice === "null") {
                totalItemPrice = Number(item.Price).toFixed(2);
              } else {
                Number(item.Total_Price).toFixed(2);
              }
              return (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    padding: 5,
                    marginTop: 5,
                    marginBottom: 5,
                    backgroundColor: "#fff"
                  }}
                >
                  <TouchableOpacity
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
                    style={{ flexDirection: "row", paddingTop: 2, paddingBottom: 2, paddingLeft: 3 }}
                  >
                    <Cache_Image
                      uri={item.Picture}
                      style={{ height: 43, width: 43, }}
                    />
                    {Quantity === "" ||
                     Quantity === 0 ? null:
                     <Text style={{ color: "#fff",padding:3,textAlign: "center", position:"absolute", 
                     alignSelf:"flex-end", backgroundColor:"#446BD6", marginLeft:25, fontSize:12, width:20, marginBottom:15 }}>
                        {Quantity} 
                      </Text> 
                      }

                    <Text style={{ color: Colors.black, padding: 5, textAlign: "center", alignSelf: "center", marginLeft: 7 }}>
                      {/* <Text style={{ color: Colors.textGolden, padding: 5, textAlign: "center", }}>
                        {Quantity} {" "}
                      </Text> */}
                      {" "}{item.Name}
                      {/* {item.Name.slice(0, 20) + "..."} */}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      // alignItems: "flex-end",
                      justifyContent: "flex-end",
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 4,
                      alignItems:"center"
                    }}
                  >
                    {/* <Text
                      style={{
                        color: Colors.textGreen,
                        fontSize: 20,
                        padding: 5
                      }}
                    >
                      £ {totalItemPrice}
                    </Text> */}
                     <TouchableOpacity
                     style={{
                      marginRight: 8
                    }}

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
                            style={{ height: 26, width: 26, borderRadius: 8 }}
                            source={require('../../Images/plus.png')}
                          />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.removeItem(item.ID, item.Item_Id, item.C_ID, item)
                      }
                    >
                      <Image
                            style={{ height: 26, width: 26, borderRadius: 8 }}
                            source={require('../../Images/minus.png')}
                          />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
