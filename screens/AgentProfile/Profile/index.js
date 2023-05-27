import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import styles from "./style";
import _fetch from "../../../fetch_function/_fetch";
import _retrieveData from "../../../local_cache/_retrieveData";
import _deleteData from "../../../local_cache/_deleteData";
import TabViewLoader from "../../../components/TabViewLoader";
import DisableEditText from "../../../components/DisableEditText";

let res = [];

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: props.email,
      mobile: "",
      phone: "",
      address: "",
      postal_code: "",
      loading: true,
      updateLoading: false,
      data: props.data
    };
  }

  componentWillUnmount() {}

  componentDidMount = async () => {
    this.loadData();
  };

  loadData = () => {
    let name = this.state.data[0].Name;
    let address = this.state.data[0].Address;
    if (name === "null" || name === null) {
      name = "NA";
    }
    if (address === "null" || address === null) {
      address = "NA";
    }
    this.setState({
      name,
      address,
      phone: this.state.data[0].Tel,
      mobile: this.state.data[0].Mobile,
      loading: false
    });
  };

  render() {
    if (this.state.loading) {
      return <TabViewLoader />;
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView >

          {/* <KeyboardAvoidingView> */}
            <View style={styles.bodyContainer}>
             <Text style={{color:'black', marginLeft: 10, marginBottom: 5}}>Name</Text>

              <View style={styles.editTextStyle}>
                <DisableEditText
                  onPress={() => {}}
                  value={this.state.name}
                  // title="Name"
                />
              </View>

              <Text style={{color:'black', marginLeft: 10, marginBottom: 5}}>Email</Text>

              <View style={styles.editTextStyle}>
                <DisableEditText
                  onPress={() => {}}
                  value={this.state.email}
                  // title="Email"
                />
              </View>
              <Text style={{color:'black', marginLeft: 10, marginBottom: 5}}>Mobile Number</Text>

              <View style={styles.editTextStyle}>
                <DisableEditText
                  onPress={() => {}}
                  value={this.state.mobile}
                  // title="Mobile Number"
                />
              </View>
              <Text style={{color:'black', marginLeft: 10, marginBottom: 5}}>Phone Number</Text>

              <View style={styles.editTextStyle}>
                <DisableEditText
                  onPress={() => {}}
                  value={this.state.phone}
                  // title="Phone Number"
                />
              </View>
             <Text style={{color:'black', marginLeft: 10, marginBottom: 5}}>Address</Text>

              <View style={styles.editTextStyle}>
                <DisableEditText
                  onPress={() => this.setState({ mapVisible: true })}
                  value={this.state.address}
                  // title="Address"
                />
              </View>

              {/* END OF EDIT TEXT */}
            </View>
          {/* </KeyboardAvoidingView> */}
       
        </ScrollView>
      </View>
    );
  }

  // profileData = async res_ => {
  //   console.warn("ressssss", res_);
  //   res = res_;
  //   this.componentDidMount();
  // };
}
