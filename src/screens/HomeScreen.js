import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import logo from '../images/logo.png';
import config from '../../config/config';
import {showToast} from '../layouts/alert';
import {loadUser, clearErrors} from '../../actions/userActions';
import {
  clearMiningErrors,
  getMinedCoins,
  getRewards,
  resetMining,
  startMining,
} from '../../actions/miningActions';
import LoadingScreen from './LoadingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalScreen from '../layouts/Modal';
import LinearGradient from 'react-native-linear-gradient';

const interstitial = InterstitialAd.createForAdRequest(
  config.InterstitialAdUnit,
  {
    requestNonPersonalizedAdsOnly: true,
  },
);

const rewarded = RewardedAd.createForAdRequest(config.RewardedAdUnit, {
  requestNonPersonalizedAdsOnly: true,
});
const HomeScreen = ({navigation}) => {
  const {error, loading, user, miningInfo, notice, rewards} = useSelector(
    state => state.user,
  );
  const {mining} = useSelector(state => state.miningSuccess);
  const loadingMining = useSelector(state => state.miningSuccess).loading;
  const miningError = useSelector(state => state.miningSuccess).error;
  const {minedCoins} = useSelector(state => state.minedCoins);
  const {isPopupVisited} = useSelector(state => state.theme);
  const [newCoins, setNewCoins] = useState(
    minedCoins ? minedCoins : parseFloat(user.coins),
  );
  const [miningSpeed, setMiningSpeed] = useState(
    miningInfo && miningInfo.length > 0
      ? miningInfo[0].netMiningSpeed
      : user.miningSpeed,
  );
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isRewardActive, setIsRewardActive] = useState(rewards ? false : true);
  const [totalDuration, setTotalDuration] = useState(0);
  const [rewardDuration, setRewardDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [rloaded, setRloaded] = useState(false);
  const activeColor = isActive ? '#44EE77' : '#FB475E';
  const [showModal, setShowModal] = useState(false);
  const {width} = useWindowDimensions();

  const speedPerSec = parseFloat(miningSpeed) / 3600;

  const countDown = date => {
    // Set the date we're counting down to
    var countDownDate = new Date(date).getTime() + 1000 * 60 * 60 * 24;
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    if (distance > 0) {
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var x = days > 0 ? (days < 10 ? '0' + days : days) + ':' : '';
      x += (hours < 10 ? '0' + hours : hours) + ':';
      x += (minutes < 10 ? '0' + minutes : minutes) + ':';
      x += seconds < 10 ? '0' + seconds : seconds;
      setTotalDuration(x);
      increment();
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const rewardCount = date2 => {
    var countDownDate2 = new Date(date2).getTime() + 1000 * 60 * 60;
    var now = new Date().getTime();
    var distance2 = countDownDate2 - now;
    if (distance2 > 0) {
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance2 / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance2 % (1000 * 60)) / 1000);

      var x = days > 0 ? (days < 10 ? '0' + days : days) + ':' : '';
      x += (hours < 10 ? '0' + hours : hours) + ':';
      x += (minutes < 10 ? '0' + minutes : minutes) + ':';
      x += seconds < 10 ? '0' + seconds : seconds;
      setRewardDuration(x);
      setIsRewardActive(false);
    } else {
      setIsRewardActive(true);
    }
  };
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (miningError) {
      showToast(miningError);
      dispatch(clearMiningErrors());
    }
    if (mining) {
      showToast(mining);
      dispatch(resetMining());
    }

    if (!minedCoins) {
      dispatch(getMinedCoins(parseFloat(user.coins)));
    }
  }, [error, mining, miningError]);
  useEffect(() => {
    if (rewards) {
      var id2 = setInterval(function () {
        rewardCount(rewards.createdAt);
      }, 1000);
    }

    return () => {
      clearInterval(id2);
    };
  }, [rewards]);

  useEffect(() => {
    if (miningInfo && miningInfo.length > 0) {
      setMiningSpeed(miningInfo[0].netMiningSpeed);
      var totalMinedTime =
        (new Date().getTime() - new Date(miningInfo[0].createdAt).getTime()) /
        1000;
      if (Math.floor(totalMinedTime) / 3600 <= 24) {
        var totalMinedCoinsOld = totalMinedTime * speedPerSec;
        var totalMinedCoins = parseFloat(user.coins) + totalMinedCoinsOld;
        setNewCoins(totalMinedCoins);
        dispatch(getMinedCoins(totalMinedCoins));
      }
      var id = setInterval(function () {
        countDown(miningInfo[0].createdAt);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [miningInfo]);

  useEffect(() => {
    dispatch(loadUser());

    if (notice) {
      notice[0].modalable
        ? setShowModal(isPopupVisited ? false : true)
        : setShowModal(false);
    }
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    //Rewarded ad
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRloaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        const myData = {
          rewardType: 'Hourly_Reward',
        };
        dispatch(getRewards(myData));
        dispatch(loadUser());
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  //Start mining function
  const startMine = () => {
    if (isActive) {
      return;
    }
    try {
      loaded ? interstitial.show() : null;
      dispatch(startMining());
      dispatch(loadUser());
    } catch (err) {
      return;
    }
  };

  //Get rewards
  const submitReward = () => {
    try {
      const myData = {
        rewardType: 'Hourly_Reward',
      };
      if (isRewardActive) {
        dispatch(getRewards(myData));
        rloaded ? rewarded.show() : null;
      } else {
        return showToast('Please wait till timer ends');
      }
    } catch (err) {
      return showToast('Opps!!!\nSomething is wrong. Try after sometimes.');
    }
  };

  //Increase coins
  function increment() {
    setNewCoins(OldnewCoins => OldnewCoins + speedPerSec);
  }

  return (
    <>
      {loading || loadingMining ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ModalScreen isVisible={showModal} />
          <LinearGradient colors={['#18415c', '#3b5998', '#340744']}>
            <ScrollView>
              <View style={styles.faqsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
                  <LinearGradient
                    style={styles.faqsOpacity}
                    colors={['#340744', '#6500B0']}>
                    <Text style={styles.faqsText}>FAQs</Text>
                    <Ionicons
                      style={[styles.faqsText, {marginLeft: -5}]}
                      name="help-outline"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.containerUp}>
                <Image style={styles.img} source={logo} />
                <View style={styles.containerStart}>
                  <TouchableOpacity onPress={() => startMine()}>
                    <View>
                      {isActive ? (
                        <Text style={[styles.startText, {padding: 10}]}>
                          {totalDuration}
                        </Text>
                      ) : (
                        <Button>
                          <Ionicons color="#fff" name="play" size={40} />
                        </Button>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.startText}>
                  {isActive ? 'Mining' : 'Tap Button To Start Mining'}
                </Text>
              </View>
              <View style={styles.containerDetails}>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.7, y: 1.0}}
                  locations={[0, 0.5, 0.6]}
                  colors={['#599ac6', '#3b5998', '#192f6a']}
                  style={[styles.users, {width: width}]}>
                  <View style={styles.userName}>
                    <Text style={styles.userText}>Howdy, {user.name}!</Text>
                    <Text style={[styles.userActive, {color: activeColor}]}>
                      {isActive ? '' : 'Not '}Active {isActive ? '😊' : '😥'}
                    </Text>
                  </View>
                  <View style={styles.userCoins}>
                    <Text style={styles.userText}>Mined Coins</Text>
                    <Text style={styles.userCoinsText}>
                      {newCoins
                        ? newCoins.toFixed(5)
                        : parseFloat(user.coins).toFixed(5)}
                    </Text>
                    <Text style={styles.userCoinsText}>
                      {miningSpeed}/hr
                      <Ionicons
                        color={'#44EE77'}
                        name="flash-outline"
                        size={20}
                      />
                    </Text>
                  </View>
                </LinearGradient>
                <View style={styles.banner}>
                  <BannerAd
                    unitId={config.BannerAdUnit}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: true,
                    }}
                  />
                </View>
                <LinearGradient
                  colors={['#599ac6', '#3b5998', '#192f6a']}
                  style={styles.extraBtn}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Refer and Earn')}>
                    <LinearGradient
                      style={styles.referBtn}
                      colors={['#340744', '#6500B0']}>
                      <Button labelStyle={[styles.adBtnTxt, {marginRight: 4}]}>
                        Refer and Earn
                      </Button>
                      <Ionicons name="send-outline" size={22} color={'#fff'} />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Withdraw')}>
                    <LinearGradient
                      style={styles.referBtn}
                      colors={['#340744', '#6500B0']}>
                      <Button labelStyle={[styles.adBtnTxt, {marginRight: 4}]}>
                        Withdraw
                      </Button>
                      <Ionicons
                        name="wallet-outline"
                        size={22}
                        color={'#fff'}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity onPress={() => submitReward()}>
                  <LinearGradient
                    style={styles.rewardContainer}
                    colors={['#599ac6', '#3b5998', '#192f6a']}>
                    <Text style={styles.rewardTxt}>
                      {isRewardActive
                        ? 'Click here to get your hourly reward'
                        : 'Time Remaining - ' + rewardDuration}
                    </Text>
                    <Ionicons name="gift" size={35} />
                  </LinearGradient>
                </TouchableOpacity>
                <ScrollView>
                  <View style={styles.noticeContainer}>
                    <Text style={styles.noticeTitle}>Notice</Text>
                    {notice
                      ? notice[1].notice.split('\\n').map((i, key) => {
                          return (
                            <Text key={key} style={styles.noticemsg}>
                              {i}
                            </Text>
                          );
                        })
                      : null}
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  faqsContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  faqsOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.ThemeColor,
    padding: 5,
    paddingLeft: 8,
    borderRadius: 30,
  },
  faqsText: {
    fontSize: 22,
    color: '#fff',
  },
  containerUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },
  containerStart: {
    backgroundColor: config.ThemeColor,
    borderRadius: 100,
    padding: 5,
    marginVertical: 5,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 60,
    shadowOpacity: 1.0,
  },
  startText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  containerDetails: {
    flex: 3,
    marginTop: '10%',
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: '100%',
    borderRadius: 10,
  },
  users: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    padding: 15,
    alignItems: 'flex-end',
  },
  userCoins: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userActive: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  adBtnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  userCoinsText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#F9F6EE',
  },
  banner: {
    marginTop: 5,
    alignItems: 'center',
  },
  extraBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: '#599ac6',
    marginVertical: 5,
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  rewardTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  referBtn: {
    borderRadius: 30,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeContainer: {
    padding: 15,
  },
  noticeTitle: {
    fontSize: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    color: '#FFF5EE',
  },
  noticemsg: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#fff',
  },
});
export default HomeScreen;
