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
export class collectScr extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {

    }



    render() {

        return (
            <View style={styles.container}>

                <ImageBackground source={require('../../Images/collect.png')} style={styles.image}>

                    <View style={styles.child_view}>

                        <View style={{ flex: 1 }}>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Image source={require('../../Images/back.png')} style={{ height: 23, width: 21, margin: 25 }}>

                                </Image>

                            </TouchableOpacity>


                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Dashboard')}
                            >
                                <Text style={{
                                    margin: 25, alignSelf: 'flex-end',
                                    alignItems: 'flex-end', color: 'white', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline'
                                }}>
                                    Skip
                                  </Text>

                            </TouchableOpacity>

                        </View>


                    </View>





                    <View style={{
                        backgroundColor: 'white',
                        position: 'absolute', bottom: 0,
                        width: screen_size_width * 1,
                        height: screen_size_height * .43,
                        borderTopLeftRadius: 20, borderTopRightRadius: 20,
                        alignContent: "center", alignItems: 'center', paddingLeft: 20,
                        paddingRight: 20
                    }}>

                        <Image
                            source={require('../../Images/collect1.png')} style={{ width: 75, height: 75, marginVertical: 15, resizeMode: "cover" }}>

                        </Image>

                        <Text style={{ fontSize: 24, marginBottom: 30 }}>2. We Collect</Text>

                        {/* <Text style={{ fontSize: 17, marginTop: 15, textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text> */}


                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('cleanScr')}
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Next
                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>



                </ImageBackground>



            </View>
        );
    }
}

export default collectScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        //justifyContent: 'center',
        //paddingTop: '8%',
        // marginTop: Platform.OS === 'ios' ? 35 : 0,
    },
    image: {
        resizeMode: 'stretch',
        width: screen_size_width * 1, height: '100%',

    },
    child_view: {
        flexDirection: 'row', flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0,
    },
    linearGradient: {
        marginLeft: 15,
        marginRight: 15,
        // marginBottom:15,
        marginTop: 38,

        borderRadius: 23,
        width: screen_size_width * .9,

    },
    buttonText: {
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 12,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },

});
