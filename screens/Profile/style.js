import { StyleSheet, StatusBar, Platform, NativeModules, Dimensions } from "react-native";
import Colors from "../../constants/Colors";


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const { StatusBarManager } = NativeModules;
let moreModalHeight = 0;

if (Platform.OS === "ios") {
  StatusBarManager.getHeight(response => (moreModalHeight = response.height));
} else {
  moreModalHeight = StatusBar.currentHeight;
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor, //'#2f2e34',
    flexDirection: "column"
  },
  headerContainer: {
     flexDirection: "row",
    marginTop: Platform.OS === 'ios' ? 35 : 0,

},
  profilePictureMainContainer: {
    flexDirection: "column",
    // position: 'absolute',
    alignSelf: "center",
    marginTop:10,
    marginLeft: -25,
    width: screen_size_width * 1,
  },
  profilePictureContainer: {
    // height: 110,
    // width: 110,
    borderRadius: 55,
    marginBottom: 5,
    marginTop: 10,
    // alignItems:"center"
  },
  profilePicture1: {
    width: screen_size_width * 1,
    height: screen_size_height * .36,
    opacity:0.4,
    // resizeMode:"stretch"


  },
  header_style: {

    marginTop: Platform.OS === 'ios' ? -28 : 2,
     alignContent:"center",
      justifyContent:"center",


  },
  color_f: {
    width: screen_size_width * 1,
    height: screen_size_height * .41,
    backgroundColor: 'rgba(68,107,214,0.8)',
    position:'absolute'
    // resizeMode:"stretch"


  },
  profilePicture: {
    height: 130,
    width: 130,
    borderRadius: 70,
    borderColor: "#fff",
    borderWidth: 3,
    alignSelf:"center"
  },
  profilePictureIconContainer: {
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    alignSelf: "center",
    // position: "absolute",
    bottom:50,
    marginLeft:90
  },
  nameBusinessContainer: {
    // position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 30,
    flexDirection: "column"
  },
  nameBusiness: {
    color: Colors.textPink_Name,
    fontSize: 20,
    // textAlign: "center",
    // fontFamily: "Raleway-BoldItalic"
  },
  tabViewText: {
    color: "#fff",
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    fontSize: 15,
    // fontFamily: "Raleway-BoldItalic"
  },
  tabBarContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)' //'#20202a'
  },
  indicatorStyle: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  }
});

export default styles;
