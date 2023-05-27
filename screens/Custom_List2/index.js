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
// let data = [];

// var categories_Show = [];

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
    };
  }

  componentDidMount = async () => {
    await this.setState({
      dataID
    });


    let categories_Show = await categoryDB.super_Category_match(this.state.dataID);

    // alert(JSON.stringify(categories_Show));

    this.setState({
      dataa_dropdown: categories_Show,

    });


    let ddd = this.state.dataa_dropdown;

    // alert(JSON.stringify( ddd));

    let data = [];
    let data_ = [];


    for (let i = 0; i < ddd.length; i++) {


      data_[i] = ddd[i].OID;

    }


    this.onChange(data_);



    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })



  };








  componentWillUnmount() {
    this.focusListener.remove()
  }




  componentDidUpdate = async () => {





  }




  navigate_data = async (navigate_, pdataID, pmainThis) => {

    // alert(pdataID);

    navigate = navigate_;
    dataID = pdataID;
    mainThis = pmainThis;


    // alert("qqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwweeeeeeeeeeeee "+pdataID);

  };


  onChangeText = async (text) => {

    let abc;

    let data_drop = this.state.dataa_dropdown;


    for (let i = 0; i < data_drop.length; i++) {

      abc = data_drop[i].Name;

      if (abc === text) {
        let subCategoryRes = await subCategoryDB.listSubCategory(data_drop[i].OID);

        this.setState({
          dataa: subCategoryRes,
        });

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

      this.setState({
        status: true
      });
    }

    this.setState({
      dataa: all_,
      loading: false
    });
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

          // <View style={{ marginRight: "5%", fontSize: 20, marginLeft: '5%' }}>
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
          // </View>

          : null}

        <FlatList
          style={{ marginHorizontal:10, alignSelf:"center" }} 
          data={this.state.dataa}
          metaData={this.state.metaData}
          numColumns={3}
          // keyExtractor={item => {
          //   return item.id;
          // }}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;

            return (

              <View style={styles.card}>
                <View style={styles.cardHeader}>

                  {/* START OF IMAGE AND NAME  AND ADD MINUS CART*/}

                  <View
                    style={{
                      marginLeft: 10,
                      marginRight: 5
                    }}
                  >
                    {/* IMAGE  START */}

                    <Cache_Image
                      uri={item.Picture}
                      style={{
                        height: 85,
                        width: 87,
                        borderRadius: 5,
                        paddingBottom: 1
                      }}
                    />


                    {item.cart === 0 ||
                      item.cart === "null" ||
                      item.cart === null ? null : (
                        <View
                          style={{
                            alignSelf: "flex-end",
                            position: 'absolute',
                            bottom: 0
                          }}
                        >
                          <Text
                            style={{
                              backgroundColor: "#446BD6",
                              paddingRight: 8,
                              paddingLeft: 8,
                              paddingTop: 3,
                              paddingBottom: 3,
                              marginTop: 3,
                              fontSize: 16,
                              marginRight: 10,
                              marginBottom: 8,
                              fontWeight: "bold",
                            }}
                          >
                            {item.cart}
                          </Text>
                        </View>
                      )}
                  </View>

                  <View style={{ flexDirection: "column", marginLeft: 5, }}>
                    <View style={{ flexDirection: "column", alignItems:"center", justifyContent:"center" }}>
                      <View
                        style={{ marginTop: 2, width: screen_size_width * .25,
                        justifyContent: "center", height:33, }}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 14,
                            lineHeight: 16,
                            fontFamily: "Raleway-BoldItalic"}}>
                          {item.Name}
                        </Text>
                      </View>


                      <View>
                        <Text style={{
                          color: "#393939", height: 73, 
                          width: screen_size_width * .25,
                          fontSize: 11.7,
                        }}>{item.Detail}</Text>
                      </View>
                    </View>

                    <View style={{flexDirection: "column"}}>

                      <View style={{ flexDirection: "row"}}>
                        <Text style={{color: "#446BD6", fontWeight:Platform.OS === 'ios' ? "500" : "bold",
                        marginTop: Platform.OS === 'ios' ? 3 : 0,}}>£</Text>
                        <Text
                          style={{color: "#446BD6",
                            textAlign: "left",
                            paddingBottom: 1.5,
                            paddingTop: 1.5,
                            fontSize: 16,
                            marginLeft:2,
                            fontFamily: "SpaceMono-Regular",
                            fontWeight: "bold",}}>
                          {item.Price}
                        </Text>

                      </View>
                      {/* BUTTON ADD TO CART  Start*/}
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 2,
                          marginLeft: -12,
                          alignItems: 'center',
                          alignSelf: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.removeItem(item.Item_Id, item.C_ID, item)
                          }
                        >
                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/minus.png')}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity

                          style={{
                            marginLeft: 12,
                          }}
                          onPress={() =>
                            this.addItem(
                              item.Item_Id,
                              item.C_ID,
                              item.Name,
                              item.Price,
                              item
                            )
                          }
                        >
                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/plus.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* BUTTON ADD TO CART END */}
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

  // <Text style={{ fontSize: 20 }}> </Text>

  addItem = async (ID, C_ID, Name, Price, data) => {
    const res = await cartDB.addItem(ID, C_ID, Name, Price);

    const Total_Price = res.split("~")[0];
    const Quantity = res.split("~")[1];
    this.changeCart(data, Quantity);
    const totalCartItem = await cartDB.totalCartItems();
    // console.warn("totalCartItem add CL1=>\n", totalCartItem);

    const obj = new Dashboard();
    obj.refreshAmount(mainThis, Number(totalCartItem));
  };

  removeItem = async (ID, C_ID, data) => {
    const res = await cartDB.removeItem(ID, C_ID);
    // console.warn("MINUS\n", res);
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
