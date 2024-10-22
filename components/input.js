import React, { useState, useContext } from "react";
import { View, TextInput, Button } from "react-native";

import { UsernameContext, TokenContext } from "../Contexte/Context";
import { createTodoList } from "./todoListAPI";

export default function Input() {
    const [name, setName] = useState('')
    const [token] = useContext(TokenContext)
    const [username] = useContext(UsernameContext)
    return (
        <View>
            <TextInput
                onChangeText={value => setName(value)}
            />
            <Button
                title="Créer TodoList"
                onPress={() => {
                    createTodoList(username, name, token)
                }}
            />
        </View>
    )
}