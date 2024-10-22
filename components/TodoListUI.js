import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';
import { TokenContext } from '../Contexte/Context'
import './todo'

import TodoItem from './TodoItem';

export default function TodoList(props){

    const [todos, setTodos] = useState([])
    const [count, setCount] = useState(0);

    useEffect( () => {
        setTodos(props.data)
    },[props.data])
    
    setCount(todos.filter((item)=>item.done).length);

    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('');
    const [token] = useContext(TokenContext)


    // Server interacting functions
    const addNewTodo = () => {
        if (newTodoText === '') return
        createTodo(newTodoText, Math.max(...todos.map(item => item.id)) + 1, token)
        setTodos([...todos, {id: Math.max(...todos.map(item => item.id)) + 1,
            content: newTodoText,
            done: false }])
        setTodoText("")
    }

    
    const change = (idTodo, state) => {
        updateTodo(idTodo, state, token)
        todos.find((item) => item.id === id).done = state
        if (state) {
            setCount(count + 1)
        } else {
            setCount(count - 1)
        }
    }

    const deleteTodo = (id) => {
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
            <FlatList
                style={{ paddingLeft: 10 }}
                data={filterTodos()}
                renderItem={({item}) => <TodoItem item={item} change={change} deleteTodo={deleteTodo}/>} />
            <Text>Nombre d'action fini : {count}</Text>
            <TextInput
                onChangeText={setTodoText}
                placeholder='TYPE HERE'
                onSubmitEditing={addNewTodo}
                value={newTodoText}
            />
            <Button title='Nouveau Todo' onPress={() => addNewTodo()} />
            <Button title='Afficher Tout' onPress={setTodosFilter('')} />
            <Button title='Afficher DONE' onPress={setTodosFilter('done')} />
            <Button title='Afficher unDONE' onPress={setTodosFilter('undone')}/>
            <Button title='Tout cocher' onPress={() => setDoneState(true)} />
            <Button title='Tout Décocher' onPress={() => setDoneState(false)} />
            <Text>{"Done : "}{count}</Text>
        </View>
    )
}