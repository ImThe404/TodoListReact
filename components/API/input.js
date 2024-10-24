import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { UsernameContext, TokenContext } from "../../Contexte/Context";
import { createTodoList } from "./todoListAPI";
import styles from "../../styles";

export default function Input(props) {
    const [name, setName] = useState('')
    const [token] = useContext(TokenContext)
    const [username] = useContext(UsernameContext)
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="New list name"
                onChangeText={setName}
                value={name}
            />
            <TouchableOpacity style={styles.button}
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
            >
                <Text style={styles.buttonText}>Créer TodoList</Text>
            </TouchableOpacity>
        </View>
    )
}