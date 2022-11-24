import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import  Post  from '../../components/Post/Post'



class Profile extends Component {

    constructor(){
        super()
        this.state={
            posts:[],
            perfil:{},
            
        }
    }

    componentDidMount(){
      db.collection('posts')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(docs => {
          let posteos = []
          docs.forEach(doc => {
              posteos.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
              posts: posteos
          })
      })
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
            
            <Text>Nombre de usuario: {this.state.perfil.username}</Text>
            <Text>Email:  {this.state.perfil.email}</Text>
            <Text>Biografía: {this.state.perfil.descripcion}</Text>
    
          
          
          
          
          <Text>Tus Publicaciones </Text> 
          <FlatList
          data={this.state.posts}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
        />
            
            
            <TouchableOpacity onPress={() => this.signOut()}>
              <Text>Cerrar Sesion</Text>
            </TouchableOpacity>
          
            </View>
        )
      }
    }

export default Profile