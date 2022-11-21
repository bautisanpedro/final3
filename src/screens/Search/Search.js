import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../../firebase/config'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            valor: ''
        }
    }

    evitarSubmit(event) {
        event.preventDefault()
        console.log(event)
    }

    controlarCambios(event) {
        this.setState({
            valor: event.target.value
        },
            () => this.props.filtrar(this.state.valor)
        )
    }

    render() {
        return(
       <Text>Search</Text>
        )

    }
}

export default Search