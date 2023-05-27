import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Image, Dimensions } from "react-native";
import Text from "../../components/CustomText";
import styles from "./style";
import _fetch from "../../fetch_function/_fetch";
import SubCategory from "../../Database/SubCategory";
import Category from "../../Database/Category";
import Cart from "../../Database/Cart";
import Cache_Image from "../../components/Cache_Image";
import Colors from "../../constants/Colors";
import { Image_Show_Url } from "../../urls/Image_Show_Url";
import _retrieveData from "../../local_cache/new/_retrieveData";
import _storeData from "../../local_cache/new/_storeData";
import _deleteData from "../../local_cache/new/_deleteData";
import _deleteData1 from "../../local_cache/_deleteData";
import Toast_ from "../../functions/Toast_";
import Dashboard from "../Dashboard";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabViewLoader from "../../components/TabViewLoader";
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
let navigate = null;
let dataID = null;
let mainThis = null;
const subCategoryDB = new SubCategory();
const cartDB = new Cart();
const categoryDB = new Category();
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataa: [],
      dataa_dropdown: [],
      dataID: "",
      amount: "ORDER",
      metaData: false,
      loading: true,
      status: true,
      refresh: true
    };
  }
  componentDidMount = async () => {
    this.fetch_dataa();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetch_dataa();
      }
    );
  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  fetch_dataa = async () => {
    await this.setState({ dataID });
    this.setState({ refresh: !this.state.refresh })
    let categories_Show = await categoryDB.super_Category_match(this.state.dataID);
    this.setState({ dataa_dropdown: categories_Show });
    let ddd = this.state.dataa_dropdown;
    let data = [];
    let data_ = [];
    for (let i = 0; i < ddd.length; i++) {
      data_[i] = ddd[i].OID;
    }
    this.onChange(data_);
  }
  navigate_data = async (navigate_, pdataID, pmainThis) => {
    navigate = navigate_;
    dataID = pdataID;
    mainThis = pmainThis;
    let categories_Show = await categoryDB.super_Category_match(pdataID);
    this.setState({ dataa_dropdown: categories_Show });
    let ddd = this.state.dataa_dropdown;
    let data = [];
    let data_ = [];
    for (let i = 0; i < ddd.length; i++) {
      data_[i] = ddd[i].OID;
    }
    this.onChange(data_);
  };
  onChangeText = async (text) => {
    let abc;
    let data_drop = this.state.dataa_dropdown;
    for (let i = 0; i < data_drop.length; i++) {
      abc = data_drop[i].Name;
      if (abc === text) {
        let subCategoryRes = await subCategoryDB.listSubCategory(data_drop[i].OID);
        this.setState({ dataa: subCategoryRes });
      }
    }
  }
  onChange = async (data_a) => {
    let data_k = data_a;
    var all_ = [];
    for (let i = 0; i < data_k.length; i++) {
      let subCategoryRes = await subCategoryDB.listSubCategory(data_k[i]);
      all_.push(...subCategoryRes);
    }
    if (all_ === null || all_ === 'null' || all_ === undefined || all_ === "" || all_.length === 0) {
      this.setState({
        status: false
      });
    }
    else {
      this.setState({ status: true });
    }
    this.setState({ dataa: all_, loading: false });
  }
  render() {
    let ddd = this.state.dataa_dropdown;
    let data = [];
    let data_ = [];
    if (ddd === null || ddd === 'null' || ddd === undefined || ddd === "") {
    }
    else {
      ddd.forEach(item => {
        data.push({
          value: item.Name,
          key: item.OID
        });
      });
      for (let i = 0; i < ddd.length; i++) {
        data_[i] = ddd[i].OID;
      }
    }
    if (this.state.loading) {
      return <TabViewLoader />;
    }
    return (
      <View style={styles.container}>
        {this.state.status ?
          <View >
            <Dropdown
              lineWidth={0}
              fontSize={14}
              baseColor={'#FFFFFF'}
              textColor='#ffffff'
              selectedItemColor="#000000"
              containerStyle={styles.pickerStyle}
              dropdownOffset={{ top: 18 }}
              label="Select" data={data}
              onChangeText={this.onChangeText}
            />
          </View>

          : null}

        <FlatList
          style={styles.liqst}
          data={this.state.dataa}
          metaData={this.state.metaData}
          extraData={this.state.refresh}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            return (
              <View style={{ backgroundColor: "#fff", flex: 1, marginHorizontal: 15, marginTop: 10, paddingVertical: 7 }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Cache_Image
                      uri={item.Picture}
                      style={{ height: 105, width: 88, borderRadius: 5, marginHorizontal: 10 }} />
                    {item.cart === 0 ||
                      item.cart === "null" ||
                      item.cart === null ? null : (
                        <View
                          style={{ alignSelf: "flex-end", position: 'absolute', bottom: 0 }}>
                          <Text style={{
                            backgroundColor: "#446BD6", paddingRight: 8, paddingLeft: 8, paddingTop: 3,
                            paddingBottom: 3, marginTop: 3, fontSize: 14, marginRight: 15, marginBottom: 8, fontWeight: "bold"
                          }}>
                            {item.cart}
                          </Text>
                        </View>
                      )}
                  </View>

                  <View>
                    <Text
                      style={{ color: Colors.black, fontSize: 14, fontFamily: "Raleway-BoldItalic", }}>
                      {item.Name}
                    </Text>
                    <Text style={{ color: Colors.black, fontSize: 12.4, opacity: 0.8, width: screen_size_width * .56, }}>
                      {item.Detail}</Text>
                    <View style={{ flexDirection: "row", alignItems: "flex-end", flex: 1 }}>
                      <LinearGradient
                        style={{ borderRadius: 23, flex: 1, marginTop: 3, flexDirection:"row", justifyContent:"center" }}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#446BD6', '#446BD6', '#5652D5']}>
                        <Text style={{color: "#fff", fontWeight:Platform.OS === 'ios' ? "500" : "bold",textAlign: "center",
                            paddingBottom: 5, paddingTop: 5, fontSize: 17, marginTop: Platform.OS === 'ios' ? 3 : 0,}}>£</Text>
                        <Text
                          style={{ textAlign: "center",
                            paddingBottom: 5, paddingTop: 5, fontSize: 17, marginLeft:2,
                            fontFamily: "SpaceMono-Regular",
                            fontWeight: "bold"
                          }}>
                          {item.Price}
                        </Text>
                      </LinearGradient>
                      <View
                        style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                        <TouchableOpacity
                          onPress={() => this.removeItem(item.Item_Id, item.C_ID, item)}>
                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/minus.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ marginLeft: 10, marginRight: 5 }}
                          onPress={() =>
                            this.addItem(
                              item.Item_Id,
                              item.C_ID,
                              item.Name,
                              item.Price,
                              item)}>
                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/plus.png')} />
                        </TouchableOpacity>
                      </View>

                    </View>


                  </View>

                </View>

              </View>


            );
          }}
        />
      </View>
    );
  }

  addItem = async (ID, C_ID, Name, Price, data) => {
    // alert(ID +" a "+C_ID+" b "+Name+" c "+Price)

    const res = await cartDB.addItem(ID, C_ID, Name, Price);
    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    this.changeCart(data, Quantity);
    const totalCartItem = await cartDB.totalCartItems();
    const obj = new Dashboard();
    obj.refreshAmount(mainThis, Number(totalCartItem));
  };

  removeItem = async (ID, C_ID, data) => {
    const res = await cartDB.removeItem(ID, C_ID);
    if (res === "0~0") {
      return;
    }
    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    this.changeCart(data, Quantity);
    const totalCartItem = await cartDB.totalCartItems();
    console.warn("totalCartItem remove CL1=>\n", totalCartItem);
    const obj = new Dashboard();
    obj.refreshAmount(mainThis, Number(totalCartItem));
  };
  changeCart = (data, Quantity) => {
    let abcde = this.state.dataa;
    for (let i = 0; i < abcde.length; i++) {
      if (abcde[i].ID === data.ID) {
        abcde[i].cart = Number(Quantity);
      }
    }
    this.setState({
      dataa: abcde,
      metaData: !this.state.metaData
    });
  };
}
