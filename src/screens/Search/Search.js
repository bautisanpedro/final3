import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
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
                    results: users,
                    loading: false
               })
            })
            
    })
}

    render() {
        return (
            <View>
           <Text>Search</Text>
           </View>
        )

    }
}



export default Search