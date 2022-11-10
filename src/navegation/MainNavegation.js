import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import Register from '../screens/Register/Register'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Home from '../screens/Home/Home'



const Stack = createNativeStackNavigator()


class MainNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialScreen: 'Register'
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.initialScreen}>
                    <Stack.Screen
                        name='Registro'
                        component={Register}
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainNavigation