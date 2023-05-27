import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Image } from "react-native";
// import Image from "../../../components/Cache_Image";
import Text from "../../../components/CustomText";
import styles from "./style";
import _retrieveData from "../../../local_cache/_retrieveData";
import _fetch from "../../../fetch_function/_fetch";
import { appImageUrl } from "../../../urls/appImageUrl";
import OrderStatusEssex from "../../../functions/OrderStatusEssex";
import No_Record from "../../../components/No_Record";
import TabViewLoader from "../../../components/TabViewLoader";
import LinearGradient from 'react-native-linear-gradient';


let navigation = null;

export default class index extends Component {
  navigate_data = navigate_ => {
    navigation = navigate_;
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      data: [],
      refreshing: false,
      loading: true,
      Seen_notSenn: false
    };
  }

  componentDidMount = async () => {
    await this.retrieveEmail();
    this.loadOrders();
  };

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

  loadOrders = async () => {
    let res = await _fetch("client_orders", this.state.email);
    console.warn("client_orders\n", res);
    if (res[0].length === 0 || res[0] === "No order") {
      res[0] = "No order";
    } else {
      for (let i = 0; i < res[0].length; i++) {
        const OrderStatusEssexResponse = await OrderStatusEssex(
          res[0][i].Work_status
        );
        res[0][i].textStatus = OrderStatusEssexResponse.textStatus;
        res[0][i].colorStatus = OrderStatusEssexResponse.colorStatus;
      }
    }
    console.warn(res[0]);

    if (res[0][0].Work_status === "not_seen") {
      this.setState({ Seen_notSenn: false })  // to show it  
    } else {
      this.setState({ Seen_notSenn: true })

    }



    this.setState({
      data: res[0],
      refreshing: false,
      loading: false
    });
  };

  openDetails = async item => {
    navigation.navigate("HistoryDetails", { item: item });
    // alert(JSON.stringify(item))
  };

  handleRefresh = () => {
    this.setState({ refreshing: true, loading: true },
      () => this.loadOrders()
    );
  };

  payBucket = (item) => {
    navigation.navigate("PaymentBag",
      {
        item_number: item.order_id,
        amount: item.Total_bill,
        screenName: "bagScreen"
        // email: email
      })
  }

  payNow = (item) => {
    navigation.navigate("Payment",
      {
        item_number: item.order_id,
        amount: item.Total_bill,
        screenName: "SimpleScreen"
        // email: email
      })
  }

  render() {
    if (this.state.loading === true) {
      return <TabViewLoader />;
    }
    if (this.state.data === "No order") {
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
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: 'row' }}>
                    {this.props.Seen_notSenn === true ? (
                      <Image
                        style={styles.image}
                        source={require('../images/seen.png')}
                      />
                    ) : (
                        <Image
                          style={styles.image}
                          source={require('../images/seen.png')}
                        />
                      )}
                    <View style={styles.cardContent}>
                      <View style={{ flexDirection: "row" }}>

                        <Text style={styles.count}>
                          Order #
                      <Text style={styles.name}>{" " + item.order_id}</Text>
                        </Text>
                        {item.order_type === "bucket" &&
                          <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Image
                              style={{ width: 30, height: 30, resizeMode: "contain" }}
                              source={require('../../../Images/shopping_bag.png')} />
                          </View>
                        }

                      </View>

                      <Text style={styles.date}>
                        Order Date:
                      <Text style={styles.date}>{" " + item.Creation_datetime}</Text>
                      </Text>
                      <Text style={styles.date}>
                        Order Status:
                      <Text style={[styles.status, { color: "#446BD6" }]}> Assigned</Text>
                      {/* <Text style={[styles.status, { color: "#446BD6" }]}> Seen</Text> */}
                      </Text>
                      
                    </View>
                  </View>


                  <TouchableOpacity
                    onPress={() => { this.openDetails(item) }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient1}>
                      <Text style={styles.buttonText}>
                        View order
                </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {item.Payment_status !== "true" &&
                    <View>
                      {item.order_type === "bucket" ?

                        <TouchableOpacity
                          onPress={() => { this.payBucket(item) }}>
                          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={{ marginLeft: 15, marginRight: 15, borderRadius: 23, }}>
                            <Text style={styles.buttonText}>
                              Pay Now
                              </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                          onPress={() => { this.payNow(item) }}>
                          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={{ marginLeft: 15, marginRight: 15, borderRadius: 23, }}>
                            <Text style={styles.buttonText}>
                              Pay Now
                        </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      }

                    </View>

                  }







                </View>

                {/* </TouchableOpacity> */}
                {/* Details End */}

                {/* Bider Button Start */}
                {/* {item.bidder === true || item.bidder === "true" ? (
                  <TouchableOpacity
                    style={styles.card1}
                    onPress={() => navigation.navigate("Bids", { item: item })}
                  >
                    <View style={styles.biderButtonContainer}>
                      <Text style={styles.biderButtonText}> View Bidders</Text>
                    </View>
                  </TouchableOpacity>
                ) : null} */}
                {/* Bider Button END */}
              </View>
            );
          }}
        />
      </View>
    );
  }
}
