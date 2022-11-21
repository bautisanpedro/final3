import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'
import Profile from '../screens/MyProfile/MyProfile'
import HomeNavigation from './HomeNavigation'
import Search from '../screens/Search/Search'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>

        <Tab.Screen 
        name={'HomeNavigation'} 
        component={HomeNavigation}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          headerShown:false
        }}
        />
        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={24} color="black" />,
          headerShown:false
        }} 
        />

        <Tab.Screen
        name= 'Search'
        component={Search}
        options= {{
            tabBarIcon: () => <AntDesign name="search1" size={24} color="black" />,
            headerShown: false
        }}
        />

      
    </Tab.Navigator>
  )
}