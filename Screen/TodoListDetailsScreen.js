import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import TodoList from '../components/TodoListUI';
import { getTodos } from "../components/todo"
import { TokenContext } from '../Contexte/Context'

export default function TodoListScreen(props) {

    const [token] = useContext(TokenContext)
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchTodos = async () => {
            try {
                const todos = await getTodos(props.route.params.id, token);
                console.log(JSON.stringify(data), props.route.params.id)
                setData(todos);
            } catch (error) {
                console.error("Erreur lors de la récupération des todos : ", error);
            }
        };

        fetchTodos();
    }, [props.route.params.id, token]);

    return (
        <View>
            <TodoList
                data={data}
                listId={props.route.params.id}
            />
        </View>
    );
};