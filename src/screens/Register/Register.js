import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Register extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    registrar(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(resp => this.props.navigation.navigate('Login'))
            .catch(err => this.setState({ error: err.message }))
    }

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
                        placeholder='Creá tu contraseña'
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
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