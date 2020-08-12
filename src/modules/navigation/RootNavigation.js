import React from 'react';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import { colors, fonts } from '../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

import PulseScreen from '../pulse/PulseViewContainer';

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Pulse: {
      screen: PulseScreen,
      navigationOptions: () => ({
        title: 'User Profile',
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: colors.black,
        fontFamily: fonts.primaryRegular,
      },
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Icon
              name={'ios-arrow-back'}
              size={25}
              color={colors.black}
            />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
