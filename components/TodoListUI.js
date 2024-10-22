import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import TodoItem from './TodoItem';

export default function TodoList(props){

    const [count, setCount] = useState(props.data.filter((item)=>item.done).length);
    const [todos, setTodos] = useState(props.data)
    const [todos2, setTodos2] = useState(props.data)
    const [newTodoText, setTodoText] = useState("")

    const change = (idTodo, state) => {
        todos.forEach(element => {
            if (element.id == idTodo) {
                element.done = state
            }
        });
        todos2.forEach(element => {
            if (element.id == idTodo) {
                element.done = state
            }
        });
        setCount(todos.filter((item)=>item.done).length)
    }
    const deleteTodo = (id) => {
        const newTodos = todos.filter(item => item.id != id)
        setTodos(newTodos)
        setTodos2(newTodos)
        setCount(newTodos.filter(item => item.done).length)
    }
    const setNewTodoText = (text) => setTodoText(text)
    const addNewTodo = () => {
        if ( newTodoText != "") {
            setTodos([...todos, {   id: Math.max(...todos.map(item => item.id)) + 1,
                content: newTodoText,
                done: false }])
            setTodos2([...todos, {   id: Math.max(...todos.map(item => item.id)) + 1,
                content: newTodoText,
                done: false }])
            setNewTodoText("")
        }
    }
    const showALL = () => {
        setTodos(todos2)
    }
    const showDone = () => {
        const newTodos = todos2.filter(item => item.done == true)
        setTodos(newTodos)
    }
    const showUndone = () => {
        const newTodos = todos2.filter(item => item.done == false)
        setTodos(newTodos)
    }
    const cocheALL = () => {
        todos2.forEach(element => {
            element.done = true;
            console.log(element)
        });
        setCount(todos2.length)
    }
    const unCocheALL = () => {
        todos2.forEach(element => {
            element.done = false;
            console.log(element)
        });
        setCount(0)
    }

    return (
        <View>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={todos}
                renderItem={({item}) => <TodoItem item={item} change={change} deleteTodo={deleteTodo}/>} />
            <Text>Nombre d'action fini : {count}</Text>
            <TextInput
                onChangeText={setNewTodoText}
                placeholder='TYPE HERE'
                onSubmitEditing={addNewTodo}
                value={newTodoText}
            />
            <Button title='Nouveau Todo' onPress={() => addNewTodo()} />
            <Button title='Afficher Tout' onPress={showALL} />
            <Button title='Afficher DONE' onPress={showDone} />
            <Button title='Afficher unDONE' onPress={showUndone} />
            <Button title='Tout cocher' onPress={cocheALL} />
            <Button title='Tout Décocher' onPress={unCocheALL} />
        </View>
    )
}