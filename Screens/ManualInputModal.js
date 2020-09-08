import * as React from 'react';
import { View, Button, Alert, ScrollView, Text, AsyncStorage } from 'react-native';
import { Input } from 'react-native-elements';
import 'react-native-gesture-handler';

// import data from '../database.json';

function ManualInputModal({ navigation }) {

    let state = {
        title: '',
        subtitle: '',
        author: '',
        tags: '',
    }
    let handleTitle = (text) => {
        state.title = text;
    }
    let handleSubtitle = (text) => {
        state.subtitle = text;
    }
    let handleAuthor = (text) => {
        state.author= text;
    }
    let handleTags = (text) => {
        state.tags= text;
    }
    let addBook = async (title, subtitle, author, tags) => {

        try {
            // get data if avaible, append, then save
            // get data
            let datas = await AsyncStorage.getItem("MyLibrary");
            if (datas !== null){
                datas = JSON.parse(datas);
                // append
                datas.push(state);
                
                // save 
                try {
                    await AsyncStorage.setItem("MyLibrary", JSON.stringify(datas));
                } catch (error){
                    Alert.alert(erorr);
                }
            } else { // data wasnt avaible ( list is empty )
                try {
                    await AsyncStorage.setItem("MyLibrary", JSON.stringify(datas));
                } catch (error){
                    Alert.alert(erorr);
                }
            }
        }catch (error){
            Alert.alert(error);
        }


        // XXX add date
        // XXX split tags into a list
        // data.MyLibrary.books.push(state);
        // XXX save data file
        // console.log(data);
        navigation.goBack();
    }

    return (
        <ScrollView style={{flex:1}} keyboardShouldPersistTaps='never'>

            <Text style={{fontSize: 30}}> </Text>
            <Input 
                placeholder='Title'
                onChangeText = {handleTitle}
            />  
            <Input 
                placeholder='Subtitle (Optional)'
                onChangeText = {handleSubtitle}
            />  
            <Input 
                placeholder='Author'
                onChangeText = {handleAuthor}
            />  
            <Input 
                placeholder='Tags'
                onChangeText = {handleTags}
            />  
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
            />
            <Button
                title="Add Book"
                onPress={() => addBook(state.title, state.subtitle, state.author, state.tags) }
            />

            </View>
        </ScrollView>
    )
}

export default ManualInputModal;
