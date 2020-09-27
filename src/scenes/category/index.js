import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TabHeading, TouchableWithoutFeedback, FlatList, ImageBackground } from 'react-native';
import Header from '../../components/header';
import { hp, wp } from '../../utils/responsive';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9804721901768342~5315570278';
export default class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            images: [],
            isLoading: false,
            gridNum: 2,
            horizontal: true,
            isGrid: false,
            setting: false,
            category: [
                {
                    id: 1,
                    name: "FAVORITE",
                    color: "#011836"
                },
                {
                    id: 2,
                    name: "NEWEST",
                    color: "#67a0eb"
                }
            ]
        }
    }

    goToElement = (item) => {
  
    }
    render() {
        return (
            <View style={style.container}>
                {Header(this.props.navigation.openDrawer, (state) => this.setState({ setting: state }), this.state.setting, false)}
                <View>
                    <FlatList
                        data={this.state.category}
                        horizontal={false}
                        style={{ marginTop: hp(-3), marginLeft: wp(1), marginRight: wp(1), zIndex: 0 }}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View style={{ margin: hp(0.1), flex: 1 }}>
                                <TouchableOpacity onPress={() => this.goToElement(item)} style={{ width: "100%", height: hp(30), borderRadius: hp(1), elevation: 2, marginBottom: hp(0.1), borderColor: "grey", borderWidth: hp(0.01), backgroundColor: item.color }}>
                                    <View style={{ width: "100%", borderRadius: hp(1), height: hp(30), justifyContent: "center", alignItems: "center" }} resizeMode="stretch">
                                        <Text style={{ fontSize: hp(5), elevation: 10, color: "white", fontWeight: "bold" }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "auto" }}>
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
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(30)
    },
    gridButtonLeft: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        height: hp(8),
        borderRadius: hp(4),
        position: "absolute",
        width: hp(8),
        bottom: hp(11.5),
        left: wp(20),
        flexDirection: "row",
        borderColor: "white",
        borderWidth: 5,
        elevation: 10
    },
    gridButtonRight: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        height: hp(8),
        borderRadius: hp(4),
        position: "absolute",
        width: hp(8),
        bottom: hp(11.5),
        right: wp(20),
        flexDirection: "row",
        borderColor: "white",
        borderWidth: 5,
        elevation: 10
    }
});