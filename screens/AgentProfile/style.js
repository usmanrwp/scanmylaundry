import {StyleSheet, StatusBar, Platform, NativeModules, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const {StatusBarManager} = NativeModules;
let moreModalHeight = 0;

if (Platform.OS === 'ios') {
  StatusBarManager.getHeight(response => (moreModalHeight = response.height));
} else {
  moreModalHeight = StatusBar.currentHeight;
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor, //'#2f2e34',
    backgroundColor: "#E8E6EE",
    flexDirection: 'column',
  },
  headerContainer: {flexDirection:"column", marginBottom: 30},
  profilePictureMainContainer: {
    flexDirection: 'column',
  },
  profilePictureContainer: {
    // height: 110,
    // width: 110,
    // borderRadius: 55,
    marginBottom: 8,
    marginTop: 10,
    alignItems:"center",
    alignContent:"center"

  },
  profilePicture: {
    height: 125,
    width: 125,
    borderRadius: 70,
    // borderColor: '#20202a',
    // borderWidth: 4,
  },
  profilePicture1: {
    width: screen_size_width * 1,
    height: screen_size_height * .3,
    // opacity:0.7,
    // position:'absolute',
    // marginTop: -30
    // resizeMode:"stretch"


  },
  color_f: {
    width: screen_size_width * 1,
    height: screen_size_height * .3,
    backgroundColor: 'rgba(68,107,214,0.5)',
    position:'absolute',
    // marginTop: 105
    // resizeMode:"stretch"


  },
  profilePictureIconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  nameBusinessContainer: {
    // position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginLeft: 30,
    flexDirection: 'column',
  },
  nameBusiness: {
    color: "black",
    fontSize: 18,
    // textAlign: "center",
    fontFamily: 'Raleway-BoldItalic',
  },
  tabViewText: {
    color: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    fontSize: 15,
    fontFamily: 'Raleway-BoldItalic',
  },
  tabBarContainer: {
    backgroundColor: "transparent", //'#20202a'
    borderBottomLeftRadius: 35
  },
  indicatorStyle: {
    backgroundColor: "transparent",
  },
});

export default styles;
