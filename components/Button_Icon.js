import React from 'react';
import {View, TouchableOpacity, ToastAndroid} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Button_Icon = props => {
  return (
    <TouchableOpacity
      onPress={
        props.onPress
          ? props.onPress
          : ToastAndroid.show('Button is pressed', ToastAndroid.SHORT)
      }>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderRadius: props.size ? props.size / 2 : 25,
          height: props.size ? props.size : 50,
          width: props.size ? props.size : 50,
          alignItems: 'center',
        }}
        colors={['#4279dc', '#d9207a']}>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            top: '25%',
          }}>
          <Ionicons
            name={props.name ? props.name : 'ios-camera'}
            size={props.size ? props.size / 2 : 25}
            color="#fff"
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button_Icon;
