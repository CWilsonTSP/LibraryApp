import { createStackNavigator } from '@react-navigation/stack';

const LibraryStack = createStackNavigator();
function LibraryNavigator({ navigation }){
    // stack navigator for library
    return(
        <LibraryStack.Navigator>
            <LibraryStack.Screen
                name="Libraries"
                component={LibraryScreen}
                options={{
                    title: 'Libraries',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <LibraryStack.Screen 
                name="My Library"
                component={MyLibrary}
                options={{
                    title: 'Libraries',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
        </LibraryStack.Navigator>
    )

}

