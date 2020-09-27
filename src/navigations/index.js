import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from '@react-native-firebase/app';
import { store, persistor } from '../redux/store';
import AppNavigator from './app-navigator';
import { Colors } from '../utils';
const firebaseConfig = {
    apiKey: 'AIzaSyBs_rJMAJM69Dgmfly2UevcJYryAQVWvQM',
    authDomain: 'https://batourapp-2ce8b.firebaseio.com',
    databaseURL: "https://batourapp-2ce8b.firebaseio.com",
    projectId: 'batourapp-2ce8b',
    storageBucket: 'batourapp-2ce8b.appspot.com',
    appId: '1:916893367688:android:973108c5835c68b9324e3d',
};
class RootStack extends Component {
    componentWillMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Provider store={store}>
                    <PersistGate store={store} persistor={persistor}>
                        <StatusBar barStyle="light-content" backgroundColor={Colors.COLOR1} />
                        <AppNavigator />
                    </PersistGate>
                </Provider>
            </SafeAreaView>
        )
    }
}
export default RootStack;