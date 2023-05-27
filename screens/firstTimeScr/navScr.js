import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, AsyncStorage} from 'react-native';


export class cleanScr extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount= async() => {
        try {
            const value = await AsyncStorage.getItem('check_firstTime');
            if (value !== null) {
             if(value === '2222')
             {
                this.props.navigation.navigate('Dashboard')
                // this.props.navigation.navigate('Payment')
                // this.props.navigation.navigate('PaymentBag')
             }
             else
             {
                this.props.navigation.navigate('welcome_')
             }
            }
            else
            {
                this.props.navigation.navigate('welcome_')
            }
          } catch (error) {
            // alert(error);
            // Error retrieving data
            // this.props.navigation.navigate('orderScr')
          }
    }

    render() {

        return (
            <View style={styles.container}>

            </View>
        );
    }
}

export default cleanScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        //justifyContent: 'center',
        //paddingTop: '8%',
        // marginTop: Platform.OS === 'ios' ? 35 : 0,
    },
});



