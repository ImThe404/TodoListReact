import React, { useState, useContext } from "react";
import { View, TextInput, Button } from "react-native";

import { UsernameContext, TokenContext } from "../../Contexte/Context";
import { createTodoList } from "./todoListAPI";

export default function Input(props) {
    const [name, setName] = useState('')
    const [token] = useContext(TokenContext)
    const [username] = useContext(UsernameContext)
    return (
        <View>
            <TextInput
                placeholder="New list name"
                onChangeText={setName}
                value={name}
            />
            <Button
                title="Créer TodoList"
                onPress={async () => {
                    try {
                        const res = await createTodoList(username, name, token);
                        if (res.id) {
                            props.refresh(res);
                            setName("");
                        } else {
                            console.error("API response came back incorrect :", res);
                        }
                    } catch (error) {
                        console.error("Error creating todoList :", error);
                    }
                }}
            />
        </View>
    )
}