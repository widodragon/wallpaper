import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { Button, Icon } from "native-base";
import { hp } from '../../utils/responsive';
import { Colors } from '../../utils';

function Header(openDrawer) {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.COLOR1, Colors.COLOR2, Colors.COLOR3]} style={style.header}>
            <Button onPress={openDrawer} transparent style={style.button}>
                <Icon name='menu' style={style.menu} />
            </Button>
            <Button transparent style={style.button}>
                <Icon name='settings-outline' style={style.setting} />
            </Button>
        </LinearGradient>
    );
}

const style = StyleSheet.create({
    header: {
        height: hp(8),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: hp(8)
    },
    menu: {
        color: "white",
        fontSize: hp(5)
    },
    setting: {
        color: Colors.COLOR1,
        fontSize: hp(4.1)
    }
});

export default Header;