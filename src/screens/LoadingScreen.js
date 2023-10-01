import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import logo from '../images/logo.png';
import config from '../../config/config';
import {showToast} from '../layouts/alert';

const LoadingScreen = () => {
  // setTimeout(() => {
  //   showToast('Please wait we are loading your page');
  //   setTimeout(() => {
  //     showToast('It\'s taking more time than usual');
  //     setTimeout(() => {
  //       showToast('Hold on! We are still trying our best.');
  //       setTimeout(() => {
  //         return
          
  //       }, 7000);
  //     }, 7000);
  //   }, 7000);
  // }, 5000);
  return (
    <>
      <View animation="fadeInDownBig" style={styles.containerUp}>
        <Image style={styles.img} source={logo} />
        <Text style={styles.loadingText}>Hold on we are getting ready...</Text>
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={config.ThemeColor} size="large" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerUp: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },
  loadingContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 5,
    color: config.ThemeColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default LoadingScreen;
