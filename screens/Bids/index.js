import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, BackHandler } from "react-native";
import Header_ from "../../components/Header";
import styles from "./style";
import Image from "../../components/Cache_Image";
import Text from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import moment from "moment";
import Colors from "../../constants/Colors";
import _fetch from "../../fetch_function/_fetch";
import _retrieveData from "../../local_cache/_retrieveData";
import Loader from "../../components/Loader";
import No_Record from "../../components/No_Record";
import ButtonPressLoader from "../../components/ButtonPressLoader";
import Toast_ from "../../functions/Toast_";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      item: [],
      email: "",
      refreshing: false,
      loading: true,
      acceptLoading: false
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

    const email = await _retrieveData();
    this.setState(
      {
        item,
        email
      },
      () => this.loadData()
    );
  };

  loadData = async () => {
    const param = {};
    param["email"] = this.state.email;
    param["order_id"] = this.state.item.id;
    console.warn("param111", param);
    const res = await _fetch("read_bids", param);
    if (
      res.length === 0 ||
      res === "" ||
      res === "No record" ||
      res === null ||
      res === "null"
    ) {
      this.setState({
        dataSource: "No record",
        loading: false,
        refreshing: false,
        acceptLoading: false
      });
      return;
    }
    this.setState({
      dataSource: res,
      loading: false,
      refreshing: false,
      acceptLoading: false
    });
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

    if (this.state.dataSource === "No record") {
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
      <View style={{ flex: 1 }}>
        <Header_ title="Bids" left back onBackPress={this.headerBackPress} />
        <View style={styles.container}>
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            data={this.state.dataSource}
            style={styles.eventList}
            renderItem={event => {
              let service = event.item;

              return (
                <View style={styles.boxMain}>
                  <View style={styles.box}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <Image style={styles.image} uri={service.picture} />

                        <View style={styles.nameContainer}>
                          <Text style={styles.title}>
                            {service.name.split(" ")[0]}
                          </Text>
                          {/* Rating start */}

                          <StarRating
                            disabled={true}
                            starSize={18}
                            starStyle={{ width: 20 }}
                            emptyStar={"ios-star-outline"}
                            fullStar={"ios-star"}
                            halfStar={"ios-star-half"}
                            iconSet={"Ionicons"}
                            maxStars={5}
                            rating={Number.parseFloat(service.rating)}
                            fullStarColor={"#f1c40f"}
                          />

                          {/* Rating End */}
                        </View>
                      </View>
                    </View>

                    <View style={styles.boxContent}>
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={[
                            styles.description,
                            { color: Colors.textPink_Name }
                          ]}
                        >
                          Price:{" "}
                        </Text>

                        <View style={styles.descriptionView1}>
                          <Text style={[styles.descriptionText1]}>
                            {service.price}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={[
                            styles.description,
                            { color: Colors.textPink_Name }
                          ]}
                        >
                          Comment
                        </Text>
                        <View style={styles.descriptionView}>
                          <Text style={styles.descriptionText}>
                            {" "}
                            {service.comment === "" ||
                            service.comment === "null" ||
                            service.comment === null
                              ? "NA"
                              : service.comment}
                          </Text>
                        </View>
                      </View>
                      {service.proposal_time === "null" ||
                      service.proposal_time === null ||
                      service.proposal_time === "" ? null : (
                        <View style={{ flexDirection: "column" }}>
                          <Text
                            style={[
                              styles.description,
                              { color: Colors.textPink_Name }
                            ]}
                          >
                            Time Proposal:
                          </Text>
                          <View style={styles.descriptionView}>
                            <Text style={styles.descriptionText}>
                              {moment(service.proposal_time).format("L")}
                              {"\n"}
                              {moment(service.proposal_time).format("LT")}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      borderTopColor: Colors.border,
                      marginBottom: 10,
                      marginTop: 5,
                      borderTopWidth: 2
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={[
                        {
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          // margin: -10,
                          flexDirection: "row"
                        }
                      ]}
                    >
                      {/* Button Start */}
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                          this.openProfile(service);
                        }}
                      >
                        <Text style={styles.buttonText}>Profile</Text>
                      </TouchableOpacity>
                      {/* Button End */}
                      {/* Button Start */}
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                          this.openDetails(service);
                        }}
                      >
                        <Text style={styles.buttonText}>Details</Text>
                      </TouchableOpacity>
                      {/* Button End */}

                      {/* Button Start */}
                      <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.acceptPress(service)}
                      >
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      {/* Button End */}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
  openDetails = async item => {
    this.props.navigation.navigate("HistoryDetails", { item: item });
  };
  openProfile = async item => {
    this.props.navigation.navigate("AgentProfile", { item: item });
  };
  acceptPress = async item => {
    this.setState({
      loading: true
    });
    console.warn(this.state.acceptLoading);

    const param = {};
    param["email"] = this.state.email;
    param["order_id"] = this.state.item.id;
    param["agent_email"] = item.email;
    console.warn("param", param);

    const res = await _fetch("assign_work", param);
    if (res === "Record created successfully") {
      this.props.navigation.goBack();
    } else {
      Toast_(res);
    }
    this.setState({
      loading: false
    });
  };
}
