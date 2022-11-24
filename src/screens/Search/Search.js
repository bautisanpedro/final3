import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,  FlatList} from 'react-native';
import { auth, db } from '../../firebase/config'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            search: '',
            results: [],            
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
                    
               })
            })
            
    })
}
buscar(text){
    let filtro = this.state.results.filter(UnUsuario => 
        UnUsuario.data.username.toLowerCase().includes(text.toLowerCase()))

    this.setState({
        results: text,
        results: filtro, 
    })
}

render() {
    return (
            <View>
            <TextInput
              onChangeText={ text => this.setState( {search:text} )}
              placeholder='Busca un usuario'
              value={this.state.search}>
            </TextInput>

            <TouchableOpacity onPress={()=> this.buscar(this.state.search)}>
                <Text> Buscar</Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.results}
              keyExtractor={(item) => item.id}
              renderItem= {({item}) => <View>
                
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Perfil')}>
                  <Text>{item.data.username}</Text>
                </TouchableOpacity>  
                
                </View>}
            /> 
             
        </View>
    )

}
}



export default Search