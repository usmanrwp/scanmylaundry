import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../constants/Colors';


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    height: screen_size_height* 1,
    backgroundColor: "#E8E6EE"

  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  editTextStyle: {
    backgroundColor:"white",
    // flex: 1,
    width: '90%',
    // borderColor: Colors.backgroundColor,
    paddingBottom: 14,
    paddingTop: -16,
    // marginLeft: 15,
    // marginRight: 15,
    // marginTop: 8,
    marginBottom: 5,
    alignItems:"center",
    alignContent:"center",
    borderRadius:10
    
  },
  editTextStyle1: {
    flex: 1,
    width: '90%',
    padding: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  bodyContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: 15,
  },
  mapModalContainer: {
    // flex: 1,
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 5,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  mapModal: {
    height: '100%',
    width: '100%',
  },
  show_on_map1: {
    // backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    marginTop: 80,
    marginRight: 10,
    height: 50,
    width: 50,
    marginLeft: '95%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
  },
  show_on_map_logo_live: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
  },
});

export default styles;
