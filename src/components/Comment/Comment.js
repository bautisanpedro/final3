import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class Comment extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: props.data.comentario,
            usuario: props.data.usuario
        }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textUser}>{this.state.usuario}:</Text>
        <Text style={styles.textUser}>{this.state.comentario}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    padding:5,
    backgroundColor: '#8F8EBF',
    borderRadius: 5,
    borderTopWidth: 0,
    borderColor: '#B5B5B5',
    
  },

  textUser:{
    fontWeight: '400',
    marginVertical: 20,
    fontSize: 16, 
    flex:1,
    /*
    backgroundColor: '#8F8EBF',
    borderRadius: 5,
    width: 'fit-content',
    padding: 8
    */
   
  },

  text:{
    fontSize: 16,
    marginTop: 5,
  }
})

export default Comment