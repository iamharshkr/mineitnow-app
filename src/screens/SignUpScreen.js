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
import config from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkReferred,
  clearErrors,
  register,
  resetReferral,
} from '../../actions/userActions';
import {showToast} from '../layouts/alert';
import DeviceInfo from 'react-native-device-info';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, checkReferral} = useSelector(state => state.user);
  const [validator, setValidator] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [checked, setChecked] = useState(false);
  // DeviceInfo.getInstallReferrer().then(installReferrer => {
  //   installReferrer === 'unknown'
  //     ? setReferral(referral)
  //     : setReferral(installReferrer);
  // });

  // Reference of Text Input Field
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const getDeviceInfo = async () => {
    var deviceDetails = {};
    deviceDetails.deviceName = await DeviceInfo.getDeviceName();
    deviceDetails.display = await DeviceInfo.getDisplay();
    deviceDetails.brand = DeviceInfo.getBrand();
    deviceDetails.androidId = DeviceInfo.getDeviceId();
    deviceDetails.firstTimeInstall = await DeviceInfo.getFirstInstallTime();
    deviceDetails.host = await DeviceInfo.getHost();
    deviceDetails.ipAddress = await DeviceInfo.getIpAddress();
    deviceDetails.referralId = await DeviceInfo.getInstallReferrer();
    deviceDetails.systemVersion = DeviceInfo.getSystemVersion();
    deviceDetails.uniqueId = await DeviceInfo.getUniqueId();
    deviceDetails.isEmulator = await DeviceInfo.isEmulator();
    return JSON.stringify(deviceDetails);
  };
  const submit = () => {
    if (name.trim().length === 0) {
      return setValidator({
        name: 'Please enter your name.',
      });
    }
    if (number.length != 10) {
      return setValidator({
        number: 'Please enter correct number.',
      });
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return setValidator({email: 'Please enter correct email.'});
    }
    if (password.trim().length === 0) {
      return setValidator({
        password: 'Please enter your password.',
      });
    } else if (password != confirmPassword) {
      return setValidator({
        password: 'Password and Confirm Password do not match.',
      });
    }
    if (!checked) {
      return setValidator({
        terms: 'Please accept the terms and conditions.',
      });
    }
    getDeviceInfo().then(result => {
      const myForm = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        number: number,
        password: password,
        referral: referral,
        deviceInfo: result,
      };
      dispatch(register(myForm));
    });
    setValidator({});
  };
  const checkRefer = async () => {
    dispatch(checkReferred(referral));
  };
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
  }, [error]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <KeyboardAvoidingView behavior="position">
            <Animatable.View
              animation="fadeInDownBig"
              style={styles.containerUp}>
              <Image style={styles.img} source={logo} />
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.container}>
              <View style={styles.headingContainer}>
                <Text variant="headlineLarge" style={styles.heading}>
                  Register Now !
                </Text>
              </View>
              <ScrollView>
                <TextInput
                  error={validator.name}
                  style={styles.input}
                  autoFocus={true}
                  activeOutlineColor={config.ThemeColor}
                  label="Name"
                  mode="outlined"
                  value={name}
                  onSubmitEditing={() => ref_input2.current.focus()}
                  onChangeText={text => setName(text)}
                  placeholder="Enter your full name"
                />
                {validator.name ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.name}</Text>
                  </Animatable.View>
                ) : null}
                <TextInput
                  error={validator.number}
                  style={styles.input}
                  ref={ref_input2}
                  keyboardType="numeric"
                  activeOutlineColor={config.ThemeColor}
                  label="Phone Number"
                  mode="outlined"
                  value={number}
                  onSubmitEditing={() => ref_input3.current.focus()}
                  onChangeText={text => setNumber(text)}
                  placeholder="Enter number with country code. Eg: +91..."
                />
                {validator.number ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.number}</Text>
                  </Animatable.View>
                ) : null}
                <TextInput
                  error={validator.email}
                  style={styles.input}
                  ref={ref_input3}
                  activeOutlineColor={config.ThemeColor}
                  keyboardType="email-address"
                  label="Email"
                  mode="outlined"
                  value={email}
                  onSubmitEditing={() => ref_input4.current.focus()}
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
                  ref={ref_input4}
                  secureTextEntry={showPassword ? true : false}
                  label="Password"
                  mode="outlined"
                  placeholder="Enter your password"
                  value={password}
                  onSubmitEditing={() => ref_input5.current.focus()}
                  onChangeText={text => setPassword(text)}
                  right={
                    <TextInput.Icon
                      onPress={() => setShowPassword(!showPassword)}
                      name={showPassword ? 'eye' : 'eye-off'}
                    />
                  }
                />
                <TextInput
                  error={validator.password}
                  activeOutlineColor={config.ThemeColor}
                  ref={ref_input5}
                  secureTextEntry={showConfirmPassword ? true : false}
                  label="Password"
                  mode="outlined"
                  placeholder="Enter your password"
                  value={confirmPassword}
                  onSubmitEditing={() => ref_input6.current.focus()}
                  onChangeText={text => setConfirmPassword(text)}
                  right={
                    <TextInput.Icon
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      name={showConfirmPassword ? 'eye' : 'eye-off'}
                    />
                  }
                />
                {validator.password ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{validator.password}</Text>
                  </Animatable.View>
                ) : null}
                <TextInput
                  style={styles.input}
                  activeOutlineColor={config.ThemeColor}
                  ref={ref_input6}
                  label="Referral"
                  mode="outlined"
                  value={referral}
                  onChangeText={text => setReferral(text)}
                  onSubmitEditing={() => checkRefer()}
                  placeholder="Enter Referral id"
                />
                {checkReferral ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.successMsg}>
                      Referral: {checkReferral}
                    </Text>
                  </Animatable.View>
                ) : null}
                <View style={styles.agree}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <View style={styles.agree}>
                    <Text style={styles.agreeText}>I agree to the </Text>
                    <Text
                      style={[styles.agreeText, {color: 'blue'}]}
                      onPress={() =>
                        navigation.navigate('Terms and Conditions')
                      }>
                      Terms and Conditions.
                    </Text>
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
                    <Text style={styles.loginText}>Sign Up</Text>
                  </Button>
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.createContainer}>
                <Text style={styles.account}>
                  Already have a account ?{' '}
                  <Text style={styles.register}>Login here</Text>
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerUp: {
    paddingTop: 20,
  },
  container: {
    padding: 5,
  },
  img: {
    marginBottom: 10,
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
  successMsg: {
    color: config.ThemeColor,
    fontSize: 18,
    padding: 2,
    fontWeight: 'bold',
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
  agree: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeText: {
    fontSize: 15,
  },
});

export default SignUpScreen;
