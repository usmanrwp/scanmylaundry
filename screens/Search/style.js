// import { StyleSheet } from "react-native";
// import Colors from "../../constants/Colors";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8E6EE" ,
    marginTop: Platform.OS === 'ios' ? 35 : 0,

  },
  headerContainer: {
    flex: 1
  },
  header: {
    fontFamily: "Raleway-Regular",
    // color: Colors.white,
    fontSize: 16,
    backgroundColor: "transparent",
    height:80,
    borderBottomLeftRadius: 35,
  },
  editTextStyle: {
    // width: "85%",
    color: Colors.white,
    // marginRight: 10,
    marginVertical: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingLeft:14,
    height: 44
    // paddingTop: 10
    

  },
  editTextContainer: {
    // flexDirection: "row",
    // flex: 1,
    width: screen_size_width * .7,
    marginLeft: 15,
    marginRight: 15,
    // height:100
    // marginHorizontal: 10,
    // marginVertical: 5
  },
  editTextImage: { height: 23, width: 27, marginTop: 12, },
  itemList: {
    paddingHorizontal: 17,
    // backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: "100%",
    borderRadius: 20
  },
  bodyContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10
  }
});

export default styles;
