import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import 'react-native-gesture-handler';
import DashboardScreen from '../scenes/dashboard';
import CategoryScreen from '../scenes/category';
import DetailScreen from '../scenes/detail';

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
  DashboardScreen: {
    screen: StackNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
  CategoryScreen: {
    screen: IsSecure(CategoryScreen),
    navigationOptions: {
      headerShown: false
    }
  },
}, {
  hideStatusBar: false,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  },
});

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;