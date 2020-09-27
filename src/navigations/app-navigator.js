import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import 'react-native-gesture-handler';
import DashboardScreen from '../scenes/dashboard';
import CategoryScreen from '../scenes/category';
import DetailScreen from '../scenes/detail';
import CustomizedDrawer from '../components/navigation/CustomizedDrawer';
import SplashScreen from '../scenes/splash';

const IsSecure = (WrappedComponent) => {
  return class ComponentHelper extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  }
}

export const StackNavigator = createStackNavigator({
  SplashScreen: {
    screen: IsSecure(SplashScreen),
    navigationOptions: {
      headerShown: false
    }
  },
  DashboardScreen: {
    screen: IsSecure(DashboardScreen),
    navigationOptions: {
      headerShown: false
    }
  },
  DetailScreen: {
    screen: IsSecure(DetailScreen),
    navigationOptions: {
      headerShown: false
    }
  },
  CategoryScreen: {
    screen: IsSecure(CategoryScreen),
    navigationOptions: {
      headerShown: false
    }
  }
});

export const DrawerNavigator = createDrawerNavigator({
  "Dashboard": {
    screen: StackNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
  // "Category": {
  //   screen: IsSecure(CategoryScreen),
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
}, {
  hideStatusBar: false,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  contentOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: "#d0d5d9"
  },
  contentComponent: CustomizedDrawer
});

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;