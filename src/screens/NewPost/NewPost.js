import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Camera from '../../components/Camera/Camera'

class NewPosts extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion: '',
            mostrarCamara: true,
            fotoUrl: ''
        }
    }

    guardarPost(text){
        db.collection('posts').add({
            email: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: text,
            likes: [],
            comentarios: [],
            foto: this.state.fotoUrl
        })
        .then( () => this.props.navigation.navigate('Home'))
        .catch( err => this.setState({error:err.message}))
    }

    subirFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara: false
        })
    }
    
    render() {
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <Camera subirFoto={(url)=> this.subirFoto(url)}/> :
                <>
                    <TextInput  style={styles.input}
                        placeholder='Descripción'
                        onChangeText={text => this.setState({descripcion: text})}
                        value={this.state.descripcion}
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.button} onPress={()=> this.guardarPost(this.state.descripcion)}>
                        <Text style={styles.button}>Compartir</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#4F4D8C',

    },
    
    input: {
        marginBottom: '10px',
        marginTop: 20,
        margin: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },

    button:{
        textAlign: 'center',
        backgroundColor: '#8F8EBF',
        padding: 5,
        borderRadius: 8,
        borderColor: '#ccc',
        margin: 5,
        fontWeight: '400',
        fontSize: 17
    },
})

export default NewPosts