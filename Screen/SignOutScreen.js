import React from 'react'
import { View, Text, Button } from 'react-native'

import { TokenContext, UsernameContext } from '../Contexte/Context'

export default function SignOutScreen ({ navigation, route }) {
  return <TokenContext.Consumer>
    {([token, setToken]) => (
      <UsernameContext.Consumer>
        {([username, setUsername]) => {
          return (
            <View>
              <Button
                title="Sign Out" onPress={() => {
                      setUsername(null)
                      setToken(null)
                }} />
            </View>
          )
        }}
      </UsernameContext.Consumer>
    )}
  </TokenContext.Consumer>
}