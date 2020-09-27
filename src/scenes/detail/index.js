import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import Toast from 'react-native-simple-toast';
import { Icon, Spinner } from 'native-base';
import Share from 'react-native-share';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import ProgressiveBackground from '../../components/content/progressive-background';
import { RewardedAd, RewardedAdEventType, TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { setIncrementBanner } from "../../redux/actions/common";
import { connect } from "react-redux";
import { Typography } from '../../utils';
import { keywords } from '../../assets/data/data';

const adUnitId = __DEV__ ? TestIds.REWARDED : Typography.REWARD_AD;
const adUnitIdBanner = __DEV__ ? TestIds.BANNER : Typography.BANNER_AD;
class Detail extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {
        if (Number(this.props.increment) === 3) {
            this.props.dispatch(setIncrementBanner(0));
        } else {
            this.props.dispatch(setIncrementBanner(this.props.increment + 1));
        }
    }
    componentWillUnmount() {
        let rewardAd = RewardedAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: keywords,
        });
        let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewardAd.show();
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                alert('Earned +', reward);
            }
        });
        if (this.props.increment === 3) {
            rewardAd.load();
        }
    }
    goToShare = (item) => {
        const shareOptions = {
            title: 'Special image for you!',
            message: `Please open this ${item}!`
        };

        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    _callback = res => {
        this.setState({ isLoading: false });
        Toast.showWithGravity('Success to set wallpaper in your device!', Toast.LONG, Toast.TOP);
    };

    _setWallpaper = (item) => {
        this.setState({ isLoading: true });
        try {
            ManageWallpaper.setWallpaper(
                {
                    uri: item,
                },
                this._callback,
                TYPE.HOME,
            );
        } catch (error) {
            this.setState({
                isLoading: false
            })
        }
    };

    render() {
        let { url } = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ProgressiveBackground
                    source={{ uri: url ? url : "" }}
                    style={{ flex: 1 }}
                    thumbnailSource={require('../../assets/images/loading.png')}
                    resizeMode="stretch">
                    {
                        this.state.isLoading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Spinner color='blue' size={hp(10)} />
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: "transparant", justifyContent: "center", alignItems: "center", width: "95%", alignSelf: "center", height: "60%", marginTop: hp(15), borderRadius: 20, elevation: 50, borderWidth: hp(0.03) }}>
                                    <Image source={{ uri: url ? url : "" }} style={{ width: "100%", height: "100%", borderRadius: 20 }} resizeMode="cover" />
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: wp(15), position: "absolute", top: hp(4), justifyContent: "center", alignItems: "center", height: hp(10) }}>
                                    <Icon name="arrow-back-outline" style={{ color: "white", elevation: 10, fontSize: hp(5) }} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", width: "100%", height: hp(18), justifyContent: "center", alignItems: "center", position: "absolute", bottom: hp(5) }}>
                                    <TouchableOpacity onPress={() => this._setWallpaper(url)} style={{ backgroundColor: "transparent", borderColor: "red", justifyContent: "center", alignItems: "center", borderWidth: 0.1, elevation: 10, width: hp(14), height: hp(14), borderRadius: hp(7) }}>
                                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.8)", borderColor: "red", borderWidth: 0.1, elevation: 10, width: hp(12), height: hp(12), borderRadius: hp(6) }}>
                                            <Icon name="add-circle-outline" style={{ color: "white", fontSize: hp(7.5) }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: wp(1) }} />
                                    <TouchableOpacity onPress={() => this.goToShare(url)} style={{ backgroundColor: "transparent", borderColor: "red", justifyContent: "center", alignItems: "center", borderWidth: 0.1, elevation: 10, width: hp(14), height: hp(14), borderRadius: hp(7) }}>
                                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.8)", borderColor: "red", borderWidth: 0.1, elevation: 10, width: hp(12), height: hp(12), borderRadius: hp(6) }}>
                                            <Icon name="share-social-outline" style={{ color: "white", fontSize: hp(5.8) }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "auto" }}>
                                    <BannerAd
                                        unitId={adUnitIdBanner}
                                        size={BannerAdSize.FULL_BANNER}
                                        requestOptions={{
                                            requestNonPersonalizedAdsOnly: true,
                                        }}
                                    />
                                </View>
                            </View>
                    }
                </ProgressiveBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    let { increment } = state.common;
    return {
        increment: increment
    }
}


export default connect(mapStateToProps)(Detail)