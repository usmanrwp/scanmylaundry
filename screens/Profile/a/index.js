import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Text from '../../components/CustomText';
import {NavigationEvents} from 'react-navigation';
import _retrieveData from '../../local_cache/_retrieveData';
import _fetch from '../../fetch_function/_fetch';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Button_Icon from '../../components/Button_Icon';
import styles from './style';
import Header_ from '../../components/Header';
import Image_Picker_Selection from '../../components/Image_Picker_Selection';
import Image_Picker from '../../functions/Image_Picker';
import _imageUpload from '../../fetch_function/_imageUpload';
import Loader from '../../components/Loader';
import Update from './Update/index';
import Review from './Review/index';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Profile'},
        {key: 'second', title: 'Review'},
      ],
      loading: true,
      Image_Picker_SelectionModel: false,
      email: null,
      picture: '',
      name: '',
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    this.load_data();
    const updateObj = new Update();
    updateObj.navigate_data(this);
  }

  changeName = async (name, ot) => {
    ot.setState({
      name,
    });
  };
  changePicture = async (picture, ot) => {
    await ot.setState({
      picture,
    });
  };

  load_data = async () => {
    this.setState({
      loading: false,
    });
    const email = await _retrieveData();
    let param = {};
    param['email'] = email;
    const res = await _fetch('read_user_profile', param);
    await this.setState({
      name: res[0].Name,
      email,
      picture: res[0].Picture,
    });
  };

  hideModal = () => {
    this.setState({
      Image_Picker_SelectionModel: false,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onWillFocus={() => this.load_data()} />
        <Header_ title="Profile" left back onBackPress={this.backPressed} />
        <Image_Picker_Selection
          isVisible={this.state.Image_Picker_SelectionModel}
          hideModal={() => this.hideModal()}
          cancel={() => this.hideModal()}
          gallery={() => this.openGallery()}
          camera={() => this.openCamera()}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.profilePictureMainContainer}
            onPress={() => this.update_picture()}>
            <View style={styles.profilePictureContainer}>
              <Image
                source={{
                  uri: this.state.picture,
                }}
                style={styles.profilePicture}
              />
            </View>
            <View style={styles.profilePictureIconContainer}>
              <Button_Icon
                size={50}
                onPress={() =>
                  this.setState({Image_Picker_SelectionModel: true})
                }
              />
            </View>
          </TouchableOpacity>

          <View style={styles.nameBusinessContainer}>
            <Text style={styles.nameBusiness}>{this.state.name}</Text>
          </View>
        </View>
        <TabView
          navigationState={this.state}
          lazy={true}
          style={{marginTop: 0}}
          renderScene={SceneMap({
            first: Update,
            second: Review,
          })}
          renderTabBar={props => (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#d9207a', '#4279dc']}>
              <TabBar
                {...props}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBarContainer}
                renderLabel={({route, focused, color}) => (
                  <Text style={styles.tabViewText}>{route.title}</Text>
                )}
              />
            </LinearGradient>
          )}
          onIndexChange={index => this.setState({index})}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    );
  }

  openCamera = async () => {
    const res = await Image_Picker('camera');
    this.setState({Image_Picker_SelectionModel: false});
    if (res === false || res === 'cancel') {
      return;
    }
    this.uploadImage(this.state.email, res.filename, res.mime, res.data);
    this.setState({
      picture: res.path,
    });
  };

  openGallery = async () => {
    const res = await Image_Picker('gallery');
    this.setState({Image_Picker_SelectionModel: false});
    if (res === false || res === 'cancel') {
      return;
    }
    this.setState({
      loading: true,
    });
    console.warn('gallery\n', res);
    this.uploadImage(
      this.state.email,
      res.filename,
      res.mime,
      res.data,
      res.path,
    );
  };

  uploadImage = async (email, fileName, imageType, base_64, path) => {
    const res = await _imageUpload(
      'upload_dp',
      email,
      fileName,
      imageType,
      base_64,
    );
    console.warn('Image Upload res==>', res);
    if (res.includes('The file has been uploaded.')) {
      this.setState({
        loading: false,
        picture: path,
      });
    } else {
      alert('Not Upload.');
      this.setState({
        loading: false,
      });
    }
  };
}
