import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import ContactScreen from '../screens/ContactScreen';
import ReferScreen from '../screens/ReferScreen';
import WithdrawScreen from '../screens/WithdrawScreen';

import CustomDrawers from '../layouts/customDrawers';
import HomeScreen from '../screens/HomeScreen';
import config from '../../config/config';
import MoreScreen from '../screens/MoreScreen';
import { useTheme } from 'react-native-paper';
import FaqScreen from '../screens/FaqScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useTheme()
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawers {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: config.ThemeColor,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 18
        },
        drawerStyle:{
          backgroundColor: theme.colors.background
        },
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: config.ThemeColor,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="wallet-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Refer and Earn"
        component={ReferScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="send-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FaqScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="More"
        component={MoreScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
