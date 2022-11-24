import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase/config'





export class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            logueado: false,
            error:''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    login (email,password) {
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch( err => this.setState({error:err.message}))
    }

  render() {
    return (
        
      <View style={styles.body}>
        <Text style={styles.login}>Login</Text>
        <View>
            <TextInput
             style={styles.input}
             onChangeText={text => this.setState({email:text})}
             placeholder= 'Ingresá tu correo'
             value= {this.state.email}
             ></TextInput>
              <TextInput
             style={styles.input}
             onChangeText={text => this.setState({password:text})}
             placeholder= 'Ingresá tu contraseña'
             value= {this.state.password}
             ></TextInput>
             <TouchableOpacity style={styles.botones} onPress={()=> this.login(this.state.email, this.state.password)}>
                <Text>Ingresar</Text>
             </TouchableOpacity>
        </View>

        <View>
                <Text style={styles.alRegistro}>¿Aún no tienes una cuenta?</Text>
                <TouchableOpacity style={styles.botones} onPress={() => this.props.navigation.navigate('Registro') }>
                    <Text style={styles.register}>Registrate</Text>
                </TouchableOpacity>
            </View>
            {
                        this.state.error !== '' ?
                            <Text style={styles.error}>{this.state.error}</Text> :
                            <Text></Text>
                    }
       
      </View>
     
    )
  }
}
const styles = StyleSheet.create({
    botones: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        margin: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 8,
        width: 'fit-content',
        backgroundColor: '#8F8EBF',
        color:'white'


    },
    input: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: '10px',
        marginTop: 20,
        margin: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    login: {
        marginTop: 70,
        fontSize: 20,
        color: 'white'
    },
    alRegistro:{
        color: 'white',
        marginTop: 40
    },
    error:{
        color: 'red',
        backgroundColor: '#8F8EBF',
        marginHorizontal: 20,
        borderRadius: 5,
        padding: 8

    },
    body: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#4F4D8C',
        

    }
})

export default Login