import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  editTextStyle: {
    flex: 1,
    width: '90%',
    // padding: 12,
    // marginLeft: 15,
    // marginRight: 15,
    // marginTop: 8,
    // marginBottom: 8,
  },
  editTextStyle1: {
    flex: 1,
    width: '90%',
    padding: 12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
  },
  mapModalContainer: {
    // flex: 1,
    // borderRadius: 20,
    // borderColor: "red",
    // borderWidth: 5,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  mapModal: {
    height: '100%',
    width: '100%',
  },
  show_on_map1: {
    // backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    marginTop: 80,
    marginRight: 10,
    height: 50,
    width: 50,
    marginLeft: '95%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
  },
  show_on_map_logo_live: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flex: 1
  },
});

export default styles;
