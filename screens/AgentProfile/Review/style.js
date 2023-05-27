import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#E8E6EE",
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: "white",
    marginBottom: 7
  },
  customerImage: {
    height: 75,
    width: 75,
    borderRadius: 3,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 2,
    marginRight: 10,
    marginBottom: 2,
  },
  nameDateContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },
  nameText: {color: Colors.black, fontWeight:"bold"},
  dateContainer: {flex: 1},
  dateText: {
    textAlign: 'right',
    color:"black",
  },
  categoryContainer: {flex: 1},
  categoryText: {
    color: Colors.dullBlack,
  },
  ratingContainer: {marginTop: 5, width: 100},
  reviewContainer: {marginTop: 5},
  reviewText: {color: "black"},
  border: {
    // borderBottomColor: "transparent", //'#64636A',
    // borderWidth: 1,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});

export default styles;
