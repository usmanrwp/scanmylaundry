import { StyleSheet , Dimensions} from "react-native";
import Colors from "../../../constants/Colors";


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  contentList: {
    flex: 1
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    flex:1
  },
  image: {
    width: 90,
    height: 90,
    marginLeft: 5,
    marginTop: 8
  },

  card: {
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    flexDirection: "column",
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "black",
    fontWeight: "bold"
  },
  count: {
    fontSize: 18,
    flex: 1,
    // alignSelf: "center",
    color: "black",
    fontWeight: "bold",
    marginBottom: 5
  },
  status: {
    fontSize: 18,
    flex: 1,
    fontFamily: "Raleway-ExtraBoldItalic",
    // alignSelf: "center"
  },
    date: {
      fontSize: 16,
      flex: 1,
      
      color: "#545454",
      fontWeight: "bold",
      width: screen_size_width * .6
  
  
    },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 5,
    marginBottom: 5,

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
  card1: {
    marginTop: 10,
    backgroundColor: Colors.buttonBackground,
    padding: 10,
    borderRadius: 30
  },
  biderButtonContainer: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  biderButtonText: {
    fontFamily: "Raleway-BoldItalic"
  },
  ratingCard: {
    // marginTop: 10,
    backgroundColor: Colors.gradient2,
    padding: 10,
    borderRadius: 30
  },
  ratingButtonContainer: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  ratingButtonText: {
    fontFamily: "Raleway-BoldItalic"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc"
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12
  }
});

export default styles;
