import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
                            <View>
                                <TextInput placeholder='Username' onChangeText={value => setUsername(value)}/>
                                <TextInput placeholder='Password' secureTextEntry={true} onChangeText={value => password = value}/>
                                <Button
                                    title="Sign Up"
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
                                />
                            </View>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}