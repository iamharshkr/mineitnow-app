import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

import {
  forgotPasswordReducer,
  profileReducer,
  teamsReducer,
  userReducer,
} from './reducer/userReducer';
import {minedReducer, miningReducer, rewardsReducer} from './reducer/miningReducers';
import {cryptoReducer, withdrawReducer} from './reducer/withdrawReducer';
import {themeReducer} from './reducer/themeReducer';
import {contactReducer} from './reducer/contactReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  miningSuccess: miningReducer,
  teams: teamsReducer,
  contact: contactReducer,
  minedCoins: minedReducer,
  withdraw: withdrawReducer,
  crypto: cryptoReducer,
  theme: themeReducer,
});

let initialState = {
  theme:{
    darkMode: false
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);
export const persistor = persistStore(store);
export default store;
