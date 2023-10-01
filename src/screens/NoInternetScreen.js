import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import noInternet from '../images/noInternet.png';

const NoInternetScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.upContainer}>
        <Image source={noInternet} style={styles.image} />
        </View>
        <View style={styles.downContainer}>
        <Text style={styles.heading}>Whooops!!!</Text>
        <Text style={styles.text}>It looks your internet connection is lost.</Text>
        <Text style={styles.text}>Please check your internet connection and try again.</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  upContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%'
  },
  downContainer:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 300,
    width: 300,
  },
  heading:{
    fontSize: 25,
    fontWeight: '800',
    color: '#A9A9A9'
  },
  text: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 5,
    color: '#899499'
  }
});
export default NoInternetScreen;
