import React, { Component } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Text from "./CustomText";
import Colors from "../constants/Colors";
import Hour24 from "../functions/Hour24";

export default class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: 1,
          time: "12:00 AM",
          selectedItem: null
        }
      ]
    };
  }

  componentDidMount = async () => {
    const Hour24_res = await Hour24();
    this.setState({
      dataSource: Hour24_res
    });
    console.warn("dataSource TIME\n", Hour24_res);
  };

  onPressHandler(item) {
    this.setState({selectedItem: item.id});
    this.props.timePress(item)
    // alert(JSON.stringify(id));
}

  render() {
    const { type, headerData } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.dataSource}
          numColumns={3}
          metaData={this.state.metaData}
          keyExtractor={item => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            let Available = true;
            let dateforMatch = null;
            let ti = null;
            let de = null;

            if (type === "delivery") {
              de = "delivery_date";
              ti = "delivery_time";
            } else {
              de = "receiving_date";
              ti = "receiving_time";
            }
            for (let i = 0; i < headerData.length; i++) {
              const element = headerData[i];
              if (element.Select === true) {
                dateforMatch = element.Complete;
              }
            }

            // if (!(this.state.service_res === "List empty")) {
            //   for (let i = 0; i < this.state.service_res.length; i++) {
            //     if (
            //       this.state.service_res[i][de] === dateforMatch &&
            //       this.state.service_res[i][ti] === item.Time
            //     ) {
            //       Available = false;
            //     }
            //   }
            // } this.props.timePress(item)
            return (
              <TouchableOpacity
                onPress={()=> this.onPressHandler(item)}
                style={

                  this.state.selectedItem === item.id ? {
                    shadowColor: "#00000021",
                    shadowOffset: {
                      width: 2
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    marginVertical: 8,
                    borderRadius: 5,
                    flex: 1,
                    marginHorizontal:5,
                    backgroundColor: "#446BD6"
                } : {
                  shadowColor: "#00000021",
                  shadowOffset: {
                    width: 2
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  marginVertical: 8,
                  borderRadius: 5,
                  flex: 1,
                  marginHorizontal:5,
                   backgroundColor: "#fff"
                }



                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf:"center",
                    // width:45,
                    // height:40
                  }}
                >
                  <Text style={

                 
                    
                    this.state.selectedItem === item.id ? {
                      color: "#fff" , textAlign: "center", alignSelf:"center", paddingTop:15, paddingBottom:15 
                  } : {
                    color: "#000" , textAlign: "center", alignSelf:"center", paddingTop:15, paddingBottom:15 
                  }
                    
                    }>{item.time}</Text>
                </View>
                {/* <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    marginTop: -20
                  }}
                >
                  <Text
                    style={{
                      color:
                        Available === true
                          ? Colors.white
                          : Colors.textColorDull,
                      backgroundColor:
                        Available === true
                          ? Colors.header
                          : Colors.backgroundColor,
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      borderRadius: 5
                    }}
                  >
                    {Available === true ? "Select" : "Unavailable"}
                  </Text>
                </View> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E8E6EE",
    flex: 1,
    width: "100%"
  },
  separator: {
    // marginTop: 10,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal:5,
    

  }
});
