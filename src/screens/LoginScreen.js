import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput, Text, Checkbox} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import logo from '../images/logo.png';
import LoadingScreen from './LoadingScreen';
import {showToast} from '../layouts/alert';
import config from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, login} from '../../actions/userActions';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let [validator, setValidator] = useState({});
  const {error, loading} = useSelector(state => state.user);

  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const submit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return setValidator({email: 'Please enter correct email.'});
    }
    if (password.length === 0) {
      return setValidator({password: 'Please enter your password.'});
    }
    if(!checked){
      return setValidator({
        terms: 'Please accept the terms and conditions.'
      })
    }
    dispatch(login(email, password));
    setValidator({});
  };
  const ref_input2 = useRef();
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, showToast]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <ScrollView>
            <Animatable.View
              animation="fadeInDownBig"
              style={styles.containerUp}>
              <Image style={styles.img} source={logo} />
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.container}>
              <KeyboardAvoidingView behavior="position">
                <View style={styles.headingContainer}>
                  <Text variant="headlineLarge" style={styles.heading}>
                    Welcome Back !
                  </Text>
                </View>
                <TextInput
                  error={validator.email}
                  style={styles.input}
                  autoFocus={true}
                  activeOutlineColor={config.ThemeColor}
                  keyboardType="email-address"
                  label="Email"
                  mode="outlined"
                  value={email}
                  onSubmitEditing={() => ref_input2.current.focus()}
                  onChangeText={text => setEmail(text)}
                  placeholder="Enter your email address..."
                />
                {validator.email ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.email}</Text>
                  </Animatable.View>
                ) : null}
                <TextInput
                  error={validator.password}
                  activeOutlineColor={config.ThemeColor}
                  secureTextEntry={showPassword ? true : false}
                  label="Password"
                  mode="outlined"
                  ref={ref_input2}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  right={
                    <TextInput.Icon
                      onPress={() => setShowPassword(!showPassword)}
                      name={showPassword ? 'eye' : 'eye-off'}
                    />
                  }
                />
                {validator.password ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.password}</Text>
                  </Animatable.View>
                ) : null}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Forgot')}
                  style={styles.forgotContainer}>
                  <Text style={styles.register}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={styles.agree}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <View style={styles.agree}>
                  <Text style={styles.agreeText}>I agree to the </Text><Text style={[styles.agreeText, {color: 'blue'}]} onPress={()=> navigation.navigate('Terms and Conditions')}>Terms and Conditions.</Text>
                  </View>
                </View>
                {validator.terms ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.terms}</Text>
                  </Animatable.View>
                ) : null}
                <TouchableOpacity
                  onPress={submit}
                  style={styles.loginConatainer}>
                  <Button
                    style={styles.loginButton}
                    mode="contained"
                    loading={loading}
                    disabled={loading}>
                    <Text style={styles.loginText}>Login</Text>
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
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerUp: {
    paddingTop: 20,
  },
  container: {
    marginTop: 20,
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
  forgotContainer: {
    margin: 1,
  },
  agree:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  agreeText:{
    fontSize: 15
  }
});

export default LoginScreen;
