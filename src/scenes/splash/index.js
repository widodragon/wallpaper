import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TabHeading, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../utils';
import { StackActions, NavigationActions } from 'react-navigation';

class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'DashboardScreen' })],
            });
            this.props.navigation.dispatch(resetAction);
        }, 2000);
    }
    render() {
        return (
            <View style={style.container}>
                <Animatable.View animation="jello" iterationCount={2}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: hp(20), height: hp(20) }} resizeMode="center" />
                </Animatable.View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.COLOR1,
        justifyContent: "center",
        alignItems: "center"
    }
});



export default Splash