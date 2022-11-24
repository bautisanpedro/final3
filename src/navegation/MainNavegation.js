import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import Register from '../screens/Register/Register'
import Login from '../screens/Login/Login'
import TabNavigation from './TabNavigation'




const Stack = createNativeStackNavigator()


class MainNavigation extends Component {
    constructor(props) {   //  metodo constructor -> contiene info del estado inicial y administra props
        super(props)   // funcion para utilizar las props
        this.state = {
            initialScreen: 'Login'
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.initialScreen}>
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name='Registro'
                        component={Register}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name='TabNavigation'
                        component={TabNavigation}
                        options={{
                            headerShown: false
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainNavigation