import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform, BackHandler} from 'react-native';
import { showToast } from './alert';

export const ExecuteOnlyOnAndroid = (props) => {
  const {message} = props;
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      showToast(message);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });
  return <></>;
};

export default function DoubleTapToClose(props) {
  const {message = 'Tap again to exit the app'} = props;
  return Platform.OS !== 'ios' ? (
    <ExecuteOnlyOnAndroid message={message} />
  ) : (
    <></>
  );
}
