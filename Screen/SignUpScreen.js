import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import styles from '../styles';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import { signUp } from '../components/API/sign';


export default function SignUpScreen({ navigation }) {
    let password = ''
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View style={styles.container} >
                                <TextInput style={styles.input} placeholder='Username' onChangeText={value => setUsername(value)}/>
                                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={value => password = value}/>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => {
                                        signUp(username, password)
                                            .then(token => {
                                                setToken(token)
                                                setUsername(username)
                                                navigation.navigate("SignUp")
                                            })
                                            .catch(error => {
                                                console.error(error)
                                            })
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}