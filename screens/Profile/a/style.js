import {StyleSheet, StatusBar, Platform, NativeModules} from 'react-native';
import Colors from '../../constants/Colors';

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
    backgroundColor: Colors.backgroundColor, //'#2f2e34',
    flexDirection: 'column',
  },
  headerContainer: {flexDirection: 'row', margin: 10},
  profilePictureMainContainer: {
    flexDirection: 'column',
  },
  profilePictureContainer: {
    height: 110,
    width: 110,
    borderRadius: 55,
    marginBottom: 5,
    marginTop: 10,
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 70,
    borderColor: '#20202a',
    borderWidth: 4,
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
    marginLeft: 30,
    flexDirection: 'column',
  },
  nameBusiness: {
    color: Colors.textPink_Name,
    fontSize: 20,
    // textAlign: "center",
    // fontFamily: 'Raleway-BoldItalic',
  },
  tabViewText: {
    color: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    fontSize: 15,
    // fontFamily: 'Raleway-BoldItalic',
  },
  tabBarContainer: {
    backgroundColor: Colors.header, //'#20202a'
  },
  indicatorStyle: {
    backgroundColor: Colors.white,
  },
});

export default styles;
