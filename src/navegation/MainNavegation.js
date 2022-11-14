import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import Register from '../screens/Register/Register'
import Login from '../screens/Login'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Home from '../screens/Home/Home'
import TabNavigation from './TabNavigation'


const Nav = createNativeStackNavigator()


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
                <Nav.Navigator initialRouteName={this.state.initialScreen}>
                    <Nav.Screen 
                    name= 'Login'
                    component={Login}
                    options= {{
                        headerShown: flase
                    }}
                    />
                   
                    <Nav.Screen
                        name='Registro'
                        component={Register}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Nav.Screen
                      name='TabNavigation'
                      component={TabNavigation}
                      options={{
                          headerShown:false
                        }}
                        />
                </Nav.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainNavigation