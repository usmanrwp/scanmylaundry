import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor:"transparent"
    backgroundColor:"#E8E6EE"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: Platform.OS === 'ios' ? 22 : 0,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: "#dcdcdc",
    // borderBottomWidth: 1,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    // backgroundColor: '#20202a',
    borderBottomColor: Colors.textColorDull,

    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    width: '85%',
  },
  nameTxt: {
    marginLeft: 35,
    color: '#000',
    fontSize: 13,
  },
  mapContainer: {
    flex: 1,
    // borderRadius: 20,
    borderColor: Colors.line_break,
    borderWidth: 1,
    height: 151,
    width: "100%"
  },
  mapContainerMain: {
    // flex: 1,
    // borderRadius: 20,
    borderColor: Colors.line_break,
    borderWidth: 1,
    height: 151,
    width: "100%"
  },
  map: {
    height: 150,
    width: "100%"
  },
  mapModalContainer: {
    // flex: 1,
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 5,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#E8E6EE" 
  },
  mapModal: {
    height: "100%",
    width: "100%"
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: -10,

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
  show_on_map1: {
    // backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    // marginTop: 20,
    marginRight: 10,
    height: 50,
    width: 50,
    bottom:25,
    marginLeft: "95%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
    // flex: 1
  },
  show_on_map_logo_live: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
    // flex: 1
  },
  editTextStyle: {
    // width: "85%",
    color: Colors.black,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.textColorDull,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    height:45,
    paddingLeft: 10
    
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
  editTextImage: { height: 30, width: 30, marginTop: 10 },
  line_break: {
    borderBottomColor: Colors.line_break,
    borderBottomWidth: 1,
    marginVertical: 15
  },
  separator: {
    marginTop: 10
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: "100%"
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 20,
    flex: 1
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2
  },
  itemList: {
    paddingHorizontal: 17,
    // backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: "100%",
    borderRadius: 20
  },
  modelViewComment: {
    width: '90%', alignSelf: 'center',
    borderRadius: 15, backgroundColor: "#E8E6EE", top: "35%",
    borderWidth: 3, borderColor: "#446BD6", 
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
