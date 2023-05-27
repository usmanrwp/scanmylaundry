import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  customerImage: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
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
  nameText: {color: Colors.black},
  dateContainer: {flex: 1},
  dateText: {
    textAlign: 'right',
    color: Colors.dullBlack,
  },
  categoryContainer: {flex: 1},
  categoryText: {
    color: Colors.dullBlack,
  },
  ratingContainer: {marginTop: 5, width: 100},
  reviewContainer: {marginTop: 5},
  reviewText: {color: Colors.dullBlack},
  border: {
    borderBottomColor: Colors.border, //'#64636A',
    borderWidth: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});

export default styles;
