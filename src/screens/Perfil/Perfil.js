import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import  Post  from '../../components/Post/Post'



class Perfil extends Component {

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
        .where('email', '==', this.props.route.params.email)
        .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
            id: doc.id,
            perfil: doc.data()
          })) 
        })
        db.collection('posts')
        .where('email', '==', this.props.route.params.email)
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
    }
   
    render() {
        return (
          <View>
            {
            <>
            <Text>Nombre de Usuario: {this.state.perfil.username}</Text>
            <Text>Email:  {this.state.perfil.email}</Text>
            <Text>Biografía: {this.state.perfil.descripcion}</Text>
    
            </>
            }
          
          
          
          <Text> Publicaciones </Text> 
          <FlatList
          data={this.state.posts}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
        />
            
            
           
          
            </View>
        )
      }
    }

export default Perfil