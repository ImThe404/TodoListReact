import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import TodoItem from './TodoItem';

export default function TodoList(props){
    const [todos, setTodos] = useState(props.data)
    const [count, setCount] = useState(props.data.filter((item)=>item.done).length);
    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('');

    const change = (idTodo, state) => {
        todos.find((item) => item.id === id).done = state
        if (state) {
            setCount(doneCount + 1)
        } else {
            setCount(doneCount - 1)
        }
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter((item) => item.id != id)
        setTodos(newTodos)
        setCount(newTodos.filter((item) => item.done).length)
    }

    const addNewTodo = () => {
        if (newTodoText === '') return
        //createTodo(newTodoText, Math.max(...todos.map(item => item.id)) + 1, )
        setTodos([...todos, {id: Math.max(...todos.map(item => item.id)) + 1,
            content: newTodoText,
            done: false }])
        setTodoText("")
    }

    const filterTodos = () => {
        switch (todosFilter) {
            case 'done':
                return todos.filter(item => item.done)
            case 'undone':
                return todos.filter(item => !item.done)
            default:
                return todos
    }}

    const setDoneState = (value) => {
        setTodos(todos.map(element => {
            element.done = value;
            return item
        }));
        setCount(value ? todos.length : 0)
    }

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
            <Text>{"Done : "}{doneCount}</Text>
        </View>
    )
}