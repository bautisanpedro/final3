import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'


class Register extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            username:'',
            biografia:''

        }
    }


    registrar(email, password){
        if (this.state.username == '') {
            this.setState({error:"El usuario no puede quedar vacío"})
          }
        else {
        auth.createUserWithEmailAndPassword(email, password)
        .then(resp => {
            db.collection('users').add({
                username: this.state.username,
                email: auth.currentUser.email,
                biografia: this.state.biografia,
                password: this.state.password,
                createdAt: Date.now(), 
            })
        })
        .then( resp => this.props.navigation.navigate('Login'))
        .catch( err => this.setState({error:err.message}))
    }}

    render() {
        return (
            <View style={styles.body}>
                <View>
                    <Text style={styles.titulo}>Registro</Text>

                    <TextInput
                        style={styles.input}
                        placeholder='Ingresá tu correo'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresa tu usuario'
                        onChangeText={text => this.setState({ username: text })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Creá tu contraseña'
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresá tu biografía'
                        onChangeText={text => this.setState({ biografia: text })}
                        value={this.state.biografia}
                    />

                    <View>
                        <TouchableOpacity style={styles.botones} onPress={() => this.registrar(this.state.email, this.state.password)}>
                            <Text>Registrar usuario</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.login}>
                        <Text style={styles.registrar}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity style={styles.botones} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> :
                            <Text></Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    botones: {
        margin: 20,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 8,
        width: 'fit-content',
        backgroundColor: '#d4a373',


    },
    input: {
        marginBottom: '10px',
        marginTop: 20,
        margin: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    titulo:{
        marginTop: 70,
        fontSize: 20
    },
    registrar: {
        marginTop: 40,
        fontSize: 15
    },
    body: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#faedcd',
        

    }
})

export default Register