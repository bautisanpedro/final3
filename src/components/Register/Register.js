import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'


export default class Register extends Component {

    constructor(){
        super()
        this.state = {
            mail: '',
            password: ''
        }
    }

    //Función registro
    registroDeUsuarios(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

  render() {
    return (
        <View>

            <View>
                <TextInput
                    style = {styles.input}
                    onChangeText = {(text) => this.setState({mail: text})}
                    value={this.state.mail}
                    keyboardType='email-address'
                    placeholder='Ingresa tu email'
                />
                <TextInput
                    style = {styles.input}
                    onChangeText = {(text) => this.setState({password: text})}
                    value={this.state.password}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='Ingresa tu password'
                />
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1
    }
})
