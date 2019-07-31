import React, { Component } from 'react'
import {StatusBar,View,Text,TextInput,Alert,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image} from 'react-native'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import {Icon,Content} from  'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import { URL } from '../../component/Global'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            userId:'',
            password:'',
            passwordInvisible: true,
        }
    }

    handlingForm = async () => {
        if (this.state.userId === '') {
            alert('Please enter your email !')
        } else if (this.state.password === '') {
            alert('Please enter your password !')
        } else {
            try {
                Axios.post(`${URL}login`, {
                    userId: userId,
                    password: password
                })
                .then(res=> {
                    if (res.status===200) {
                        AsyncStorage.setItem('token', res.data.token)
                        .then(()=> {
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                NavigationActions.navigate({ routeName: 'Home' })
                                ],
                            }))
                        })
                        .catch((error)=> {
                            console.log(error)
                        })
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        alert('Wrong Username Or Password')
                    }
                })
            } catch (error) {
                if (error.response.status === 401) {
                    alert('Wrong Username Or Password !')
                } else {
                    alert('Check your network connection !')
                }
            }
        }
    }

    render() {
        return (
            <LinearGradient
            start={{x: 1.5, y: 0.3}}
            end={{x: 0.5, y: 1.4}}
            colors={[
                "#9325bb", "#8a2bbf", "#8031c3", "#7636c7", "#6a3acb", "#5b49d3", 
                "#4a55da", "#3560e0", "#1274e8", "#0086ed", "#0f97ee", "#37a7ee"
            ]}
            style={styles.container} 
            >
                <Content>
                    <View style={styles.content}>
                        <View style={styles.contentItem} >
                            <View style={styles.headerBox}>
                                <Text style={styles.headerText} >LOGIN</Text>
                            </View>
                            <TextInput 
                                placeholder='User ID'
                                placeholderTextColor='white'
                                value={this.state.email}
                                onChangeText={(userId) => this.setState({userId: userId})}
                                style={styles.inputText} />
                            <View style={styles.inputBox2} >
                                <TextInput
                                    style={styles.inputText2}
                                    secureTextEntry= {this.state.passwordInvisible}
                                    placeholder='Password'
                                    placeholderTextColor= 'white'
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({password: text})} />
                                <TouchableOpacity
                                    style={styles.iconBox}
                                    onPress={() => this.setState({passwordInvisible: !this.state.passwordInvisible})}
                                >
                                    <Icon
                                        name={this.state.passwordInvisible === true ? 'eye-with-line': 'eye'}
                                        type='Entypo' style={styles.iconItem} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={()=> this.handlingForm()}
                                style={styles.buttonBox} >
                                <Text style={styles.buttonText} >SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </LinearGradient>
        )
    }
}
