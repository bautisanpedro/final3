import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import Comments from '../screens/Comments/Comments'
//import UsersProfile from '../screens/UsersProfile/UsersProfile'
import Perfil from '../screens/Perfil/Perfil'

const Stack = createNativeStackNavigator()


export default class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
        name='Home'
        component= {Home}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen 
            name='Comments'
            component={Comments}
        />
        <Stack.Screen
                        name='Perfil'
                        component={Perfil}
                        options={{
                            headerShown: false
                        }}
                    />
      </Stack.Navigator>
    )
  }
}