import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import Header from '../../components/header';
import { hp, wp } from '../../utils/responsive';
import { Icon } from 'native-base';
import { Typography } from '../../utils';
import ProgressiveImage from '../../components/content/progressive-image';
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { data, keywords } from "../../assets/data/data.js";
import { connect } from "react-redux";

const adUnitId = __DEV__ ? TestIds.BANNER : Typography.BANNER_AD;
const adUnitIdInterstitial = __DEV__ ? TestIds.INTERSTITIAL : Typography.INTERSTITIAL_AD;

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords,
});

class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            images: [],
            isLoading: false,
            gridNum: 2,
            horizontal: true,
            isGrid: false,
            setting: false,
            loaded: false
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            const eventListener = interstitial.onAdEvent(type => {
                if (type === AdEventType.LOADED) {
                    this.setState({ loaded: true });
                }
            });
            interstitial.load();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    changeGridView = (state) => {
        if (state === 2) {
            this.setState({ gridNum: 2, horizontal: true });
        } else {
            this.setState({ gridNum: 3, horizontal: false });
        }
    }

    goToDetail(item) {
        if (this.state.loaded) {
            if (this.props.increment === 0) {
                interstitial.show();
            }
        }
        this.props.navigation.navigate("DetailScreen", {
            item: item
        });
    }

    openGrid(value) {
        this.setState({ isGrid: value });
    }

    render() {
        return (
            <View style={style.container}>
                {Header(this.props.navigation.openDrawer, (state) => this.setState({ setting: state }), this.state.setting)}
                <View style={{ height: "100%" }}>
                    <HeaderImageScrollView
                        maxHeight={200}
                        minHeight={0}
                        headerImage={require("../../assets/images/header.jpeg")}
                        renderForeground={() => (
                            <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                            </View>
                        )}
                    >
                        <View style={{ height: "auto", marginTop: hp(3) }}>
                            <TriggeringView onHide={() => console.log("text hidden")}>
                                <FlatList
                                    data={data}
                                    horizontal={false}
                                    style={{ marginTop: hp(-3), marginBottom: hp(9) }}
                                    numColumns={this.state.gridNum}
                                    key={(this.state.horizontal ? 'h' : 'v')}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    renderItem={({ item }) =>
                                        <View style={{ margin: hp(0.1), flex: 1 }}>
                                            <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                                <ProgressiveImage
                                                    style={style.imageThumbnail}
                                                    thumbnailSource={require('../../assets/images/loading.png')}
                                                    source={{ uri: item.url }}
                                                    resizeMode="cover"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </TriggeringView>
                        </View>
                    </HeaderImageScrollView>
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
                <TouchableOpacity onPress={() => this.openGrid(!this.state.isGrid)} style={{ alignSelf: "center", justifyContent: "center", alignItems: "center", backgroundColor: "black", height: hp(14), borderRadius: hp(7), position: "absolute", width: hp(14), bottom: hp(8), flexDirection: "row", borderColor: "white", borderWidth: 5, elevation: 10 }}>
                    <Icon name="grid-outline" style={{ color: "white", fontSize: hp(6) }} />
                </TouchableOpacity>
                {
                    this.state.isGrid ?
                        <View>
                            <TouchableWithoutFeedback onPress={() => this.changeGridView(2)}>
                                <Animatable.View animation="zoomInDown" duration={3000} style={this.state.gridNum === 2 ? { ...style.gridButtonLeft, backgroundColor: "yellow" } : { ...style.gridButtonLeft, backgroundColor: "grey" }}>
                                    <Text style={{ fontSize: hp(3), color: "white" }}>2</Text>
                                </Animatable.View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.changeGridView(3)}>
                                <Animatable.View animation="zoomInUp" duration={3000} style={this.state.gridNum === 3 ? { ...style.gridButtonRight, backgroundColor: "yellow" } : { ...style.gridButtonRight, backgroundColor: "grey" }}>
                                    <Text style={{ fontSize: hp(3), color: "white" }}>3</Text>
                                </Animatable.View>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
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

const mapStateToProps = (state) => {
    let { increment } = state.common;
    return {
        increment: increment
    }
}
export default connect(mapStateToProps)(Dashboard)