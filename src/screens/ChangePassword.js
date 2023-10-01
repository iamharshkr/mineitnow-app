import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import config from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearErrors,
  resetProfile,
  updatePassword,
} from '../../actions/userActions';
import {showToast} from '../layouts/alert';
import LoadingScreen from './LoadingScreen';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const {loading, error, isUpdated} = useSelector(state => state.profile);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validator, setValidator] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  //   Reference of TextInput Field
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const submitChangePassword = () => {
    if (oldPassword.length === 0) {
      return setValidator({
        oldPassword: 'Enter your old password.',
      });
    }
    if (newPassword.length === 0) {
      return setValidator({
        password: 'Enter your new password.',
      });
    }
    if (newPassword != confirmPassword) {
      return setValidator({
        password: 'New Password and Confirm Password do not match.',
      });
    }

    const myForm = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(myForm));
    setValidator({});
  };
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      showToast('Password updated successfully');
    }
    dispatch(resetProfile());
  }, [error, isUpdated]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <TextInput
              ref={ref_input1}
              style={styles.input}
              error={validator.oldPassword}
              activeOutlineColor={config.ThemeColor}
              secureTextEntry={showOldPassword ? true : false}
              label="Old Password"
              mode="outlined"
              placeholder="Enter your old password"
              value={oldPassword}
              onSubmitEditing={() => ref_input2.current.focus()}
              onChangeText={text => setOldPassword(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  name={showOldPassword ? 'eye' : 'eye-off'}
                />
              }
            />
            {validator.oldPassword ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{validator.oldPassword}</Text>
              </Animatable.View>
            ) : null}
            <TextInput
              error={validator.password}
              style={styles.input}
              activeOutlineColor={config.ThemeColor}
              ref={ref_input2}
              secureTextEntry={showNewPassword ? true : false}
              label="New Password"
              mode="outlined"
              placeholder="Enter your new password"
              value={newPassword}
              onSubmitEditing={() => ref_input3.current.focus()}
              onChangeText={text => setNewPassword(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  name={showNewPassword ? 'eye' : 'eye-off'}
                />
              }
            />
            <TextInput
              error={validator.password}
              style={styles.input}
              activeOutlineColor={config.ThemeColor}
              ref={ref_input3}
              secureTextEntry={showConfirmPassword ? true : false}
              label="Confirm Password"
              mode="outlined"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              right={
                <TextInput.Icon
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                />
              }
            />
            {validator.password ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{validator.password}</Text>
              </Animatable.View>
            ) : null}
            <TouchableOpacity
              onPress={() => submitChangePassword()}
              style={styles.btnContainer}>
              <Button color="#fff" style={styles.changeBtn} loading={loading} disabled={loading}>
                Change Password
              </Button>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 5,
  },
  input: {
    marginBottom: 8,
  },
  btnContainer: {
    marginTop: 12,
  },
  changeBtn: {
    backgroundColor: config.ThemeColor,
    borderRadius: 40,
    padding: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
});

export default ChangePassword;
