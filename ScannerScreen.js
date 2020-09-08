import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

class ScannerScreen extends React.Component{
  static navigationOptions = {
    header: null
  }
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false // scanned
  }
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }


  handleBarCodeScanned = ({ type, data }) => {
      // Do something here
      // this.props.navigation.navigate('Decode', {
      //   data: data 
      // });
      Alert.alert(data);
      console.log(data);
      // XXX make api call
      let temp = fetch('openlibrary.org/api/books?bibkeys=ISBN:' + data + '&jscmd=details&format=json').then((response) => response.json());
      console.log(temp);
  }
  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      // requesting permission
      return (
      <Text>Requesting permission</Text>
      );
    }
    if(hasCameraPermission === false){
        //permission denied
      return ( 
        <Text>Please give permission</Text>
      )
    }
    if(hasCameraPermission === true && !isScanned && this.props.navigation.isFocused() ){
      // we have permission and this screen is under focus
      return <View style = {{
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'

      }}>
        <BarCodeScanner
          onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
          style = {{
            height: 200,
            alignSelf: 'stretch',
          }}
        >
        </BarCodeScanner>
          <Text style={styles.heading} >Scan a book's barcode inside the window.</Text>
          <Text style={styles.text} >If the barcode scanner does not appear, you need to give the app permission to access the camera.</Text>
      </View>
    }
    else{
      return <Text></Text>; 
    }
  }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24, 
        fontWeight: "300",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        textAlign: 'center',
    },
    text: {
        fontSize: 16, 
        fontWeight: "300",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        textAlign: 'center',
    }
});

export default ScannerScreen;
