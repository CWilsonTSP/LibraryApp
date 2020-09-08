import * as React from 'react';
import {  Text, ScrollView } from 'react-native';
import 'react-native-gesture-handler';

function MyAccount(){
    // app settings
    return(
        <ScrollView style={{ flex: 1 }}>
            <Text>Account page.</Text>
        </ScrollView>
    )
}

export default MyAccount;
