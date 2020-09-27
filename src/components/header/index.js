import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { Button, Icon } from "native-base";
import { hp, wp } from '../../utils/responsive';
import { Colors, Common, Typography } from '../../utils';
import { COLOR1 } from '../../utils/colors';

function Header(openDrawer, openSetting, state, isSetting = true) {
    openLink = async () =>{
        await Linking.openURL(Typography.PLAYSTORE_URL);
    }
    return (
        <View>
            <View style={style.header}>
                <Button onPress={openDrawer} transparent style={style.button}>
                    <Icon name='menu' style={style.menu} />
                    <Text style={style.title}>{Common.TITLE}</Text>
                </Button>
                {
                    isSetting ?
                        <Button onPress={() => openSetting(!state)} transparent style={style.button}>
                            <Icon name='settings-outline' style={style.setting} />
                        </Button> : null
                }
            </View>
            {
                state ?
                    <View style={style.modal_setting}>
                        <TouchableOpacity onPress={() => openSetting(!state)}
                            style={{ position: "absolute", top: hp(2), right: wp(2), width: hp(6), height: hp(6), borderRadius: hp(3), backgroundColor: "rgba(52, 52, 52, 0.8)", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="close" style={{ fontSize: hp(5), color: "black" }} />
                        </TouchableOpacity>
                        <View style={{ margin: wp(5), marginTop: hp(10) }}>
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: hp(3), textAlign: "center" }}>
                                This application was made by Zoraz Studio, Please provide input by rating the application by pressing the button below!
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.openLink()} style={{ width: wp(30), justifyContent:"center", paddingBottom:hp(0.3), alignItems:"center", alignSelf:"center", height: hp(5), backgroundColor: "blue", borderRadius:hp(1) }}>
                            <Text style={{ fontSize: hp(3), color: "white", fontWeight:"bold" }}>RATING</Text>
                        </TouchableOpacity>
                    </View> : null
            }
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        height: hp(8),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: COLOR1
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: hp(8)
    },
    menu: {
        color: "white",
        fontSize: hp(4.3)
    },
    setting: {
        color: "white",
        fontSize: hp(3.5)
    },
    title: {
        marginLeft: wp(-1),
        fontSize: hp(2.5),
        fontWeight: "bold",
        color: "white"
    },
    modal_setting: {
        position: "absolute",
        width: "80%",
        alignSelf: "center",
        height: hp(50),
        borderRadius: 10,
        top: hp(20),
        backgroundColor: "white",
        zIndex: 100
    }
});

export default Header;