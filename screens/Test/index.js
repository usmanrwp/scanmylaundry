import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import _fetch from "../../fetch_function/_fetch";

class index extends Component {
  aa = async () => {
    return new Promise(async function(resolve, reject) {
      let my_url =
        "http://battuta.medunes.net/api/country/all/?key=e673615e171b388075ef619002c3417c";

      await fetch(my_url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // Showing response message coming from server after inserting records.
          resolve(responseJson);
          return responseJson;
        })
        .catch(error => {
          reject(error);
          return error;
        });
    });
  };
  pressClick = async () => {
    const res = await this.aa();
    const param = {};
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      let a = "name" + i;
      let b = "code" + i;
      param[a] = element.name;
      param[b] = element.code;
    }
    const resaaa = await _fetch("add", param);
    console.warn(resaaa);
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.pressClick}
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      >
        <Text style={{ fontSize: 30 }}> index </Text>
      </TouchableOpacity>
    );
  }
}

export default index;
