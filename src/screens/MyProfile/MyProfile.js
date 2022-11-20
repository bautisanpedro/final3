import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'


class Profile extends Component {

    constructor(){
        super()
        this.state={
            posts:[],
            perfil:{},
            loading:true
        }
    }

signOut(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate("Login"))
    }

    render() {
        return (
          <View>
            {
             <>
             <Text>Nombre de Usuario:</Text>
             <Text>Email:</Text>
             <Text>Biografía:</Text>
    
             </>
            }
           
             
           
           <Text>Tus Publicaciones </Text> 
            
            
            <TouchableOpacity onPress={() => this.signOut()}>
              <Text>Cerrar Sesion</Text>
            </TouchableOpacity>
          
            </View>
        )
      }
    }

export default Profile