import React, { Component } from 'react';
import { View, Text, Button, ToastAndroid, ImageBackground } from 'react-native';


import {
    StyleSheet,
    Alert,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
    FlatList,
    Dimensions

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


var screen_size_height = Dimensions.get('window').height;
var screen_size_width = Dimensions.get('window').width;
export class orderScr extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {

    }
    // Dashboard
    render() {

        return (
            <View style={styles.container}>
                <View style={{ flex: .6 }}>
                    <Image source={require('../../Images/top_1.png')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode={'contain'}>

                    </Image>
                </View>
                <View style={{ flex: 1 }}>
                    <Image source={require('../../Images/main_11.png')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode={'contain'}>

                    </Image>

                </View>
                <View style={{ flex: 1 }}>
                    <Image source={require('../../Images/main_22.png')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode={'contain'}>

                    </Image>

                </View>
                <View style={{ flex: 1 }}>
                    <Image source={require('../../Images/main_33.png')}
                        style={{ width: "100%", height: "97%" }}
                        resizeMode={'contain'}>

                    </Image>

                </View>
                <View style={{ flex: .5 }}>

                    <Image source={require('../../Images/bottom_3.png')}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode={'contain'}>

                    </Image>

                </View>
                <View style={{ flex: .4 }}>

                    <View style={{ backgroundColor: "transparent", width: "100%", justifyContent: "center" }}>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#112D82', '#112D82', '#112D82']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    GET STARTED
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>

                </View>
                {/* <ImageBackground source={require('../../Images/welcome3.png')} style={styles.image}
                resizeMode={'stretch'}>

            </ImageBackground>

            <View style={{ backgroundColor: "transparent", width: "100%", flex:.3, justifyContent: "center" }}>

                <TouchableOpacity
                 onPress={() => this.props.navigation.navigate('Dashboard')}
                 >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#112D82', '#112D82', '#112D82']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            GET STARTED
                            </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View> */}
            </View>
        );
    }
}

export default orderScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: screen_size_width * 1, height: '100%',
        flex: 2

    },
    linearGradient: {
        borderRadius: 23,
        width: screen_size_width * .85,
        alignSelf: "center"

    },
    buttonText: {
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 8,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontWeight: "bold"
    },

});
