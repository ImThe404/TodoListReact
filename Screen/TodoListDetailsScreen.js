import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import TodoList from '../components/TodoListUI';
import { getTodos } from "../components/todo"
import { TokenContext } from '../Contexte/Context'

export default function TodoListScreen(props) {

    console.log(JSON.stringify(props))
    console.log(props.route.params.id)

    const [token] = useContext(TokenContext)
    const [data, setData] = useState([]);

     // Créer une fonction asynchrone
     console.log("avant")
    useEffect (() => {
        const fetchTodos = async () => {
            try {
                const todos = await getTodos(props.route.params.id, token);
                setData(todos);
            } catch (error) {
                console.error("Erreur lors de la récupération des todos : ", error);
            }
        };

        fetchTodos();
    }, [props.route.params.id, token]);
    console.log("apres")

    return (
        <View>
            <TodoList
                data={data}
            />
        </View>
    );
};