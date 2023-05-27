import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor:"#f4f4f4"
  },
  container: {
    flex: 2,
    flexDirection: "column",
    marginTop:15,
    
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
});

export default styles;
