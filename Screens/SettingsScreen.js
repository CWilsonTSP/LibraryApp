import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, Switch, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SettingsScreen({ navigation }){
    // app settings

    // onValueChange = onValueChange.bind(this);
    // state = {swithValue: false};

    return(
        <ScrollView style={{ flex: 1}}>

        <SettingsList>
          <SettingsList.Header headerText='General' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              itemWidth={50}
              title='My Account'
              onPress={() => navigation.navigate('My Account')}
            />
            <SettingsList.Item
              hasNavArrow={false}
              // switchState={this.state.switchValue}
              // switchOnValueChange={this.onValueChange}
              hasSwitch={true}
                title='Dark Mode'/>

            <SettingsList.Header headerText='Data and Usage' headerStyle={{color:'#000000', marginTop:50}}/>
            <Text>*insert size of data (wishlist, default, and others)*</Text>
            <SettingsList.Item titleInfo="6 Mb" hasNavArrow={false} title='Data'/>
            <SettingsList.Item title='Import Data'
                titleStyle={{color:'#0000ff'}}/>
            <SettingsList.Item title='Export Data'
                titleStyle={{color:'#0000ff'}}/>
            <SettingsList.Item title='Delete Data'
                titleStyle={{color:'#ff0000'}}/>

            <SettingsList.Header headerText='About' headerStyle={{color:'#000000', marginTop:50}}/>
            <SettingsList.Item titleInfo='1.0.0' hasNavArrow={false} title='Version'/>
            <SettingsList.Item title='View Changelog'/>
            <SettingsList.Item title='Send Feedback'/>
            <SettingsList.Item title='Report Bugs'/>
          </SettingsList>
           
        </ScrollView>
    )
}

export default SettingsScreen;

