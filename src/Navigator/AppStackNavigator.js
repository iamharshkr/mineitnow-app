import React from 'react';
import {StatusBar} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import config from '../../config/config';
import ChangePassword from '../screens/ChangePassword';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AboutScreen from '../screens/dmca/AboutScreen';
import PrivacyScreen from '../screens/dmca/PrivacyScreen';
import TermScreen from '../screens/dmca/TermScreen';

const AppStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={'#15AABF'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: config.ThemeColor,
          },
          headerShown: false,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 18
          },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: config.ThemeColor,
        }}
        initialRouteName="DrawerNavigator">
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen
          options={{
            headerShown: true,
            animation:"slide_from_bottom"
          }}
          name="Change Password"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            animation:"slide_from_right"
          }}
          name="About"
          component={AboutScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            animation:"slide_from_right"
          }}
          name="Privacy Policy"
          component={PrivacyScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            animation:"slide_from_right"
          }}
          name="Terms and Conditions"
          component={TermScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStackNavigator;
