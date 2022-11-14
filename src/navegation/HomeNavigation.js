import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
        name='Home'
        component= {Home}
        />
      </Stack.Navigator>
    )
  }
}