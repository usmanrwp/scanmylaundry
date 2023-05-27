import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8E6EE"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  editTextStyle: {
    flex: 1,
    width: "90%",
    // padding: 12,
    // marginLeft: 15,
    // marginRight: 15,
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
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    paddingBottom: 20,
    // paddingTop: 10,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius:30,
    // backgroundColor:'blue'
  },
  editTextContainer: {
    // flexDirection: "row",
    // flex: 1, 
    // width: "95%",
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 25,

     borderRadius: 23,
    //  width: screen_size_width * .9,
     
   },
   linearGradient1: {
     flex:1,
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 25,

     borderRadius: 23,
    //  width: screen_size_width * .9,
     
   },
   buttonText: {
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonText1: {
    fontSize: 14,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  editTextStyle: {
    // width: "85%",
    // color: Colors.black,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    paddingLeft: 10,
    height:50
    
  },
  editTextStyle_add: {
    // width: "85%",
    // color: Colors.black,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    paddingLeft: 10,
    height:70
    
  },
  mapModalContainer: {
    // flex: 1,
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 5,
    height: "100%",
    width: "100%",
    flexDirection: "column"
  },
  mapModal: {
    height: "100%",
    width: "100%"
  },
  show_on_map1: {
    // backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    marginTop: 80,
    marginRight: 10,
    height: 50,
    width: 50,
    marginLeft: "95%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
    // flex: 1
  },
  show_on_map_logo_live: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
    // flex: 1
  }
});

export default styles;
