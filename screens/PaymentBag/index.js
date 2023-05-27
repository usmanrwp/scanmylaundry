import React, { Component } from "react";
import {
  View, TouchableOpacity, Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  Image
} from "react-native";
import Text from "../../components/CustomText";
// import Image from "../../components/Cache_Image";
import styles from "./style";
import Header_ from "../../components/Header";
import Stripe from "react-native-stripe-api";
import Colors from "../../constants/Colors";
import { CreditCardInput, LiteCreditCardInput, CardView } from "react-native-credit-card-input";
import LinearGradient from 'react-native-linear-gradient';
import Cart from "../../Database/Cart";
import { ScrollView } from "react-native-gesture-handler";
import CreditCard from "../../Database/CreditCard";
import stripe from 'tipsi-stripe'
import Version from "../../Database/Version";

const CreditCardDB = new CreditCard();
const cartDB = new Cart();
const versionDB = new Version();

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      buttonActive: false,
      cardNum: '',
      expiryDate: '',
      cvcNo: '',
      amount: '',
      item_name: '',
      item_number: '',
      creditCardData: '',
      name: '',
      add1: '',
      add2: '',
      zipCode: '',
      city: '',
      loading: false,
      screenName: '',
      data1: '',
      animateLat: '',
      animateLong: '',
      mapRegion: '',
      mapRegionMain: '',
      cardModel: false,
      savedCard: "",
      isSaveCardUse: false
    };
  }

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  componentDidMount = async () => {
    const email = await this.retrieveEmail();
    this.setState({
      email
    });

    var item_number = this.props.navigation.getParam('item_number', '0');
    var item_name = this.props.navigation.getParam('item_name', '0');
    var amount = this.props.navigation.getParam('amount', '0');
    var screenName = this.props.navigation.getParam('screenName', '0');
    this.setState({ item_name, item_number, amount, screenName })
    // alert(amount);
    this.getSavedData()

    const res = await versionDB.existanceCheck();

    stripe.setOptions({
      publishableKey: res.PublishKey,
      // publishableKey: 'pk_test_51HZwpPCrjc44byeF8Ha4274xy9emsmxpjhepJ0QSOxV2e15pK3C7YWY6c6zbhmghq71oKTMsPmHNXi7fEvl5HilW00Aj2Wp9WU',
    });

  }


  paymentBag = async () => {

    if (this.state.name === '') {
      alert("Please Enter Name")
    } else if (this.state.add1 === '') {
      alert("Please Enter Address")

    } else if (this.state.zipCode === '') {
      alert("Please Enter Zip Code")

    } else if (this.state.city === '') {
      alert("Please Enter City")

    }
    else {
      this.setState({ buttonActive: false, loading: true })
      let e_data = this.state.expiryDate;

      stripe.createTokenWithCard({
        number: this.state.cardNum.replace(/ /g, ''),
        expMonth: parseInt(e_data.toString().split('/')[0]),
        expYear: parseInt(e_data.toString().split('/')[1]),
        cvc: this.state.cvcNo
      }).then(token => {
        console.log(token);
        // alert("aaaaaa "+JSON.stringify(token.tokenId))
        this.apiCallPayment(token.tokenId)
      }).catch(error => {

        Alert.alert(
          "Payment Unsuccessful",
          "transaction unsuccessfull. please try again",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        this.setState({ buttonActive: true, loading: false })

      });




    }
  }


  apiCallPayment = async (tokenid) => {

    let param = {};
    param["email"] = this.state.email;
    param["token"] = tokenid;
    param["amount"] = this.state.amount;
    param["currency_code"] = 'GBP';
    param["item_name"] = "Essex Order";
    param["item_number"] = this.state.item_number;

    // alert(JSON.stringify(token));

    await fetch("https://scanmylaundry.com/api/stripe/make_bag_transaction.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ z: param })
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))
        // this.setState({ buttonActive: true, loading: false })

        if (responseJson.status === "1") {

          this.success(responseJson.message);
          this.setState({ buttonActive: true, loading: false })


        } else {
          // alert("transaction unsuccessfull. please try again");

          Alert.alert(
            "Payment Unsuccessful",
            responseJson.message,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          this.setState({ buttonActive: true, loading: false })


        }
        return responseJson;
      })
      .catch(error => {
        // alert(error);
        // this.setState({ buttonActive: true, loading: false })

        Alert.alert(
          "Payment Unsuccessful",
          "transaction unsuccessfull. please try again.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        this.setState({ buttonActive: true, loading: false })


        return error;
      });


  }


  success = async (msg) => {
    await cartDB.clearCart();
    this.SaveCard()
    Alert.alert(
      "Payment Successful",
      msg,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    // await cartDB.clearCart();
    this.props.navigation.navigate("Dashboard")

  }

  _onFocus = field => {
    console.log(field);
  }

  _onChange = async (formData) => {
    // console.warn(JSON.stringify(formData.values, null, " "));
    // console.warn(JSON.stringify(formData.values.expiry, null, " "));
    // console.warn(JSON.stringify(formData.values.cvc, null, " "));
    if (formData.valid) {
      this.setState({
        buttonActive: true, cardNum: formData.values.number,
        expiryDate: formData.values.expiry, cvcNo: formData.values.cvc, creditCardData: formData
      })

    }
    else {
      this.setState({
        buttonActive: false, cardNum: '',
        expiryDate: '', cvcNo: ''
      })
    }
  }

  place_get = async (value) => {
    this.setState({ add1: value })
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
  }

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
  }

  location_select = async item => {
    const place_id = item.place_id;
    const description = item.description;
    this.setState({ add1: description, add2: "", zipCode: "", city: "" });
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

        this.setState({
          animateLat: responseJson.result.geometry.location.lat,
          animateLong: responseJson.result.geometry.location.lng,
          add1: description,
          data1: "",
        });

        let region = {
          latitude: responseJson.result.geometry.location.lat,
          longitude: responseJson.result.geometry.location.lng,
          latitudeDelta: 0.00922 * 0.25,
          longitudeDelta: 0.00421 * 0.25
        };

        // this.setState({
        //   mapRegion: region,
        //   mapRegionMain: region,
        //   mapVisible: false
        // });

      })
      .catch(error => {
        console.error(error);
      });
  }

  setLocationDetail = async (latitude, longitude) => {
    const res = await this.locationDetails(latitude, longitude);

    let address = "false";
    let town = "false";
    let county = "false";
    let postal_code = "false";
    let house_noo = "false";

    let location = res;

    // console.warn("qwqwqwqw " + JSON.stringify(res.results[0]));
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
    console.warn("qwqwqwqw " + JSON.stringify(res.results[0].address_components[2]));
    house_noo = res.results[0].address_components[0].long_name;

    // if (!(house_noo === "false")) {
    //   this.setState({
    //     house_no: house_noo
    //   });
    // }

    // if (!(address === "false")) {
    //   if (!(house_noo === "false")) {
    //     this.setState({ add1: house_noo + " " + address });
    //   }
    //   else {
    //     this.setState({ add1: address });
    //   }
    // }
    // else if (!(town === "false")) {
    //   this.setState({ add1: town });
    // } else if (!(county === "false")) {
    //   this.setState({ add1: county });
    // }

    if (!(town === "false")) {
      this.setState({ add2: town + " " + county });
    }
    else if (!(county === "false")) {
      this.setState({ add2: county });
    }
    this.setState({ zipCode: postal_code });

    if (!(county === "false")) {
      this.setState({ city: county });
    }

    if (this.state.add1 === "false") {
      this.setState({ add1: "" });
    }
    if (this.state.add2 === "false") {
      this.setState({ add2: "" });
    }
    if (this.state.zipCode === "false") {
      this.setState({ zipCode: "" });
    }
  }

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

  SaveCard = async () => {
    // const card_Details = await CreditCardDB.listCategory();
    // await CreditCardDB.clearCart();
    let s_data = [];
    s_data.push({
      CardNo: this.state.cardNum,
      Expiry: this.state.expiryDate,
      CVC: this.state.cvcNo,
      Name: this.state.name,
      Address1: this.state.add1,
      Address2: this.state.add2,
      PostalCode: this.state.zipCode,
      City: this.state.city,
    });

    const card_Details = await CreditCardDB.listCategory();
    // alert(JSON.stringify(card_Details))
    if (card_Details.length > 0) {
      const CardNos = [...new Set(card_Details.map(q => q.CardNo))];
      let ress = this.isInArray(CardNos, this.state.cardNum)
      if (ress) {
        await CreditCardDB.update_card_record(s_data[0]);
      }
      else {
        await CreditCardDB.addCategory(s_data[0]);
      }
    }
    else {
      await CreditCardDB.addCategory(s_data[0]);
    }
    // setTimeout(async () => {
    //   const card_Details = await CreditCardDB.listCategory();
    //   alert(JSON.stringify(card_Details))
    // }, 1500);
  }

  isInArray = (array, value) => {
    return (array.find(item => { return item == value }) || []).length > 0;
  }

  showSaveCard = () => {
    this.setState({ cardModel: true })
  }

  closecomment = () => {
    this.setState({ cardModel: false })
  }

  getSavedData = async () => {
    const card_Details = await CreditCardDB.listCategory()
    if (card_Details.length > 0) {
      this.setState({ savedCard: card_Details })
      this.showSaveCard()
    }
  }

  setupCard = async (item) => {
    this.closecomment()
    this.setState({
      cardNum: item.CardNo, expiryDate: item.Expiry, cvcNo: item.CVC,
      name: item.Name, add1: item.Address1, add2: item.Address2, zipCode: item.PostalCode, city: item.City,
      isSaveCardUse: true, buttonActive: true
    })
  }


  render() {
    return (
      <View style={styles.appContainer}>
        <View>
          <Header_
            title="Payment"
            left
            back
            round_corner={35}
            onBackPress={this.headerBackPress} />
        </View>

        <KeyboardAvoidingView style={styles.container}
          behavior='height'>
          <ScrollView style={{ flex: 1, }}>
            {this.state.isSaveCardUse ?
              <View style={{ alignItems: "center" }}>
                <CardView
                  autoFocus
                  labelStyle={{ flexDirection: "column" }}
                  onChange={this._onChange}
                  number={this.state.cardNum}
                  name={" "}
                  expiry={this.state.expiryDate}
                  cvc={this.state.cvcNo} />
              </View>
              :
              <CreditCardInput
                autoFocus
                labelStyle={{ flexDirection: "column" }}
                onChange={this._onChange} />
            }

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 15 }}>Name</Text>
            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Address Line 1</Text>

            <View style={styles.editTextContainer}>
              <TextInput
                // onChangeText={add1 => this.setState({ add1 })}
                // value={this.state.add1}
                onChangeText={add1 => this.place_get(add1)}
                value={this.state.add1}
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
            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Address Line 2</Text>

            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={add2 => this.setState({ add2 })}
                value={this.state.add2}
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>City</Text>

            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={city => this.setState({ city })}
                value={this.state.city}
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>

            <Text style={{ color: '#000000', marginHorizontal: 22, marginTop: 1 }}>Postal Code</Text>

            <View style={styles.editTextContainer}>
              <TextInput
                onChangeText={zipCode => this.setState({ zipCode })}
                value={this.state.zipCode}
                numberOfLines={1}
                style={styles.editTextStyle} />
            </View>


            {this.state.buttonActive ?
              (
                <TouchableOpacity
                  onPress={() => this.paymentBag()}
                  // onPress={() => this.SaveCard()}
                  // onPress={() => this.showSaveCard()}
                  style={{ alignItems: "center", }}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    borderRadius: 35,
                    height: 50,
                    width: "90%",
                    justifyContent: "center"
                  }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}>
                      <Text
                        style={{ color: Colors.white, fontSize: 20, alignItems: "center" }}>PAY</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={.9}
                  // onPress={() => this.showSaveCard()}
                  style={{ alignItems: "center", }}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#808080', '#808080', '#808080']} style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    borderRadius: 35,
                    height: 50,
                    width: "90%",
                    justifyContent: "center"
                  }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: Colors.white, fontSize: 20, alignItems: "center" }}>PAY</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )
            }

            <Text style={{ marginHorizontal: 22, marginBottom: 15 }}></Text>
          </ScrollView>
        </KeyboardAvoidingView>

        {this.state.loading ?
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator size="large" color="#446BD6" />

          </View>
          : null}


        <Modal
          style={{ height: "50%", }}
          animationType="slide"
          transparent={true}
          visible={this.state.cardModel}
          onRequestClose={() => { this.setState({ cardModel: false }) }}>
          <View style={styles.modelViewComment}>
            <TouchableOpacity onPress={() => this.closecomment()}
              style={{ alignSelf: "flex-end" }}>
              <Image style={{ height: 29, width: 29, borderRadius: 8, marginTop: 3, marginRight: 4 }}
                source={require('../../Images/cross.png')} />
            </TouchableOpacity>
            {/* <Text style={{ color: "black", alignSelf: "center" }}>Would you like to use this card</Text> */}

            <FlatList
              data={this.state.savedCard}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={{ marginTop: 7, marginHorizontal: 22, }}>
                  <View style={{ flexDirection: "row", backgroundColor: "white", padding: 3, borderRadius: 20 }}>
                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>{"**** **** **** " + item.CardNo.split(' ')[3]}</Text>
                      <Text style={{ color: "black", fontSize: 16 }}>{"expires " + item.Expiry}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setupCard(item)}
                      style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
                        style={{ borderRadius: 35, height: 30, width: 50, justifyContent: "center" }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                          <Text style={{ color: Colors.white, fontSize: 14, alignItems: "center" }}>Use</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              )} />

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

  retrieveEmail = async () => {
    const res = await _retrieveData();
    if (res.includes("Empty_LocalCache")) {
      return "empty";
    } else {
      return res;
    }
  };
}

export default index;
