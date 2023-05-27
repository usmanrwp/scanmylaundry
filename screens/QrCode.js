import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TouchableHighlight
} from 'react-native';
import {CameraKitCameraScreen} from 'react-native-camera-kit';

export class QrCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opneScanner: false,
            qrvalue:''
        };
    }
    componentDidMount() {
  
    }

     onOpenlink = () => {
        // If scanned then function to open URL in Browser
        Linking.openURL(this.state.qrvalue);
      };
    
       onBarcodeScan = (qrvalue) => {
        // Called after te successful scanning of QRCode/Barcode
        // setQrvalue(qrvalue);
        // setOpneScanner(false);
        this.setState({qrvalue, opneScanner: false })
      };

      onOpneScanner = async()=>{
        if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "Cool Photo App needs access to your camera " +
                  "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({qrvalue:'', opneScanner: true })
            } else {
                alert('CAMERA permission denied');

            }
          } catch (err) {
            console.warn(err);
          }

        } else {
            //   setQrvalue('');
            //   setOpneScanner(true);
            this.setState({qrvalue:'', opneScanner: true })
              
            }
      }

      

     onOpneScannerr = () => {
        // To Start Scanning
        if (Platform.OS === 'android') {
          async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Camera Permission',
                  message: 'App needs permission for camera access',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // If CAMERA Permission is granted
                // setQrvalue('');
                // setOpneScanner(true);
        this.setState({qrvalue:'', opneScanner: true })

              } else {
                alert('CAMERA permission denied');
              }
            } catch (err) {
              alert('Camera permission err', err);
              console.warn(err);
            }
          }
          // Calling the camera permission function
          requestCameraPermission();
        } else {
        //   setQrvalue('');
        //   setOpneScanner(true);
        this.setState({qrvalue:'', opneScanner: true })
          
        }
      };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            {this.state.opneScanner ? (
              <View style={{flex: 1}}>
                <CameraKitCameraScreen
                  showFrame={false}
                  // Show/hide scan frame
                  scanBarcode={true}
                  // Can restrict for the QR Code only
                  laserColor={'blue'}
                  // Color can be of your choice
                  frameColor={'yellow'}
                  // If frame is visible then frame color
                  colorForScannerFrame={'black'}
                  // Scanner Frame color
                  onReadCode={(event) =>
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                  }
                />
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={styles.titleText}>
                  Barcode and QR Code Scanner using Camera in React Native
                </Text>
                <Text style={styles.textStyle}>
                  {this.state.qrvalue ? 'Scanned Result: ' + this.state.qrvalue : ''}
                </Text>
                {this.state.qrvalue.includes('https://') ||
                this.state.qrvalue.includes('http://') ||
                this.state.qrvalue.includes('geo:') ? (
                  <TouchableOpacity onPress={this.onOpenlink}>
                    <Text style={styles.textLinkStyle}>
                      {
                        this.state.qrvalue.includes('geo:') ?
                        'Open in Map' : 'Open Link'
                      }
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={this.onOpneScanner}
                  style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>
                    Open QR Scanner
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaView>
        );
    }
}

export default QrCode;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      },
      titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      textStyle: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        marginTop: 16,
      },
      buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        minWidth: 250,
      },
      buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
      },
      textLinkStyle: {
        color: 'blue',
        paddingVertical: 20,
      },
});