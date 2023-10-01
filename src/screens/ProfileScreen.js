import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button, Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import config from '../../config/config';
import {countryList} from '../data/countryList';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  loadUser,
  updateProfile,
  clearErrors,
  resetProfile,
} from '../../actions/userActions';
import {showToast} from '../layouts/alert';
import LoadingScreen from './LoadingScreen';

const adUnitId = config.InterstitialAdUnit;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const ProfileScreen = ({navigation}) => {
  const {isUpdated, error, loading} = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const loadingMain = useSelector(state => state.user.loading);
  const {minedCoins} = useSelector(state => state.minedCoins);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number.toString());
  const [receiveAddress, setReceiveAddress] = useState(user.receiveAddress);
  const [address, setAddress] = useState(
    user.postalAddress ? user.postalAddress : '',
  );
  const [city, setCity] = useState(user.city ? user.city : '');
  const [state, setState] = useState(user.state ? user.state : '');
  const [country, setCountry] = useState(user.country ? user.country : '');
  const [zipcode, setZipcode] = useState(
    user.zipcode ? user.zipcode.toString() : '',
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const [validator, setValidator] = useState({});

  // Refernce of Input Field
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      showToast('Profile updated successfully');
      dispatch(resetProfile());
    }
    dispatch(loadUser());
  }, [error, isUpdated]);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const submitUpdate = () => {
    if (name.trim().length === 0) {
      return setValidator({
        name: 'Name field can not be empty.',
      });
    }
    if (number.length != 10) {
      return setValidator({
        number: 'Please enter correct number.',
      });
    }
    if (zipcode.length > 6) {
      return setValidator({
        zipCode: 'Zip Code can not increase 6 digits.',
      });
    }
    const myForm = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      number,
      receiveAddress,
      address,
      city,
      state,
      zipcode,
      country,
    };
    dispatch(updateProfile(myForm));
    try {
      loaded ? interstitial.show() : null;
    } catch (err) {
      return;
    }
    setValidator({});
  };

  return (
    <>
      {loadingMain ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.p}>
            <View>
              <TextInput
                error={validator.name}
                style={styles.input}
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
                ref={ref_input2}
                style={styles.input}
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
                style={styles.input}
                ref={ref_input3}
                activeOutlineColor={config.ThemeColor}
                label="Wallet Address"
                mode="outlined"
                value={receiveAddress}
                onSubmitEditing={() => ref_input4.current.focus()}
                onChangeText={text => setReceiveAddress(text)}
                placeholder="Enter your wallet receiving address"
              />
              <TextInput
                style={styles.input}
                ref={ref_input4}
                activeOutlineColor={config.ThemeColor}
                label="Postal Address"
                mode="outlined"
                value={address}
                onSubmitEditing={() => ref_input5.current.focus()}
                onChangeText={text => setAddress(text)}
                placeholder="Enter your postal address"
              />
              <View style={styles.flexContainer}>
                <TextInput
                  style={[styles.input, styles.cityInp]}
                  activeOutlineColor={config.ThemeColor}
                  ref={ref_input5}
                  label="City"
                  mode="outlined"
                  value={city}
                  onSubmitEditing={() => ref_input6.current.focus()}
                  onChangeText={text => setCity(text)}
                  placeholder="Enter your city"
                />
                <TextInput
                  style={[styles.input, styles.stateInp]}
                  activeOutlineColor={config.ThemeColor}
                  ref={ref_input6}
                  label="State"
                  mode="outlined"
                  value={state}
                  onSubmitEditing={() => ref_input7.current.focus()}
                  onChangeText={text => setState(text)}
                  placeholder="Enter your state"
                />
              </View>
              <View style={styles.flexContainer}>
                <TextInput
                  error={validator.zipCode}
                  style={[styles.input, styles.cityInp]}
                  ref={ref_input7}
                  keyboardType="numeric"
                  activeOutlineColor={config.ThemeColor}
                  label="Zip Code"
                  mode="outlined"
                  value={zipcode}
                  onChangeText={text => setZipcode(text)}
                  placeholder="Enter your zip code"
                />
                <View
                  style={[
                    styles.input,
                    styles.stateInp,
                    styles.dropdownContainer,
                  ]}>
                  <DropDownPicker
                    label="Country"
                    open={showDropDown}
                    value={country}
                    items={countryList}
                    listMode="SCROLLVIEW"
                    setOpen={setShowDropDown}
                    setValue={setCountry}
                    placeholder="Country"
                    style={[
                      styles.dropdown,
                      {borderColor: showDropDown ? config.ThemeColor : 'black'},
                    ]}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                  />
                </View>
              </View>
              {validator.zipCode ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{validator.zipCode}</Text>
                </Animatable.View>
              ) : null}
              <View style={styles.coins}>
                <Text style={styles.coinsTxt}>
                  Available Coins :{' '}
                  {minedCoins
                    ? minedCoins.toFixed(8)
                    : parseFloat(user.coins).toFixed(8)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => submitUpdate()}
                style={styles.btnContainer}>
                <Button
                  color="#fff"
                  style={styles.changeBtn}
                  loading={loading}
                  disabled={loading}>
                  Update Profile
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Change Password')}
                style={styles.btnContainer}>
                <Button color="#fff" style={styles.changeBtn}>
                  Change Password
                </Button>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  p: {
    padding: 8,
  },
  input: {
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  cityInp: {
    width: 180,
    marginRight: 'auto',
  },
  stateInp: {
    width: 180,
    marginLeft: 'auto',
  },
  coins: {
    padding: 3,
  },
  coinsTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: config.ThemeColor,
  },
  btnContainer: {
    marginTop: 12,
  },
  dropdownContainer: {
    marginTop: 5,
    padding: 4,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderWidth: 1,
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
export default ProfileScreen;
