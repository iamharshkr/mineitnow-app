import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import DropDownPicker from 'react-native-dropdown-picker';
import config from '../../config/config';
import {showToast} from '../layouts/alert';
import LoadingScreen from './LoadingScreen';
import {
  getWithdrawalRequest,
  getCrypto,
  sendWithdrawalRequest,
  resetWithdrawal,
  clearErrors,
} from '../../actions/withdrawActions';
import {loadUser} from '../../actions/userActions';
import WithdrawTable from '../layouts/WithdrawTable';

const adUnitId = config.InterstitialAdUnit;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const WithdrawScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const {loading, error, withdraws, message} = useSelector(
    state => state.withdraw,
  );
  const {crypto} = useSelector(state => state.crypto);
  const loadingMain = useSelector(state => state.crypto.loading);
  const [receiveAddress, setReceiveAddress] = useState(user.receiveAddress);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [coins, setCoins] = useState('');
  const [type, setType] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [validator, setValidator] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);
  const dataTableHeader = [
    {
      header: 'Coins',
    },
    {
      header: 'Name',
    },
    {
      header: 'Value',
    },
    {
      header: 'Action',
    },
    {
      header: 'Date',
    },
  ];

  useEffect(() => {
    if (!receiveAddress || receiveAddress.length < 1) {
      setValidator({
        address: 'Please update wallet address from profile',
      });
    }
    if (error) {
      showToast(error);
      // dispatch(clearErrors());
    }
    if (message) {
      showToast(message);
      dispatch(resetWithdrawal());
    }
  }, [receiveAddress, error, message]);
  useEffect(() => {
    if (!crypto || crypto.length === 0) {
      dispatch(getCrypto());
    }
    dispatch(getWithdrawalRequest());
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

  const submitWithdraw = () => {
    if (!receiveAddress || receiveAddress.length < 1) {
      return;
    }
    if (coins.length === 0) {
      return setValidator({
        coins: 'Enter the number of coins',
      });
    }
    if (parseFloat(user.coins) < 5000 || parseFloat(coins) < 5000) {
      return setValidator({
        coins: 'Minimum withdraw 5000 coins.',
      });
    }
    if (parseFloat(coins) > parseFloat(user.coins)) {
      return setValidator({
        coins: 'Insufficient coins',
      });
    }
    if (type.length === 0) {
      return setValidator({
        type: 'Select the crypto in which you want to receive',
      });
    }
    if (withdraws && withdraws.length > 0) {
      const total =
        new Date().getTime() - new Date(withdraws[0].createdAt).getTime();
      const hours = Math.floor(total / 1000) / 3600;
      if (hours < 24) {
        return showToast('Wait for atleast 24 hours to withdraw coins again');
      }
    }
    const myForm = {
      type: type,
      coins: coins,
    };
    dispatch(sendWithdrawalRequest(myForm));
    dispatch(getWithdrawalRequest());
    dispatch(loadUser());
    setValidator({});
    try {
      loaded ? interstitial.show() : null;
    } catch (err) {
      return;
    }
  };
  return (
    <>
      {loadingMain ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.containerUp}>
              <View style={styles.headerContainer}>
                <Text style={styles.availableText}>Available Coins</Text>
                <Text style={styles.availableCoins}>
                  {parseFloat(user.coins).toFixed(8)}
                </Text>
              </View>
              <TextInput
                error={validator.address}
                style={styles.input}
                activeOutlineColor={config.ThemeColor}
                label="Wallet Address"
                mode="outlined"
                value={receiveAddress}
                disabled
              />
              {validator.address ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{validator.address}</Text>
                </Animatable.View>
              ) : null}
              <TextInput
                style={styles.input}
                activeOutlineColor={config.ThemeColor}
                keyboardType="numeric"
                label="Coins"
                mode="outlined"
                value={coins}
                onChangeText={text => setCoins(text)}
                placeholder="Enter coins you want to withdraw"
              />
              {validator.coins ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{validator.coins}</Text>
                </Animatable.View>
              ) : null}
              <DropDownPicker
                label="Coins Available"
                open={showDropDown}
                value={type}
                items={crypto}
                setOpen={setShowDropDown}
                setValue={setType}
                listMode="SCROLLVIEW"
                placeholder="Select the coin"
                style={[
                  styles.dropdown,
                  {borderColor: showDropDown ? config.ThemeColor : 'black'},
                ]}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onSelectItem={item => {
                  setCoinValue(item.price);
                }}
              />
              {type && coins ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.coinValue}>
                    Total Coins:{' '}
                    {(parseFloat(coinValue) * parseFloat(coins)).toFixed(10)}
                  </Text>
                </Animatable.View>
              ) : null}
              {validator.type ? (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{validator.type}</Text>
                </Animatable.View>
              ) : null}
              <Text style={styles.notice}>
                Get your coins directly in your wallet.
              </Text>
              <TouchableRipple
                onPress={() => submitWithdraw()}
                style={styles.btnContainer}>
                <Button
                  color="#fff"
                  style={styles.changeBtn}
                  loading={loading}
                  disabled={loading || receiveAddress ? false : true}>
                  Withdraw
                </Button>
              </TouchableRipple>
              <View style={styles.noticeContainer}>
                <Text style={styles.notice}>
                  Note: You have to select available coins option from above in
                  which you want to withdraw your coins. After that you will see
                  real time value of the coin you selected.
                </Text>
                <Text style={styles.notice}>
                  You can send only one withdrawal request within 24 hours.
                </Text>
                <Text style={styles.notice}>
                  All withdrawal requests will be served within 24-48 hours.
                </Text>
                <Text style={styles.notice}>
                  You can check all withdawal request and it's status from
                  below.
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.containerDown}>
              {withdraws && withdraws.length > 0 ? (
                <>
                  <Text style={styles.withdrawHeader}>
                    All withdawal Requests
                  </Text>
                  <WithdrawTable
                    dataTableHeader={dataTableHeader}
                    withdraws={withdraws}
                  />
                </>
              ) : (
                <Text style={styles.withdrawHeader}>
                  No withdawal records found.
                </Text>
              )}
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
    padding: 5,
  },
  containerUp: {
    flex: 2,
    marginVertical: 5,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
  },
  availableText: {
    color: config.ThemeColor,
    fontSize: 22,
    fontWeight: '700',
  },
  availableCoins: {
    color: config.ThemeColor,
    fontSize: 25,
    fontWeight: '900',
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 12,
  },
  changeBtn: {
    backgroundColor: config.ThemeColor,
    borderRadius: 40,
    padding: 5,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderWidth: 1,
  },
  noticeContainer: {
    marginVertical: 5,
  },
  notice: {
    color: 'gray',
  },
  divider: {
    height: 1,
  },
  containerDown: {
    flex: 2,
    alignItems: 'center',
    marginTop: 5,
  },
  withdrawHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: 'brown',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  coinValue: {
    color: config.ThemeColor,
    fontSize: 18,
  },
});

export default WithdrawScreen;
