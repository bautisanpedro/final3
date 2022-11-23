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
                    let users = [];
               docs.forEach( doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
            })
                   this.setState({
                    results: usuarios,
                    
               })
            })
            
    })
}

    render() {
        return (
           <Text>Search</Text>
        )

}
}



export default Search