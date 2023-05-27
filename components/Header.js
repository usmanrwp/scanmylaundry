import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Title } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "./CustomText";
import Colors from "../constants/Colors";
import Cache_Image from "./Cache_Image";
import { Image_Show_Url } from "../urls/Image_Show_Url";
import LinearGradient from 'react-native-linear-gradient';

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;


export default class Header_ extends Component {
  render() {
    const font = this.props.fontFamily
      ? this.props.fontFamily
      : "Raleway-Regular";
    const color = this.props.color ? this.props.color : "#fff";
    const fontSize = this.props.fontSize ? this.props.fontSize : 16;
    const borderBottomLeftRadius = this.props.borderBottomLeftRadius
      ? this.props.borderBottomLeftRadius
      : 35;
    const backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : Colors.header;

    this.props.round_corner ? this.props.round_corner : 0
    const style = [
      { fontFamily: font, color: color, fontSize: fontSize, },
      { backgroundColor: backgroundColor },
      // { borderBottomLeftRadius: borderBottomLeftRadius },
      this.props.style || {}
    ];
    const allProps = Object.assign({}, this.props, { style: style });
    return (
      <Header
        {...allProps}
        androidStatusBarColor={Colors.statusBar}
        iosBarStyle="dark-content"
        style={
          {height: 80,
            borderBottomLeftRadius: this.props.round_corner}}>

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']}
          style={{ height: 80, width: screen_size_width * 1, flexDirection: "row", borderBottomLeftRadius: this.props.round_corner }}>

          {this.props.left === true ? (
            <Left
              style={ styles.left_back}
            >
              {this.props.left === true ? (
                this.props.back === true ? (
                  <Button onPress={this.props.onBackPress} transparent>
                    <Icon name="md-arrow-back" size={28} color="#fff" />
                  </Button>
                ) : (
                    <Button onPress={this.props.onMenuPress} transparent>
                      <Icon name="ios-menu" size={28} color="#fff" />
                    </Button>
                  )
              ) : null}
            </Left>
          ) : null}
          {this.props.left === true ? (
            <Body
              style={{
                flexDirection: "row",
              }}
            >
              <Title
                style={{
                  fontSize: 20,
                  fontFamily: "Raleway-BoldItalic",
                  color: Colors.white,
                  width:210,
                  textAlign:"left"
                }}
              >
                {this.props.title ? this.props.title : "title"}
              </Title>
            </Body>
          ) : (
              <Body
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignSelf: "flex-start",
                  top: 5,
                  alignContent: "flex-start",
                  flex: 1,
                   marginLeft: 15, marginTop: 10
                }}
              >
                <Image
                   source={require('../Images/logo_h.png')}
                  style={{
                    height: 35,
                    width: 22,
                     marginTop: 5
                  }}
                />
                <Title
                  style={{
                    marginTop: 5,
                    marginLeft: 7,
                    fontSize: 17,
                    fontFamily: "Raleway-Bold",
                    color: Colors.white,
                    top: this.props.left === true ? null : 10
                  }}
                >
                  {this.props.title ? this.props.title : "title"}
                </Title>
              </Body>
            )}

          <Right>
            {this.props.save === true ? (
              <Button onPress={this.props.savePress} transparent>
                <Icon name={this.props.saveIcon ? this.props.saveIcon : "ios-done-all"} size={50} color="#fff" />
                {/* <Text>Logout</Text> */}
              </Button>
            ) : this.props.right === true ? (
              this.props.rightIcon1 === true ? (
                this.props.rightIcon2 === true ? (
                  this.props.rightIcon3 === true ? (
                    <View style={{ flexDirection: "row" }}>

                      <Button onPress={this.props.rightIconPress} transparent>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 35, padding:6}} >
                          <Image style={styles.message_btn}
                            source={require('../Images/qrcode.png')}/>
                        </View>
                      </Button>

                      <Button onPress={this.props.rightIcon1Press} transparent>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 35, padding: 6,  marginLeft: -18}} >
                          <Image style={styles.message_btn}
                            source={require('../Images/searchh.png')}/>
                        </View>
                      </Button>
                      <Button onPress={this.props.rightIcon2Press} transparent>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 35, padding: 6,  marginLeft: -18}} >
                          <Image style={styles.message_btn}
                            source={require('../Images/person.png')}/>
                        </View>
                      </Button>

                      <Button onPress={this.props.rightIcon3Press} transparent>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 35, padding: 6, marginLeft: -18, marginRight: -6}} >
                          <Image style={styles.message_btn}
                            source={require('../Images/clock.png')}/>
                        </View>
                      </Button>

                    </View>
                  ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Button onPress={this.props.rightIcon1Press} transparent>
                          <Icon
                            name={
                              this.props.rightIcon1Name
                                ? this.props.rightIcon1Name
                                : "ios-search"
                            }
                            size={28}
                            color="#fff"
                          />
                        </Button>
                        <Button onPress={this.props.rightIcon2Press} transparent>
                          <Icon name="ios-contact" size={28} color="#fff" />
                        </Button>
                      </View>
                    )
                ) : this.props.rightIcon3 === true ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button onPress={this.props.rightIcon1Press} transparent>
                      <Icon
                        name={
                          this.props.rightIcon1Name
                            ? this.props.rightIcon1Name
                            : "ios-search"
                        }
                        size={28}
                        color="#fff"
                      />
                    </Button>
                    <Button onPress={this.props.rightIcon2Press} transparent>
                      {/* <Icon name="ios-basket" size={28} color="#fff" /> */}
                    </Button>
                  </View>
                ) : (
                      <Button onPress={this.props.rightIcon1Press} transparent>
                        <Icon
                          name={
                            this.props.rightIcon1Name
                              ? this.props.rightIcon1Name
                              : "ios-search"
                          }
                          size={28}
                          color="#fff"
                        />
                      </Button>
                    )
              ) : null
            ) : (
                  <Button transparent>
                    <Text>{this.props.rightTitle ? this.props.rightTitle : ""}</Text>
                  </Button>
                )}
          </Right>

        </LinearGradient>
      </Header>

      // 

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  message_btn: {
    height: 21,
    width: 21,
  },
  left_back: {

    alignItems: Platform.OS === 'ios' ? "flex-start" : "center",
    marginLeft: Platform.OS === 'ios' ? 23 : 1,
    marginRight: Platform.OS === 'ios' ? -150 : 1,
     justifyContent: "flex-start"
  },

});
