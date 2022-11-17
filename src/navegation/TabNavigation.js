import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'

import HomeNavigation from './HomeNavigation'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>

        <Tab.Screen 
        name={'HomeNavigation'} 
        component={HomeNavigation}
        options={{
          tabBarIcon: () => <Ionicons name='ios-home' color={'#0095F6'} size={35} />,
          headerShown:false
        }}
        />

      
    </Tab.Navigator>
  )
}