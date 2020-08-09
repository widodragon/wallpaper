import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TabHeading, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import Header from '../../components/header';
import { getImage } from '../../services/image-service';
import { hp, wp } from '../../utils/responsive';
import { Icon, Badge } from 'native-base';
import GridContent from '../../components/content/grid-content';
import LinearGradient from "react-native-linear-gradient";
import { Colors } from '../../utils';
import ProgressiveImage from '../../components/content/progressive-image';
import * as Animatable from 'react-native-animatable';

export default class Dashboard extends Component {
    constructor(props) {
        super();
        this.state = {
            images: [],
            isLoading: false,
            gridNum: 2,
            horizontal: true,
            isGrid: false
        }
    }

    componentWillMount() {
        this.getImageFromDatabase();
    }

    getImageFromDatabase = async () => {
        this.setState({ isLoading: true });
        try {
            const data = await getImage("dragon ball");
            if (data) {
                this.setState({ images: data.data.hits }, () => {
                    this.setState({ isLoading: false });
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }

    changeGridView = (state) => {
        if (state === 2) {
            this.setState({ gridNum: 2, horizontal: true });
        } else {
            this.setState({ gridNum: 3, horizontal: false });
        }
    }

    goToDetail(item) {
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
                {Header(this.props.navigation.openDrawer)}
                <FlatList
                    data={this.state.images}
                    horizontal={false}
                    numColumns={this.state.gridNum}
                    key={(this.state.horizontal ? 'h' : 'v')}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) =>
                        <Animatable.View animation="zoomInLeft" duration={1000} style={{ margin: hp(0.1), flex: 1 }}>
                            <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                <ProgressiveImage
                                    style={style.imageThumbnail}
                                    thumbnailSource={{ uri: "https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif" }}
                                    source={{ uri: item.largeImageURL }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        </Animatable.View>
                    }
                />
                <TouchableOpacity onPress={() => this.openGrid(!this.state.isGrid)} style={{ alignSelf: "center", justifyContent: "center", alignItems: "center", backgroundColor: "black", height: hp(14), borderRadius: hp(7), position: "absolute", width: hp(14), bottom: hp(8), flexDirection: "row", borderColor: "white", borderWidth: 5, elevation: 10 }}>
                    <Icon name="grid-outline" style={{ color: "white", fontSize: hp(6) }} />
                </TouchableOpacity>
                {
                    this.state.isGrid ?
                        <View>
                            <TouchableWithoutFeedback onPress={() => this.changeGridView(2)}>
                                <Animatable.View animation="slideInLeft" duration={500} style={this.state.gridNum === 2 ? { ...style.gridButtonLeft, backgroundColor: "yellow" } : { ...style.gridButtonLeft, backgroundColor: "grey" }}>
                                    <Text style={{ fontSize: hp(3), color: "white" }}>2</Text>
                                </Animatable.View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.changeGridView(3)}>
                                <Animatable.View animation="slideInRight" duration={500} style={this.state.gridNum === 3 ? { ...style.gridButtonRight, backgroundColor: "yellow" } : { ...style.gridButtonRight, backgroundColor: "grey" }}>
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