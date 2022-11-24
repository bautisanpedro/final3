import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../../firebase/config'
import Comment from '../../components/Comment/Comment'

class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: '',
      comentarios: ''
    }
  }

  componentDidMount(){
    db.collection('posts').doc(this.props.route.params.id).onSnapshot(docs => { // al pasarlo por id recibo un solo posteo
      this.setState({
        comentarios: docs.data().comentarios
      })
    })
  }

  guardarComentario(){
    db.collection('posts')
    .doc(this.props.route.params.id) // falta snapshot
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        comentario: this.state.comentario,
        usuario: auth.currentUser.email
      })
    })
    .then()
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Comentarios mas recientes</Text>

        <FlatList 
        data = {this.state.comentarios}
        keyExtractor = {(item) => item.comentario}
        renderItem = {({item}) => <Comment data={item}/> }
        />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Agrega un comentario'
          onChangeText={text => this.setState({comentario: text})}
          value={this.state.comentario}
        />
        <TouchableOpacity onPress={()=> this.guardarComentario(this.state.descripcion)}>
          <Text style={styles.button}>Publicar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#4F4D8C'
    },
    
    input:{
      margin: 8,
      padding: 10,
      fontSize: 15,
      borderRadius: 5,
      backgroundColor: 'white'
    },

    button:{
      textAlign: 'center',
      backgroundColor: '#8F8EBF',
      padding: 5,
      borderRadius: 5,
      margin: 8,
      fontWeight: '400',
      fontSize: 17
  },

  text:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    margin:20,
    color: 'white'
  }
})

export default Comments