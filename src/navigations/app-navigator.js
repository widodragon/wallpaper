import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DashboardScreen from '../scenes/dashboard';
import CategoryScreen from '../scenes/category';


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

const StackNavigator = createStackNavigator({
  DashboardScreen: {
    screen: IsSecure(DashboardScreen),
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
});

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;