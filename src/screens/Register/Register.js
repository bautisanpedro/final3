import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker';
import {storage} from '../../firebase/config'


class Register extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            username: '',
            descripcion: ''

        }
    }


    registrar(email, clave){
        if (this.state.usuario == '') {
            this.setState({error:"El usuario no puede quedar vacío"})
          }
        else {
        auth.createUserWithEmailAndPassword(email, clave)
        .then(resp => {
            db.collection('users').add({
                email: auth.currentUser.email,
                usuario: this.state.usuario,
                createdAt: Date.now(), 
                clave: this.state.clave,
                biografia: this.state.biografia,
                foto: this.state.foto
            })
        })
        .then( resp => this.props.navigation.navigate('Login'))
        .catch( err => this.setState({error:err.message}))
    }}
    pickImage() {
        ImagePicker.launchImageLibraryAsync() // usuario elige entre sus fotos
            .then(resp => {
                fetch(resp.uri)
                    .then(data => data.blob()) // Paso la uri a BLOB = Binary Large OBject
                    .then(image => {
                        const ref = storage.ref(`fotosDePerfil/${Date.now()}.jpg`) // Aclaro donde y como se guarda lo foto en el storage de firebase
                        ref.put(image) // Guardo la imagen en esa ubicación
                            .then(() => {
                                ref.getDownloadURL() // Recibo la url de la foto para guardarla en la base de datos
                                    .then(url => {
                                        this.setState({ foto: url }) // Guardo la url en el estado
                                    }
                                    )
                            })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    };

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
                        placeholder='Ingresá tu descripción'
                        onChangeText={text => this.setState({ descripcion: text })}
                        value={this.state.biografia}
                    />

                    <View>

                        <TouchableOpacity onPress={() => this.pickImage()}>
                            <Text style={styles.botones}>Foto de perfil</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <TouchableOpacity onPress={() => this.registrar(this.state.email, this.state.password)}>
                            <Text style={styles.botones}>Registrar usuario</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.registrar}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.botones}>Log in</Text>
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
        marginBottom: '10px',
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        margin: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#8F8EBF',
        width: 'fit-content',
        color: 'white'

    },
    input: {
        flex: 1,
        alignContent: 'center',
        marginBottom: '10px',
        marginTop: 20,
        margin: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    titulo: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 70,
        fontSize: 20,
        color: 'white'
    },
    registrar: {
        flex: 1,
        alignSelf:'center',
        alignContent: 'center',
        marginBottom: '10px',
        marginTop: 40,
        fontSize: 15,
        color: 'white'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#4F4D8C',
        color: 'white'


    }
})

export default Register