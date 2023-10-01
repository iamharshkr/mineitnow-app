import {
  START_MINING_SUCCESS,
  START_MINING_REQUEST,
  START_MINING_FAIL,
  START_MINING_RESET,
  GET_MINED_COINS,
  REWARDS_REQUEST,
  REWARDS_SUCCESS,
  REWARDS_FAIL,
  CLEAR_ERRORS,
} from '../constants/miningConstants';
import axios from 'axios';
import config from '../config/config';
var baseUrl = config.BASE_URL;

// Start Mining
export const startMining = () => async dispatch => {
  try {
    dispatch({type: START_MINING_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(`${baseUrl}start`, {}, config);

    dispatch({type: START_MINING_SUCCESS, payload: data.message});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: START_MINING_FAIL,
        payload: error.response.data
          ? error.response.data.message
          : error.response._response,
      });
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

// Reset Mining
export const resetMining = () => async dispatch => {
  try {
    dispatch({type: START_MINING_RESET});
  } catch (error) {
    console.log('Error', error);
  }
};

// Clear error for mining
export const clearMiningErrors = () => async dispatch => {
  try {
    dispatch({type: CLEAR_ERRORS});
  } catch (error) {
    console.log('Error', error);
  }
};

export const getMinedCoins = data => async dispatch => {
  try {
    dispatch({type: GET_MINED_COINS, payload: data});
  } catch (error) {
    console.log('Error', error);
  }
};

// Get Rewards
export const getRewards = type => async dispatch => {
  try {
    dispatch({type: REWARDS_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(`${baseUrl}getrewards`, type, config);

    console.log('data from action' + JSON.stringify(data));

    dispatch({type: REWARDS_SUCCESS, payload: data.message});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: REWARDS_FAIL,
        payload: error.response.data
          ? error.response.data.message
          : error.response._response,
      });
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};
