// ProgressiveImage.js
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { hp, wp } from '../../utils/responsive';
class ProgressiveBackground extends React.Component {
    render() {
        const {
            thumbnailSource,
            source,
            style,
            ...props
        } = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground
                    {...props}
                    source={thumbnailSource}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />
                <ImageBackground
                    {...props}
                    source={source}
                    style={styles.imageOverlay}
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
export default ProgressiveBackground;