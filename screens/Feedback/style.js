import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E8E6EE",

  },
  ratingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  ratingTitle: {
    color: "black",
    fontSize: 20,
    fontFamily: "Raleway-BoldItalic",
    textAlign: "center",
    paddingVertical: 10
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
  rating: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  commentContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor:"white",

  },
  commentText: {
    fontSize: 16,
    color: Colors.textColorWhite,
    // borderWidth: 1,
    // borderColor: Colors.backgroundHighlight,
    paddingTop: 10
  },
  buttonContainer: {
    flex: 1,
    // position: "absolute",
    width: "90%",
    // marginLeft: 10,
    // alignItems: "flex-end",
    // justifyContent: "flex-end",
    // flexDirection: "column"
  }
});

export default styles;
