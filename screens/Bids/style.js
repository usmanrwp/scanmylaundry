import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  eventList: {
    // flex: 1
  },
  boxMain: {
    padding: 20,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: Colors.backgroundColor
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10
  },
  box: {
    flexDirection: "row"
  },
  title: {
    fontSize: 18,
    color: "#4279dc",
    textAlign: "center",
    paddingBottom: 5,
    fontFamily: "Raleway-BoldItalic"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: "#dedede",
    borderWidth: 1
  },
  description: {
    fontSize: 15,
    color: Colors.textColor,
    fontFamily: "Raleway"
  },
  descriptionView: {
    marginRight: 20
  },
  descriptionView1: {
    marginRight: 0
  },
  descriptionText1: {
    fontSize: 15,
    color: Colors.textColor,
    paddingRight: 10,
    marginRight: 0,
    fontFamily: "Raleway"
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textColor,
    paddingRight: 20,
    marginRight: 20,
    fontFamily: "Raleway"
  },
  nameContainer: {
    alignContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  ratingContainer: {
    flexDirection: "column",

    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  buttonText: {
    color: Colors.buttonText
  }
});

export default styles;
