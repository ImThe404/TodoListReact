import React, { useState, setError, useForm } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import { TokenContext, UsernameContext } from '../Contexte/Context'

import { signIn } from '../components/sign'

export default function SignInScreen () {

    let password = ''
    
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
              return <View>
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
                  title="Sign In"
                  onPress={() => {
                    signIn(username, password)
                      .then(token => {
                        setToken(token)
                        setUsername(username)
                      })
                      .catch(error => {
                        console.error(error.message) 
                      })
                    }
                  }
                />
              </View>
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    )
  }