import React from 'react';
import { FlatList } from 'react-native';

import TodoListStackItem from './TodoListStackItem';

export default function TodoListDetails (props) {
    return (
        <FlatList
            data={props.data}
            renderItem={
                ({ item }) => <TodoListStackItem 
                                item={item}
                                delete={props.delete}
                                navigation={props.navigation}
                                />
            }
        />
    )
}