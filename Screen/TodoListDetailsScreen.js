import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import TodoListUi from '../components/ItemIn/TodoListUi';
import { getTodos } from "../components/API/todo"
import { TokenContext } from '../Contexte/Context'

export default function TodoListScreen(props) {

    const [token] = useContext(TokenContext)
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchTodos = async () => {
            const todos = await getTodos(props.route.params.id, token);
            setData(todos);
        };

        fetchTodos();
    }, [props.route.params.id, token]);

    return (
        <View>
            <TodoListUi
                data={data}
                listId={props.route.params.id}
            />
        </View>
    );
};