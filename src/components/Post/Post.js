import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            MyLike: false,
            likesCount: props.data.likes.length,
            ComentsCount: props.data.comentarios.length,
            data: {},
            MyPost: false
        }
    }
    componentDidMount(){
        if(this.props.data.email === auth.currentUser.email){
            this.setState({
                MyPost:true
            })  
        }
        if(this.props.data.likes.includes(auth.currentUser.email)){
            this.setState({
                MyLike:true
            })
        }
        console.log(this.props.data)
    }
    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                MyLike:true,
                likesCount: this.state.likesCount + 1
            })
        })
        .catch(err=> console.log(err))      
    }
    unlike(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                MyLike:false,
                likesCount: this.state.likesCount - 1
            })
        })
        .catch(err => console.log(err))
    }
    delete(){
        db.collection('posts')
        .doc(this.props.id)
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }
    render() {
        return (
            
            <View style={styles.container}>
                <Text onPress={()=>this.props.navigation.navigate('Perfil',  { email: this.props.data.email })} >
                {this.props.data.email}
                </Text>
                <Image 
                    style={styles.image}
                    source={{uri: this.props.data.foto}}
                    resizeMode='cover'
                />
                
                <Text style={styles.subtitle}>Descripcion:</Text>
                <Text>{this.props.data.descripcion}</Text>
                
                <Text>{this.state.likesCount}</Text>
                    {
                        this.state.MyLike ?
                        <TouchableOpacity onPress={()=> this.unlike()}>
                            <FontAwesome name='heart' color='red' size={32} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <FontAwesome name='heart-o' color='red' size={32} />
                        </TouchableOpacity>
                    }
                
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comments',{id: this.props.id})}>
                    <Text>Agregar comentario</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingHorizontal:0,
        paddingVertical:0,
        alignItems: 'center',
        justifyContent:'space-between',
        marginVertical:6,
        marginHorizontal:10,
        borderWidth:.5,
        borderRadius:10
    },
    subtitle:{
        fontWeight:700,
    },
    image:{
        marginTop: 10,
        marginBottom: 8,
        height: 270,
        width: 270,
        borderRadius: 8,
        alignItems: 'center',
    },
})

export default Post