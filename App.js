import React, { Component } from 'react';
import {  createAppContainer,createStackNavigator } from 'react-navigation';
import ReposScreen from './src/screens/ReposScreen';
import DetailsScreen from './src/screens/DetailsScreen';
// import { createStackNavigator } from 'react-navigation-stack';
// import 'react-native/jest/setup';

const RootStack = createStackNavigator(
  { 
    Repos: {
      screen: ReposScreen,
      navigationOptions: {
        title: 'ReposList',
        headerTintColor: '#47525E',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        title: 'StargazersList',
        headerTintColor: '#47525E',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    },
    // Repos: ReposScreen,
    // Details: DetailsScreen,
  },
  {
    initialRouteName: 'Repos',
  }
)
export default App = createAppContainer(RootStack);