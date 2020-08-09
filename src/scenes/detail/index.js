import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import Toast from 'react-native-simple-toast';
import { Icon, Spinner } from 'native-base';
import Share from 'react-native-share';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import ProgressiveBackground from '../../components/content/progressive-background';

export default class Detail extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: false
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
        let { largeImageURL } = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ProgressiveBackground
                    source={{ uri: largeImageURL ? largeImageURL : "" }}
                    style={{ flex: 1 }}
                    thumbnailSource={{uri:"https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"}}
                    resizeMode="stretch">
                    {
                        this.state.isLoading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Spinner color='blue' size={hp(10)} />
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: wp(15), position: "absolute", top: hp(4), justifyContent: "center", alignItems: "center", height: hp(10) }}>
                                    <Icon name="arrow-back-outline" style={{ color: "white", elevation: 10, fontSize: hp(5) }} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", width: "100%", height: hp(18), justifyContent: "center", alignItems: "center", position: "absolute", bottom: hp(5) }}>
                                    <TouchableOpacity onPress={() => this._setWallpaper(largeImageURL)} style={{ backgroundColor: "transparent", borderColor: "red", justifyContent: "center", alignItems: "center", borderWidth: 0.1, elevation: 10, width: hp(14), height: hp(14), borderRadius: hp(7) }}>
                                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.8)", borderColor: "red", borderWidth: 0.1, elevation: 10, width: hp(12), height: hp(12), borderRadius: hp(6) }}>
                                            <Icon name="add-circle-outline" style={{ color: "white", fontSize: hp(7.5) }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: wp(1) }} />
                                    <TouchableOpacity onPress={() => this.goToShare(largeImageURL)} style={{ backgroundColor: "transparent", borderColor: "red", justifyContent: "center", alignItems: "center", borderWidth: 0.1, elevation: 10, width: hp(14), height: hp(14), borderRadius: hp(7) }}>
                                        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "rgba(52, 52, 52, 0.8)", borderColor: "red", borderWidth: 0.1, elevation: 10, width: hp(12), height: hp(12), borderRadius: hp(6) }}>
                                            <Icon name="share-social-outline" style={{ color: "white", fontSize: hp(5.8) }} />
                                        </View>
                                    </TouchableOpacity>
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