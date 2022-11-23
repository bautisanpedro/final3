import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import { Post } from '../../components/Post/Post'



class Profile extends Component {

    constructor(props){
        super(props)
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
          
            </View>
        )
      }
    }

export default Profile