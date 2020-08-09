import React, { Component } from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { hp } from '../../utils/responsive';

class GridContent extends Component {
    render() {
        return (
            <FlatList
                data={this.props.images}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={{ margin: hp(0.5), flex: 1 }}>
                        <Image style={style.imageThumbnail} source={{ uri: item.largeImageURL }} resizeMode="cover" />
                    </View>
                }
            />
        );
    }
}

const style = StyleSheet.create({
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(30)
    }
});
export default GridContent;