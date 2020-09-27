import React, { useEffect, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/responsive';

class OpenSetting extends Component {
    render() {
        console.warn(this.props.status)
        return (
            <View style={this.props.status ? styles.container : "blue"}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: hp(30),
        alignSelf: "center",
        backgroundColor: "grey",
        position: "absolute"
    }
});
export default OpenSetting;