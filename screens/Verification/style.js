import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
    // alignItems: "center",
    // justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column"
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 20
  }
});

export default styles;
