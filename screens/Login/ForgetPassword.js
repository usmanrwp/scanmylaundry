import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, BackHandler, ImageBackground, TextInput, Text } from "react-native";
import styles from "./style";
import Header_ from "../../components/Header";
import Edit_Text from "../../components/Edit_Text";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import _fetch from "../../fetch_function/_fetch";
import _deleteData from "../../local_cache/new/_deleteData";
import _storeData from "../../local_cache/_storeData";
import _retrieveData from "../../local_cache/_retrieveData";
import Loader from "../../components/Loader";
import { firebase as fcm } from "@react-native-firebase/messaging";
import LinearGradient from 'react-native-linear-gradient';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        // this.backPressed = this.backPressed.bind(this);

        // this.retrieveEmail();
        this.state = {
            cp: true,
            cpIcon: "ios-eye-off",
            email: "",
            password: "",
            error_email: "",
            loading: true,
            backTo: ""
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
    }

    backPressed = async () => {
        // this.props.navigation.navigate("Profile");
        // return true;
        this.props.navigation.goBack()
    };
    componentDidMount = () => {

        BackHandler.addEventListener("hardwareBackPress", this.backPressed);

    };
    headerBackPress = () => {
        this.props.navigation.goBack();
      };


    emailText = text => { this.setState({ email: text }); };
    render() {
        return (
            <View style={styles.appContainer}>
                <Header_
                    title="Change Password"
                    left
                    back
                    round_corner={35}
                    backgroundColor="#446BD6"
                    onBackPress={this.headerBackPress}
                />
                <Text style={[styles.input_placeholder], { marginTop: 60, marginHorizontal: 15 }}>Email Address</Text>
                <View style={{ height: 50, paddingLeft: 15, paddingRight: 15, marginLeft: 15, marginRight: 15, marginTop: 8, backgroundColor: '#EDEEF0', borderRadius: 20 }}>
                    <Edit_Text
                        value={this.state.email}
                        keyboardType="email-address"
                        onChangeText={email => this.emailText(email)}
                        error={this.state.error_email} />
                </View>
                <TouchableOpacity onPress={this.loginPress}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#446BD6', '#446BD6', '#5652D5']} style={{ marginHorizontal: 15, marginTop: 15, borderRadius: 23, }}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }

    loginPress = async () => {
        if (this.state.email === "") {
            this.setState({
                error_email: "Please enter email"
            });
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            this.setState({ error_email: "Invalid Email Address" });
            return;
        }
        if (!(this.state.error_email === "")) {
            this.setState({
                error_email: "Please enter valid email"
            });
            return;
        }
        let param = {};
        param["email"] = this.state.email;
        const res = await _fetch("forget_password", param);
        if (res.includes("Successfully")) {
            alert(res);
            this.props.navigation.navigate('Login')
        }
        else {
            alert(res);
        }
    };
}
export default ForgetPassword;
