import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase/config'

export class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            logueado: false
        }
    }

    logueo (email,password) {
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => this.setState({logueado:true}))
        .catch(err=> console.log(err))
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <View>
            <TextInput
             style={StyleSheet.input}
             onChangeText={text => this.setState({email:text})}
             placeholder= 'Ingresá tu email'
             value= {this.state.email}
             ></TextInput>
              <TextInput
             style={StyleSheet.input}
             onChangeText={text => this.setState({password:text})}
             placeholder= 'Ingresá tu contraseña'
             value= {this.state.password}
             ></TextInput>
             <TouchableOpacity onPress={()=> this.logueo(this.state.email, this.state.password)}>
                <Text>Ingresar</Text>
             </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    input : {
        borderWidth : 1 
    }
})

export default Login