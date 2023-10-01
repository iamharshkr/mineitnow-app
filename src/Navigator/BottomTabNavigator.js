import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen'
import ReferScreen from '../screens/ReferScreen'
import ContactScreen from '../screens/ContactScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={false}
      inactiveColor="#18415c"
      activeColor='#fff'
      barStyle={{ backgroundColor: '#15AABF' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home-account'
        }}
      />
      <Tab.Screen
        name="Refer"
        component={ReferScreen}
        options={{
          tabBarIcon: 'share',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: 'message-text-outline',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;