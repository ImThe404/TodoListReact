import React from 'react';
import { View } from 'react-native';

import TodoList from '../components/TodoListUI';

export default function TodoListScreen(props) {
    return (
        <View>
            <TodoList
                data={props.data}
            />
        </View>
    );
};