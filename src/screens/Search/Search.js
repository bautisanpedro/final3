import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,  FlatList, StyleSheet} from 'react-native';
import { auth, db } from '../../firebase/config'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            search: '',
            results: [],
            backup:[],            
        }
    }
    
    componentDidMount(){
        db.collection('users').onSnapshot(
            docs =>{
                    let usuarios = [];
               docs.forEach( doc => {
                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
            })
                   this.setState({
                    results: usuarios,
                    backup: usuarios
                    
               })
            })
            
    })
}
buscar(text){
    let filtro = this.state.backup.filter(UnUsuario => 
        UnUsuario.data.username.toLowerCase().includes(text.toLowerCase()))

    this.setState({
        search: text,
        results: filtro, 
    })
}

render() {
    return (
            <View style={styles.container}>
            <TextInput style={styles.input}
              onChangeText={ text => this.buscar(text)}
              placeholder='Busca un usuario'
              value={this.state.search}>
            </TextInput>

            <TouchableOpacity onPress={()=> this.buscar(this.state.search)}>
                <Text style={styles.botones}> Buscar</Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.results}
              keyExtractor={(item) => item.id}
              renderItem= {({item}) => <View>
                
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Perfil',
                {email: item.data.email}
                 )}>
                  <Text style={styles.titulo2}>{item.data.username}</Text>
                </TouchableOpacity>  
                
                </View>}
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
input: {
    flex: 1,
    alignContent: 'center',
    marginBottom: '10px',
    marginTop: 20,
    margin: 3,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
}
})



export default Search