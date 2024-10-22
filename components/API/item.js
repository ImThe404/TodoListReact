import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';

export default function Item (props) {
    return (
        <View>
            <Text>{props.title}</Text>
            <TouchableOpacity onPress={() => {
                props.delete()
            }}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    );
};