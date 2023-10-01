import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import config from '../../../config/config';
import logo from '../../images/logo.png'

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.img} source={logo} />
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.text}>{config.APP_NAME} is a mining app used to mine coins. You can convert these coins into other crypto coins like: Bitcoin, Tron, Luna, Shiba Inu, etc. And you can withdraw it to any crypto wallets.</Text>
        <Text style={styles.text}>
            When you withdraw your coins you have to select the crypto coins in which you want to withdraw your coins. Valuation of the coins are based on the market, It may increase or decrease according to the market price.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  img: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default AboutScreen;
