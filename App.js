import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Component } from 'react';
import MainNavigation from './src/navegation/MainNavegation';


export default class App extends Component {

  constructor(){
    super()
    this.state = {
      initialScreen: 'Register'
    }
  }
  render(){
  return (
    <MainNavigation initial={this.state.initialScreen} />
  );
}
}

