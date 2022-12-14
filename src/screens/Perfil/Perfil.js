import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import  Post  from '../../components/Post/Post'



class Perfil extends Component {

    constructor(){
        super()
        this.state={
            posts:[],
            perfil:{},
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
          <View style={styles.container}>
           
            <Text style={styles.titulo}>Nombre de Usuario: {this.state.perfil.username}</Text>
            <Text style={styles.titulo}>Email:  {this.state.perfil.email}</Text>
            <Text style={styles.titulo}>Biografía: {this.state.perfil.biografia}</Text>
            <Image style={styles.foto}
            source={{uri: this.state.perfil.foto}} 
            resizeMode = 'contain'
          />
          
          <Text style={styles.titulo2}> Publicaciones </Text> 
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
  foto:{
    height:"50px",
    width:"50px",
    borderRadius: "5px",
    marginLeft:"auto",
    marginRight:"auto"
  }
  })

export default Perfil