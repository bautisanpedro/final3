import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
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
          <View style={styles.container}>
            
            <Text style={styles.titulo}>Nombre de usuario: {this.state.perfil.username}</Text>
            <Text style={styles.titulo}>Email:  {this.state.perfil.email}</Text>
            <Text style={styles.titulo}>Biografía: {this.state.perfil.biografia}</Text>
            <TouchableOpacity onPress={() => this.signOut()}>
              <Text style={styles.botones}>Cerrar Sesion</Text>
            </TouchableOpacity>
          
          
          
          
          <Text style={styles.titulo2}>Tus Publicaciones </Text> 
          <FlatList
          data={this.state.posts}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
        />
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
      titulo: {
          flex: 1,
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 5,
          fontSize: 20,
          color: 'white'
      },
      error:{
          color: 'red',
          backgroundColor: '#8F8EBF',
          marginHorizontal: 20,
          borderRadius: 5,
          padding: 8
  
      },
      titulo2: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 5,
        fontSize: 15,
        color: 'white'
    },
    container:{
      flex:1,
      backgroundColor: '#4F4D8C',
      color: 'white'

  },
  })
  

export default Profile