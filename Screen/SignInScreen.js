import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import styles from '../styles';
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { signIn } from '../components/API/sign'

export default function SignInScreen () {

    let password = ''
    
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
              return <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Username' onChangeText={value => setUsername(value)}/>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={value => password = value}/>
                <TouchableOpacity style={styles.button}
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
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    )
  }