import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../actions/userActions';
import {showToast} from './alert';
import config from '../../config/config';
import {Avatar, useTheme} from 'react-native-paper';
import onShare from './share';

const CustomDrawers = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {minedCoins} = useSelector(state => state.minedCoins);
  const logoutSubmit = () => {
    dispatch(logout());
    showToast('logged out successfully.');
  };
  const avatarName = name => {
    var matches = name.match(/\b(\w)/g);
    var acronym = matches.join('');
    return acronym.toUpperCase();
  };
  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: config.ThemeColor}}>
        <ImageBackground
          source={require('../images/bg.jpeg')}
          style={{padding: 20}}>
          <Avatar.Text
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
              fontSize: 50,
            }}
            label={avatarName(user.name)}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {user.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              {minedCoins
                ? minedCoins.toFixed(5)
                : parseFloat(user.coins).toFixed(5)}{' '}
              Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingTop: 10,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => onShare(user.userId)}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{color: theme.colors.text}}
              name="share-social-outline"
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logoutSubmit()}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{color: theme.colors.text}}
              name="exit-outline"
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawers;
