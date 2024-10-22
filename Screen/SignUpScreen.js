import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { TokenContext, UsernameContext } from '../Contexte/Context';

import { signUp } from '../components/sign';


export default function SignUpScreen({ navigation }) {
    let password = ''
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View>
                                <Text>Entrer username ici </Text>
                                <TextInput 
                                  onChangeText={value => setUsername(value)}
                                />
                                <Text>Entrer password ici </Text>
                                <TextInput 
                                  secureTextEntry={true}
                                  onChangeText={value => password = value}
                                />
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