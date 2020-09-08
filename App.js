// Expo and react modules
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Switch, Alert, Modal, AsyncStorage } from 'react-native';
import { Overlay, Input, ListItem, CheckBox } from 'react-native-elements';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import ScannerScreen from './ScannerScreen';

import data from './database.json'

// screens and custom modules
import MyAccount from './Screens/MyAccount';
import SettingsScreen from './Screens/SettingsScreen';
import ManualInputModal from './Screens/ManualInputModal';

// openlibrary.org/api/books?bibkeys=ISBN{isbn}@jscmd=details&format=json
// openlibrary.org/api/books?bibkeys=ISBN{isbn}@jscmd=data&format=json


const navigationRef = React.createRef();

function navpush(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}

function get_books2(library){
    let rv = [];
    
    const unnamed_might_delete = async () => {
        console.log("Inside unnamed_might_delete");
        try {
            console.log("Awaiting data");
            let datas = await AsyncStorage.getItem(library);
            console.log("Got data");
    
            if (datas !== null){
                console.log("parsing data");
                datas = JSON.parse(datas);
    
                for (let i = 0; i < datas[library].books.length; i++){
                    console.log("adding item "+ i);
                    let temp = {
                        added: datas[library].books[i].added,
                        author: datas[library].books[i].author,
                        read: datas[library].books[i].read,
                        subtitle: datas[library].books[i].subtitle,
                        tags: datas[library].books[i].tags,
                        title: datas[library].books[i].title,
                    }
                    
                    console.log("Pushing temp");
                    rv.push(temp);
                }
            }
    
        }catch (error){
            Alert.alert(error);
        }
    }
    
    console.log("calling unnamed_might_delete");
    // unnamed_might_delete();

    console.log("finished unnamed_might_delete");

    if (rv.length != 0){
        return(
            <View>
                {
                    rv.map((l, i) => (
                        <ListItem
                        key={i}
                        title={l.title}
                        subtitle={l.author}
                        bottomDivider
                        chevron
                        onPress={() => 
                            navpush('BookScreen', {
                                title: l.title,
                                subtitle: l.subtitle,
                                author: l.author,
                                tags: l.tags
                            })}
                        />
                    ))
                }
            </View>    
        )
    } else {
        return (
            <ListItem 
                title="Nothing to see here!"
                subtitle="Do you have any books yet?"
                bottomDivider
            />
        )
    }
}




function get_books(library){
    let rv = [];
    // console.log("library = "+ library);
    // console.log("rv = "+ rv);
    for (let i = 0; i < data[library].books.length; i++){
        let temp = {
            added: data[library].books[i].added,
            author: data[library].books[i].author,
            read: data[library].books[i].read,
            subtitle: data[library].books[i].subtitle,
            tags: data[library].books[i].tags,
            title: data[library].books[i].title,
        }

        rv.push(temp);
        // console.log('added ' + data[library].books[i].title);
    }

    return(
        <View>
            {
                rv.map((l, i) => (
                    <ListItem
                    key={i}
                    title={l.title}
                    subtitle={l.author}
                    bottomDivider
                    chevron
                    onPress={() => 
                        navpush('BookScreen', {
                            title: l.title,
                            subtitle: l.subtitle,
                            author: l.author,
                            tags: l.tags
                        })}
                    />
                ))
            }
        </View>    

    )
}

const RootLibraryStack = createStackNavigator();
function RootLibraryNavigator({ navigation }){
    // stack navigator for library
    return(
        <RootLibraryStack.Navigator mode="modal">
            <RootLibraryStack.Screen
                name="LibrariesStack"
                component={LibraryNavigator}
                options={{
                    title: 'Libraries',
                    headerShown: false,
                    headerTitleAlign: 'center',
                }}
            />
            <RootLibraryStack.Screen 
                name="CreateLibrary"
                component={CreateLibraryModal}
                options={{
                    title: 'Create new Library',
                    headerShown: false,
                    headerTitleAlign: 'center',
                }}
            />

        </RootLibraryStack.Navigator>
    )

}
const LibraryStack = createStackNavigator();
function LibraryNavigator({ navigation }){
    return(
        <LibraryStack.Navigator >
            <LibraryStack.Screen
                name="Libraries"
                component={LibraryScreen}
                options={{
                    title: 'Libraries',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <Button 
                            onPress={() => { navigation.navigate('CreateLibrary')}}
                            title="New Library"
                        />
                    )
                }}
            />
            <LibraryStack.Screen 
                name="My Library"
                component={MyLibrary}
                options={{
                    title: 'My Library',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <LibraryStack.Screen 
                name="Wishlist"
                component={Wishlist}
                options={{
                    title: 'Wishlist',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <LibraryStack.Screen 
                name="ManualInputModal"
                component={ManualInputModal}
                options={{
                    title: 'Add a Book',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <LibraryStack.Screen 
                name="BookScreen"
                component={BookScreen}
                options={{
                    title: 'Book',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <LibraryStack.Screen 
                name="Scanner"
                component={ScannerScreen}
                options={{
                    title: 'Scanner',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />

        </LibraryStack.Navigator >
    )
}
function LibraryScreen({ navigation }){
    // buttons for accessing libraries, each will have their own page
    return(
        <ScrollView style={styleDark}>
            <Button 
                title="My Library"
                onPress={() => navigation.navigate('My Library')}
            />
            <Button 
                title="Wishlist"
                onPress={() => navigation.navigate('Wishlist')}
            />

        </ScrollView>
    )
}


function MyLibrary({ navigation }){
    // this has a search bar, sorting, and a scroll list of books

    return(
            // make "adding a book" into a clickable link
        <ScrollView style={{ flex: 1 }}>
            {get_books2("MyLibrary") }

            <Button 
                title="Scan Barcode"
                onPress={() => { navigation.navigate('Scanner') }}
            />
            <Button 
                title="Manual Input"
                onPress={() => { navigation.navigate('ManualInputModal')}}
            />
        </ScrollView>
    )
}

function BookScreen({ navigation, route }){

    return(
        <View>
            <Text>Title: {route.params.title}</Text>
            <Text>Subtitle: {route.params.subtitle}</Text>
            <Text>Author: {route.params.author}</Text>
            <Text>Tags: {route.params.tags}</Text>
        </View>
    )
}

function Wishlist(){
    // this has a search bar, sorting, and a scroll list of books
    const [addBookManualVisible, setAddBookManualVisible] = React.useState(false);
    const [addBookScanVisible, setAddBookScanVisible] = React.useState(false);

    const toggleAddBookScan = () => {
        setAddBookScanVisible(!addBookScanVisible);
    }
    const toggleAddBookManual= () => {
        setAddBookManualVisible(!addBookManualVisible);
    }


    return(
            // make "adding a book" into a clickable link
        <ScrollView style={{ flex: 1 }}>
            {get_books("Wishlist") }
            

            <Overlay isVisible={addBookScanVisible} onBackdropPress={toggleAddBookScan}>
                <View>
                    <Text>Scan a Barcode</Text>
                    <Text>Bring up the camera</Text>                
                </View>    
            </Overlay>
            <Overlay isVisible={addBookManualVisible} onBackdropPress={toggleAddBookManual}>
                <View>
                    <Text>Add a Book</Text>
                    <Text>Title</Text>
                    <Text>Subtitle (optional)</Text>
                    <Text>Author</Text>
                    <Text>Read (bool, optional)</Text>
                    <Text>tags (list, optional)</Text>
                </View>    
            </Overlay>
            <Button 
                title="Scan Barcode"
                onPress={toggleAddBookScan}
            />
            <Button 
                title="Manual Input"
                onPress={toggleAddBookManual}
            />
        </ScrollView>
    )
}

function CreateLibraryModal({ navigation }) {

    return (
        <View style={{flex:1, alignItems: 'center'}}>
            <Text style={{fontSize: 90}}> </Text>
            <Text style={{fontSize: 30}}>Create a New Library</Text>
            <Text style={{fontSize: 30}}> </Text>
            <Input 
                placeholder='MyNewLibrary'
                textAlign='center'
            />  
            <View style={{flexDirection:'row'}}>
                <Button
                    title="Cancel"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title="Add Library"
                    onPress={() => navigation.goBack()}
                />

            </View>
        </View>
    )
}

const SettingsStack= createStackNavigator();
function SettingsNavigator({ navigation }){
    // stack navigator for library
    return(
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <SettingsStack.Screen 
                name="My Account"
                component={MyAccount}
                options={{
                    title: 'My Account',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
        </SettingsStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer theme={ DefaultTheme } ref={navigationRef}>
        <Tab.Navigator mode="modal">
            <Tab.Screen
                name="Libraries"
                component={RootLibraryNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book-open-outline" color={color} size={size}/>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="settings-outline" color={color} size={size}/>
                    )
                }}

            />
        </Tab.Navigator>
    <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styleDark = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#23272a',
        color: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    }

});
