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
                <TextInput placeholder='Username' onChangeText={value => setUsername(value)}/>
                <TextInput placeholder='Password' secureTextEntry={true} onChangeText={value => password = value}/>
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