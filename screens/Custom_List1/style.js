import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

// var screen_size_height = Dimensions.get('window').height;
// var screen_size_width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: Colors.backgroundColor
  },
  separator: {
    marginTop: -4
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: Colors.white,
    // borderRadius: 20,
    marginLeft: 15,
    marginRight: 15
    // flexDirection: "row"
  },
  cardHeader: {
    paddingVertical: 8,
    height: 127,
    // paddingHorizontal: 10,
    paddingLeft: 1,
    paddingRight: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    // marginRight: 15,
    backgroundColor: "white"
    // justifyContent: "space-between",
    // flex: 2
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16
  },
  pickerStyle: {
    // backgroundColor: "#afafaf",
    backgroundColor: 'rgba(68,107,214,0.5)',
    borderRadius: 35,
    paddingLeft: 15,
    paddingRight: 15, 
    marginRight: "5%",
    marginLeft: '5%',
    paddingTop: 0,
    height: 50, paddingTop: -30
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: Colors.cardFooterBackgroundColor
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1
  },
  description: {
    fontSize: 15,
    color: Colors.description,
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width: 25,
    height: 25
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5
  },
  timeContainer: {
    flexDirection: "row"
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  linearGradient: {
    marginLeft: 15,
    marginRight: 15,
    // marginBottom:15,
    marginTop: 25,

    borderRadius: 23,
    // width: screen_size_width * .9,

  },
});

export default styles;
