import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker';


class Register extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            username:'',
            descripcion:''

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
                decripcion: this.state.descripcion,
                password: this.state.password,
                createdAt: Date.now(), 
            })
        })
        .then( resp => this.props.navigation.navigate('Login'))
        .catch( err => this.setState({error:err.message}))
    }}
    pickImage(){
        ImagePicker.launchImageLibraryAsync() // usuario elige entre sus fotos
        .then(resp => {
            fetch(resp.uri) 
            .then(data => data.blob()) // Paso la uri a BLOB = Binary Large OBject
            .then(image => {
                const ref = storage.ref(`fotosDePerfil/${Date.now()}.jpg`) // Aclaro donde y como se guarda lo foto en el storage de firebase
                ref.put(image) // Guardo la imagen en esa ubicación
                .then(()=> {
                    ref.getDownloadURL() // Recibo la url de la foto para guardarla en la base de datos
                    .then(url => {
                            this.setState({foto:url}) // Guardo la url en el estado
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
                     <View>

                    <TouchableOpacity style={styles.botton} onPress={()=> this.pickImage()}>
                        <Text style={styles.botones}>Foto de perfil</Text>
                    </TouchableOpacity>
                </View>
                    
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresá tu descripción'
                        onChangeText={text => this.setState({ descripcion: text })}
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