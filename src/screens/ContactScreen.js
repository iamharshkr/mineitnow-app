import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import * as Animatable from 'react-native-animatable';
import config from '../../config/config';
import {showToast} from '../layouts/alert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  clearErrors,
  resetSendMessage,
  sendMessage,
} from '../../actions/userActions';
import Clipboard from '@react-native-clipboard/clipboard';

const adUnitId = config.InterstitialAdUnit;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const ContactScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const {loading, error, message, reference} = useSelector(
    state => state.contact,
  );
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [query, setQuery] = useState('');
  const [validator, setValidator] = useState({});

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const copyText = text => {
    Clipboard.setString(text.toString());
    showToast('Copied Successfully');
  };
  if (message) {
    navigation.addListener('focus', () => {
      dispatch(resetSendMessage());
    });
  }

  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (message) {
      showToast(message);
    }
  }, [error, message]);
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

  const submitMessage = () => {
    if (name.trim().length === 0) {
      return setValidator({
        name: 'Please enter your name.',
      });
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return setValidator({email: 'Please enter correct email.'});
    }
    if (query.trim().length === 0) {
      return setValidator({
        query: 'Please enter your message.',
      });
    }

    const data = {
      name,
      email,
      query,
    };
    dispatch(sendMessage(data));
    try {
      loaded ? interstitial.show() : null;
    } catch (err) {
      return;
    }
    setValidator({});
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
            ref={ref_input2}
            error={validator.email}
            style={styles.input}
            activeOutlineColor={config.ThemeColor}
            keyboardType="email-address"
            label="Email"
            mode="outlined"
            value={email}
            onSubmitEditing={() => ref_input3.current.focus()}
            onChangeText={text => setEmail(text)}
            placeholder="Enter your email"
          />
          {validator.email ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{validator.email}</Text>
            </Animatable.View>
          ) : null}
          <TextInput
            ref={ref_input3}
            error={validator.query}
            style={styles.input}
            activeOutlineColor={config.ThemeColor}
            label="Message"
            mode="outlined"
            value={query}
            onChangeText={text => setQuery(text)}
            placeholder="Please elaborate your query"
            multiline={true}
            numberOfLines={8}
          />
          {validator.query ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{validator.query}</Text>
            </Animatable.View>
          ) : null}
          <TouchableOpacity
            onPress={() => submitMessage()}
            style={styles.btnContainer}>
            <Button style={styles.changeBtn} loading={loading}>
              <Text style={styles.btnText}>Send </Text>
              <Ionicons size={20} color={'#fff'} name="paper-plane-outline" />
            </Button>
          </TouchableOpacity>
          {message ? (
            <View style={styles.responseContainer}>
              <Text style={styles.responseTxt}>{message}</Text>
              <View style={styles.referenceContainer}>
                <Text selectable={true} style={styles.responseTxt2}>
                  Kindly Keep This Reference Number: {reference}
                  <TouchableOpacity onPress={() => copyText(reference)}>
                    <Ionicons name="copy-outline" size={22} />
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  input: {
    marginVertical: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  btnContainer: {
    marginTop: 12,
  },
  changeBtn: {
    backgroundColor: config.ThemeColor,
    borderRadius: 40,
    padding: 5,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  responseContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  responseTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'brown',
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseTxt2: {
    fontSize: 15,
    fontWeight: '700',
    color: 'brown',
  },
});
export default ContactScreen;
