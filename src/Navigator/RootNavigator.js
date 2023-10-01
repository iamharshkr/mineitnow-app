import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../screens/ForgotPassword';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import TermScreen from '../screens/dmca/TermScreen';
import config from '../../config/config';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: config.ThemeColor,
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 18
          },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: config.ThemeColor,
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Terms and Conditions" component={TermScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
