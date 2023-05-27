import {
  StyleSheet,
  StatusBar,
  Platform,
  StatusBarIOS,
  NativeModules
} from "react-native";
import Colors from "../../constants/Colors";

const { StatusBarManager } = NativeModules;
let moreModalHeight = 0;

if (Platform.OS === "ios") {
  StatusBarManager.getHeight(response => (moreModalHeight = response.height));
} else {
  moreModalHeight = StatusBar.currentHeight;
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1
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
    paddingBottom: 20,
    paddingTop: 10
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
  },
  moreModalApp: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  moreModalContainer: {
    width: 150,
    height: 100,
    marginTop: moreModalHeight + 13,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  moreModalDivider: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: 120,
    marginVertical: 10,
    marginLeft: -10
  },
  moreModalText: { color: "#000", textAlign: "center" }
});

export default styles;
