import { StyleSheet ,Dimensions} from "react-native";
import Colors from "../../constants/Colors";
var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor: 'rgba(255,255,255,0.9)'
    
  },
  back_button: {
    margin: 15,
    marginTop: Platform.OS === 'ios' ? 45 : 0,
    
    
  },
  
  container: {
    flex: 1,
    flexDirection: "column"
  },
  email_inputfield: {
    flex: 1,
    width: screen_size_width * 0.9,
paddingLeft: 15,
paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#EDEEF0',
    borderRadius: 20,
    
  },
  editTextStyle: {
    flex: 1,
    width: "90%",
    padding: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8
  },
  editTextStyle1: {
    flex: 1,
    width: "90%",
    padding: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row"
  },
  bodyContainer: {
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // alignContent: 'flex-end',

    flex: 1,
    // paddingBottom: 20,
    marginTop: 15
  },
  image_background: {
    flex: 1,
    resizeMode: 'center',
    height: 350,
    // justifyContent: "center"
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 25,

     borderRadius: 23,
     width: screen_size_width * .9,
     
   },
   buttonText: {
     fontSize: 18,
     // fontFamily: 'Gill Sans',
     textAlign: 'center',
     margin: 12,
     color: '#ffffff',
     backgroundColor: 'transparent',
   },
   mid_view: {
    flex: 1.4, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35,
     backgroundColor: 'white'
  },
  input_placeholder: {
    color: '#000', 
    marginLeft: 30,
     color: 'black', 
     opacity: 0.4,
     marginTop: 5
  },

});

export default styles;
