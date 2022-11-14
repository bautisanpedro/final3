import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import { Entypo } from '@expo/vector-icons'; 
import HomeNavigation from './HomeNavigation';


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name={'HomeNavigation'} 
        component={HomeNavigation}
        options={{
            tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
            headerShown:false
        }}/>
       
    </Tab.Navigator>
  )
}