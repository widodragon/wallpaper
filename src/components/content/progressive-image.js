// ProgressiveImage.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { hp, wp } from '../../utils/responsive';
import { Spinner } from "native-base"
class ProgressiveImage extends React.Component {
    render() {
        const {
            thumbnailSource,
            source,
            style,
            ...props
        } = this.props;
        return (
            <View style={styles.container}>
                <Spinner style={{ width: "100%", height: hp(30) }} color="red" />
                <Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, style]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});
export default ProgressiveImage;