import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loaderHorizontal: {
    flexDirection: "row",
    // justifyContent: "space-around",
    padding: 10
  },
  loaderText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
