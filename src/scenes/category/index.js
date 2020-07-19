import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Category extends Component {
    render() {
        return (
            <View style={style.body}>
                <Text>Category</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    body:{
        backgroundColor:"red"
    }
});