import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import deviceInfo from 'react-native-device-info';
import {Switch, Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config/config';
import {setTheme} from '../../actions/themeActions';

const MoreScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {darkMode} = useSelector(state => state.theme);

  const onToggleSwitch = () => {
    dispatch(setTheme(!darkMode));
  };

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            style={[
              styles.sections,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1.5,
              },
            ]}>
            <Text style={styles.Text}>About</Text>
            <Ionicons
              style={{color: theme.colors.text}}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Privacy Policy')}
            style={[
              styles.sections,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1.5,
              },
            ]}>
            <Text style={styles.Text}>Privacy Policy</Text>
            <Ionicons
              style={{color: theme.colors.text}}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Terms and Conditions')}
            style={[
              styles.sections,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1.5,
              },
            ]}>
            <Text style={styles.Text}>Terms and Conditions</Text>
            <Ionicons
              style={{color: theme.colors.text}}
              name="chevron-forward-outline"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.sections,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1.5,
              },
            ]}>
            <Text style={styles.Text}>App version</Text>
            <Text style={styles.ExtText}>{deviceInfo.getVersion()}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.sections,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              borderWidth: 1.5,
            },
          ]}>
          <Text style={styles.Text}>Dark mode</Text>
          <View style={styles.darkMode}>
            <Switch
              onValueChange={onToggleSwitch}
              style={{color: theme.colors.text}}
              value={darkMode}
            />
            <Ionicons
              style={{color: theme.colors.text}}
              size={20}
              name={darkMode ? 'moon-outline' : 'sunny-outline'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sections: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  ExtText: {
    fontSize: 18,
  },
  Text: {
    fontSize: 20,
    color: config.ThemeColor,
    fontWeight: '700',
  },
  darkMode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
export default MoreScreen;
