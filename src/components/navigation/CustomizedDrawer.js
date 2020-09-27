import React, { useContext, createContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import { Icon } from 'native-base';
import { COLOR1 } from '../../utils/colors';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { Typography } from '../../utils';

const adUnitId = __DEV__ ? TestIds.BANNER : Typography.BANNER_AD;
const BlueContext = createContext(true);
const iconName = [
    {
        id: 0,
        name: "home-outline"
    },
    {
        id: 1,
        name: "leaf-outline"
    }
]
const CustomizedDrawer = props => {
    const { blue, setBlue } = useContext(BlueContext);
    const textColor = blue ? 'blue' : 'red';
    useEffect(() => {
        console.log(props)
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLOR1 }}>
            <View style={{ backgroundColor: "#8697a6", width: "100%", height: hp(20), justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../assets/images/icon.png")} style={{ height: hp(10), width: hp(10) }} resizeMode="cover" />
            </View>
            {
                props.items.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate(item.key)} key={index} style={
                            {
                                backgroundColor: props.activeItemKey === item.key ? props.activeBackgroundColor : null,
                                height: hp(8),
                                width: "100%",
                                alignItems: "center",
                                paddingLeft: wp(5),
                                flexDirection: "row",
                                elevation: 0.5,
                                borderWidth: hp(0.01)
                            }
                        }>
                            {
                                iconName.map((data, j) => {
                                    if (index === data.id) {
                                        return (
                                            <Icon key={j} name={data.name} style={{ color: props.activeItemKey === item.key ? props.activeTintColor : "white", fontSize: hp(2.5), marginRight: wp(3) }} />
                                        )
                                    }
                                })
                            }
                            <Text style={{ fontSize: hp(2.5), color: props.activeItemKey === item.key ? props.activeTintColor : "white" }}>{item.key}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={{ flex: 1, paddingRight: wp(45.5), marginTop: hp(1) }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    );
};
export default CustomizedDrawer;