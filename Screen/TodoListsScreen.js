import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { UsernameContext, TokenContext } from '../Contexte/Context';
import { getTodoLists, deleteTodoList }  from '../components/API/todoListAPI';

import Input from '../components/API/input';
import TodoListDetails from '../components/ItemOut/TodoListStack'

export default function TodoListScreen({ navigation }) {
    const [token] = useContext(TokenContext);
    const [username] = useContext(UsernameContext);
    const [todoLists, setTodolists] = useState([]);

    useEffect (() => {
        getTodoLists(username, token)
            .then(todolists => setTodolists(todolists))
            .catch(err => console.error(err.message));
    });

    const deleteTodoListS = (id) => {
        setTodolists(todoLists.filter(todoList => todoList.id !== id));
        deleteTodoList(id, token)
            .catch(err => console.error(err.message));
    };

    return (
        <View >
            <TodoListDetails
                data={todoLists}
                delete={deleteTodoListS}
                navigation={navigation}
            />
            <Input/>
        </View>
    );
};