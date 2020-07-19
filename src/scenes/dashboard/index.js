import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={style.body}>
                <Text>Dashboard</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    body:{
        backgroundColor:"red"
    }
});