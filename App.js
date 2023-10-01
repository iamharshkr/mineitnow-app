import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import RootNavigator from './src/Navigator/RootNavigator';
import {AppOpenAd} from 'react-native-google-mobile-ads';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import AppStackNavigator from './src/Navigator/AppStackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {Appearance, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './src/screens/NoInternetScreen';
import DoubleTapToClose from './src/layouts/DoubleTapToClose';
import config from './config/config';
import {setTheme} from './actions/themeActions';

const appOpenAd = AppOpenAd.createForAdRequest(config.AppOpenAdUnit, {
  requestNonPersonalizedAdsOnly: true,
});

const App = () => {
  const dispatch = useDispatch();
  const {darkMode} = useSelector(state => state.theme);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [theme, setDarkTheme] = useState();

  useEffect(() => {
    setDarkTheme(darkMode ? DarkTheme : DefaultTheme);
  }, [darkMode]);

  useEffect(() => {
        //set dark mode
        dispatch(setTheme(Appearance.getColorScheme() === 'dark' ? true : false));

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetConnected(state.isConnected);
    });

    // Preload an app open ad
    const AppOpen = appOpenAd.load();
    console.log(AppOpen);
    try {
      // Show the app open ad when user brings the app to the foreground.
      appOpenAd.show();
    } catch (err) {
      return;
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const DefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const DarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };
  const {isAuthenticated} = useSelector(state => state.user);

  //Check Initial Screen
  const [isInitialScreen, setIsInitialScreen] = useState(true);
  const isCurrentScreenInitialOne = state => {
    const route = state.routes[state.index];
    if (route.state) {
      // Dive into nested navigators
      return isCurrentScreenInitialOne(route.state);
    }
    return state.index === 0;
  };

  console.log(JSON.stringify(useSelector(state => state)));
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={theme}
          onStateChange={state => {
            setIsInitialScreen(isCurrentScreenInitialOne(state));
          }}>
          {isInternetConnected ? (
            <>
              {isInitialScreen && <DoubleTapToClose />}
              <StatusBar
                barStyle={darkMode ? 'dark-content' : 'light-content'}
              />
              {isAuthenticated ? <AppStackNavigator /> : <RootNavigator />}
            </>
          ) : (
            <NoInternetScreen />
          )}
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
