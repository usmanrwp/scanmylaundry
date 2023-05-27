import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor:"#E8E6EE"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 22 : 0,

  },
  mapContainer: {
    flex: 1,
    // borderRadius: 20,
    borderColor: Colors.line_break,
    borderWidth: 1,
    height: 151,
    width: '100%',
  },
  mapContainerMain: {
    // flex: 1,
    // borderRadius: 20,
    borderColor: Colors.line_break,
    borderWidth: 1,
    height: 151,
    width: '100%',
  },
  map: {
    height: 150,
    width: '100%',
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
    marginTop: 20,
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
  editTextStyle: {
       // width: "85%",
       color: Colors.black,
       // borderBottomWidth: 1,
      //  borderBottomColor: Colors.textColorDull,
       marginHorizontal: 10,
       marginVertical: 5,
       backgroundColor: '#FFFFFF',
       borderRadius:10,
       height:45,
    paddingLeft: 10

  },
  editTextContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  editTextImage: {
    height: 30,
    width: 30,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  line_break: {
    borderBottomColor: Colors.line_break,
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  separator: {
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: '100%',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 20,
    flex: 1,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  itemList: {
    paddingHorizontal: 17,
    // backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: '100%',
    borderRadius: 20,
  },
  mapClickContainer: {
    backgroundColor: Colors.backgroundColor,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 8,
  },
  mapClickText: {
    color: Colors.white,
    textAlign: 'center',
  },
  text: {
    color: "black",
    // paddingVertical: -5,
  },
  borderStyle: {
    // borderBottomColor: '#B3AFAF',
    // borderBottomWidth: 0,
  },
  titleStyle: {
    // paddingTop: -10,
    // paddingBottom: -5,
  },
});

export default styles;
