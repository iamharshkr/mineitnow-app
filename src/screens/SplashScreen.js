import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text} from 'react-native-paper';
import logo from '../images/logo.png';
import Feather from 'react-native-vector-icons/Feather';
import config from '../../config/config';

const SplashScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.conatainer}>
      <Animatable.View animation="fadeInDownBig" style={styles.containerUp}>
        <StatusBar barStyle="default" backgroundColor={config.ThemeColor} />
        <Image style={styles.img} source={logo} />
        <Text style={styles.logoText}>{config.APP_NAME}</Text>
      </Animatable.View>
      <Animatable.View style={styles.containerDown} animation="fadeInUpBig">
        <ScrollView>
          <Text style={styles.text}>Click Get Started To Login</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.startBtnContainer}>
            <Text style={styles.startText}>Get Started</Text>
            <Feather style={styles.rightArrow} name="arrow-right" />
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerUp: {
    flex: 3,
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
  logoText: {
    color: config.ThemeColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
  containerDown: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: config.ThemeColor,
    width: '100%',
    borderTopRightRadius: 150,
    transform: [{rotate: '15deg'}],
  },
  text: {
    marginTop: '10%',
    padding: 10,
    color: '#34568b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  startBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20%',
    marginLeft: 'auto',
    backgroundColor: '#FA5252',
    padding: 15,
    borderRadius: 50,
    width: '80%',
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rightArrow: {
    color: '#fff',
    fontSize: 25,
  },
});
export default SplashScreen;
