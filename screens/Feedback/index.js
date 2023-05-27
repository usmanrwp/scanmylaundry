import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  TouchableOpacity
} from "react-native";
import { Textarea } from "native-base";
import Text from "../../components/CustomText";
import StarRating from "react-native-star-rating";
import _retrieveData from "../../local_cache/_retrieveData";
import styles from "./style";
import Header_ from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import Loader from "../../components/Loader";
import ButtonPressLoader from "../../components/ButtonPressLoader";
import Toast_ from "../../functions/Toast_";
import _fetch from "../../fetch_function/_fetch";
import LinearGradient from "react-native-linear-gradient";


export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      feedback: null,
      fbid: null,
      cspid: null,
      orderid: null,
      loading: true,
      feedbackLoading: false,
      item: []
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
    this.setState({
      item,
      loading: false,
      feedbackLoading: false
    });
  };

  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

  feedbackPress = async () => {
    if (this.state.rating === 0) {
      Toast_("Please select rating!");
      return;
    }
    let feedback = this.state.feedback;
    if (feedback === null || feedback === "null" || feedback === "") {
      feedback = "NA";
    }
    const email = await _retrieveData();
    const param = {};
    param["email"] = email;
    param["order_id"] = this.state.item.order_id;
    param["agent_email"] = this.state.item.email;
    param["comment"] = feedback;
    param["rating"] = this.state.rating;
    param["date"] = new Date();
    param["order_type"] = this.state.item.order_type;

    console.warn("param", param);
    const res = await _fetch("review", param);
    if (res === "Record created successfully") {
      this.props.navigation.goBack();
    } else {
      Toast_(res);
    }

    return;
  };

  headerBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <Header_
          title="Feedback"
          left
          back
          round_corner={35}
          onBackPress={this.headerBackPress}
        />
        <ScrollView>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>
              Rate your experience with us!
            </Text>
            <View style={styles.rating}>
              <StarRating
                disabled={false}
                maxStars={5}
                starStyle={{ color: "#f1c40f" }}
                rating={this.state.rating}
                selectedStar={rating => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
          <View style={styles.commentContainer}>
            <KeyboardAvoidingView>
              <Textarea
                rounded
                rowSpan={5}
                style={styles.commentText}
                // bordered
                onChangeText={value => this.setState({ feedback: value })}
                placeholder="Write your feedback (optional)"
              />
            </KeyboardAvoidingView>
          </View>
          {/* BUTTON START */}
          <View style={styles.buttonContainer}>
            {this.state.feedbackLoading ? (
              <ButtonPressLoader />
            ) : (
              // <CustomButton
              //   text="Feedback"
              //   iconLeft
              //   success={false}
              //   info
              //   iconLeftName="comment"
              //   onPress={this.feedbackPress}
              // />

              <TouchableOpacity onPress={this.feedbackPress}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                Feedback
          </Text>
              </LinearGradient>
            </TouchableOpacity>


            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
