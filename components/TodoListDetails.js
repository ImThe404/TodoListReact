import React from 'react';
import { FlatList } from 'react-native';

import TodoListItem from './TodoListItem';

export default function TodoListDetails (props) {
    return (
        <FlatList
            data={props.data}
            renderItem={
                ({ item }) => <TodoListItem 
                                item={item}
                                delete={props.delete}
                                navigation={props.navigation}
                                />
            }
        />
    )
}