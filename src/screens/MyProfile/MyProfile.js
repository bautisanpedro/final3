import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import { Post } from '../../components/Post/Post'



class Profile extends Component {

    constructor(){
        super()
        this.state={
            posts:[],
            perfil:{},
            id: '',
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
            id: doc.id,
            perfil: doc.data()
          })) 
        })
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
             <Text>Nombre de Usuario: {this.state.perfil.username}</Text>
             <Text>Email:  {this.state.perfil.email}</Text>
             <Text>Biografía: {this.state.perfil.biografia}</Text>
    
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