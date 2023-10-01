import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import logo from '../images/logo.png';
import LoadingScreen from './LoadingScreen';
import {showToast} from '../layouts/alert';
import config from '../../config/config';
import {useDispatch} from 'react-redux';
import {clearErrors, forgotPassword} from '../../actions/userActions';
import {useSelector} from 'react-redux';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, message} = useSelector(state => state.forgotPassword);
  const [validator, setValidator] = useState({});
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ForgotSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return setValidator({email: 'Please enter correct email.'});
    }
    const myForm = {
      email
    }
    dispatch(forgotPassword(myForm));
    setValidator({});
  };
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (message) {
      showToast(message);
    }
  });
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Animatable.View animation="fadeInDownBig" style={styles.containerUp}>
            <Image style={styles.img} source={logo} />
          </Animatable.View>
          <Animatable.View animation="fadeInUpBig" style={styles.container}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.headingContainer}>
                <Text variant="headlineLarge" style={styles.heading}>
                  Forgot Your Password !
                </Text>
              </View>
              <TextInput
                error={validator.email}
                style={styles.input}
                activeOutlineColor={config.ThemeColor}
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Enter your email address..."
              />
              {validator.email ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{validator.email}</Text>
                </Animatable.View>
              ) : null}
              <TouchableOpacity
                onPress={ForgotSubmit}
                style={styles.loginConatainer}>
                <Button style={styles.loginButton} mode="contained" loading={loading} disabled={loading}>
                  <Text style={styles.loginText}>Send Password</Text>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={styles.createContainer}>
                <Text style={styles.account}>
                  Don't have a account ?{' '}
                  <Text style={styles.register}>Register here</Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animatable.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerUp: {
    paddingTop: 40,
  },
  container: {
    marginTop: 80,
    padding: 5,
  },
  img: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },
  headingContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  loginConatainer: {
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: config.ThemeColor,
    padding: 5,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    marginBottom: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  createContainer: {
    marginTop: 10,
    marginRight: 'auto',
  },
  account: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  register: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'purple',
  },
});

export default ForgotPassword;
