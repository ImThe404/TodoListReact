import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';
import { TokenContext } from '../../Contexte/Context'
import ProgressBar from './progressBar';
import { createTodo, updateTodo, deleteTodo} from '../API/todo'

import TodoItem from './TodoItem';

export default function TodoListUi(props){
    const [todos, setTodos] = useState(props.data)
    const [count, setCount] = useState(todos.filter((item)=>item.done).length);
    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('');
    const [token] = useContext(TokenContext)

    useEffect(() => {
        setTodos(props.data)
        setCount(props.data.filter((item)=>item.done).length)
    }, [props.data])

    // Server interacting functions
    const addNewTodo = async () => {
        if (newTodoText === '') return
        try {
            const res = await createTodo(newTodoText, props.listId, token);
            if (res.id) {
                setTodos([...todos, res]);
                setTodoText("");
            } else {
                console.error("API response came back incorrect :", res);
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }
    
    const change = (idTodo, state) => {
        updateTodo(idTodo, state, token)
        todos.find((item) => item.id === idTodo).done = state
        if (state) {
            setCount(count + 1)
        } else {
            setCount(count - 1)
        }
    }

    const delTodo = (id) => {
        const newTodos = todos.filter((item) => item.id != id)
        deleteTodo(id, token)
        setTodos(newTodos)
        setCount(newTodos.filter((item) => item.done).length)
    }

    const setDoneState = (value) => {
        setTodos(todos.map(element => {
            change(element.id, value)
            return element
        }));
        setCount(value ? todos.length : 0)
    }

    // Client side functions
    const filterTodos = () => {
        switch (todosFilter) {
            case 'done':
                return todos.filter(item => item.done)
            case 'undone':
                return todos.filter(item => !item.done)
            default:
                return todos
    }}

    return (
        <View>
            <ProgressBar progressVal={((count/todos.length)*100).toFixed(0)}/>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={filterTodos()}
                renderItem={({item}) => <TodoItem item={item} change={change} deleteTodo={delTodo}/>}/>
            <Text>Nombre d'action fini : {count}</Text>
            <TextInput
                onChangeText={setTodoText}
                placeholder='TYPE HERE'
                onSubmitEditing={addNewTodo}
                value={newTodoText}
            />
            <Button title='Nouveau Todo' onPress={() => addNewTodo()} />
            <Button title='Afficher Tout' onPress={() => setTodosFilter('')} />
            <Button title='Afficher DONE' onPress={() => setTodosFilter('done')} />
            <Button title='Afficher unDONE' onPress={() => setTodosFilter('undone')}/>
            <Button title='Tout cocher' onPress={() => setDoneState(true)} />
            <Button title='Tout Décocher' onPress={() => setDoneState(false)} />
        </View>
    )
}