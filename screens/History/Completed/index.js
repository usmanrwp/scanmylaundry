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
// console.disableYellowBox = true;
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
      feedbackVisible: false,
      img_assign: require('../images/dropped.png'),
      img_arr_s: []
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
    if (res[2].length === 0 || res[2] === "No order") {
      res[2] = "No order";
    } else {
      for (let i = 0; i < res[2].length; i++) {
        const OrderStatusEssexResponse = await OrderStatusEssex(
          res[2][i].Work_status
        );
        res[2][i].textStatus = OrderStatusEssexResponse.textStatus;
        res[2][i].colorStatus = OrderStatusEssexResponse.colorStatus;
      }
    }


    const img_arr = [];
    for (let i = 0; i < res[2].length; i++) {
      const element = res[2][i];

      if (element.Work_status === "dropped") {
        this.setState({ img_assign: require('../images/dropped.png') })
        img_arr[i] = require('../images/dropped.png')
      } else if (element.Work_status === "completed") {
        this.setState({ img_assign: require('../images/completed.png') })
        img_arr[i] = require('../images/completed.png')
      }
      else {
        this.setState({ img_assign: require('../images/dropped.png') })
       img_arr[i] = require('../images/dropped.png')

      }
    }


    this.setState({
      data: res[2],
      refreshing: false,
      loading: false,
      img_arr_s: img_arr
    });
  };

  openDetails = async item => {
    navigation.navigate("HistoryDetails", { item: item });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        loading: true
      },
      () => this.loadOrders()
    );
  };

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
          renderItem={({ item, index }) => {
            return (
              <View style={styles.card}>
               
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image} source={this.state.img_arr_s[index]} />
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
                      <Text style={[styles.status, { color: "#446BD6" }]}>{" " + item.textStatus}</Text>
                  
                      </Text>
                    </View>
                  </View>
                </View>

                {/* </TouchableOpacity> */}
                {/* Details End */}
                {/* Profile Button Start */}




                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AgentProfile", { item: item })
                  }
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>

                    <Text style={styles.buttonText}>
                      {" "}
                      View Agent Profile
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Profile Button END */}

                {/* Rating Button Start */}
                {item.feedback_status === "false" ||
                  item.feedback_status === false ? (



                    <TouchableOpacity
                      onPress={() => this.openFeedback(item)}

                    >
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>



                        <Text style={styles.buttonText}>
                          Rate your experience
                      </Text>

                      </LinearGradient>
                    </TouchableOpacity>

                  ) : null}



                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("HistoryDetails", { item: item })
                  }
                >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                      View order
                </Text>
                  </LinearGradient>
                </TouchableOpacity>



                {/* Rating Button END */}






              </View>
            );
          }}
        />
      </View>
    );
  }
  openFeedback = item => {
    navigation.navigate("Feedback", { item: item });
  };
}
