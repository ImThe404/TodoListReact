import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import TodoList from '../components/TodoListUI';
import { getTodos } from "../components/todo"
import { TokenContext, UsernameContext } from '../Contexte/Context'

export default function TodoListScreen(props) {

    console.log(JSON.stringify(props))
    console.log(props.route.params.id)

    const [data, setData] = useState(null);

     // Créer une fonction asynchrone
    useEffect (() => {
        const Todos = async () => {
            setData( await getTodos(props.route.params.id, TokenContext) )
        };

        Todos();
    }, []);

    return (
        <View>
            <TodoList
                data={data}
            />
        </View>
    );
};