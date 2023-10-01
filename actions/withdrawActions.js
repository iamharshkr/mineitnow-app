import axios from 'axios';
import config from '../config/config';
import {
  CLEAR_ERRORS,
  GET_CRYPTO_FAIL,
  GET_CRYPTO_REQUEST,
  GET_CRYPTO_RESET,
  GET_CRYPTO_SUCCESS,
  GET_WITHDRAW_FAIL,
  GET_WITHDRAW_REQUEST,
  GET_WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
  WITHDRAW_REQUEST,
  WITHDRAW_RESET,
  WITHDRAW_SUCCESS,
} from '../constants/withdrawConstant';
var baseUrl = config.BASE_URL;

//Withdraw request
export const sendWithdrawalRequest = userData => async dispatch => {
  try {
    dispatch({type: WITHDRAW_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(`${baseUrl}me/withdraw`, userData, config);

    dispatch({type: WITHDRAW_SUCCESS, payload: data.message});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: WITHDRAW_FAIL,
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

//Get All Withdrawal requests
export const getWithdrawalRequest = () => async dispatch => {
  try {
    dispatch({type: GET_WITHDRAW_REQUEST});

    const {data} = await axios.get(`${baseUrl}me/withdraw`);

    dispatch({type: GET_WITHDRAW_SUCCESS, payload: data.data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_WITHDRAW_FAIL,
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

//Reset withdrawal state
export const resetWithdrawal = () => async dispatch => {
  try {
    dispatch({type: WITHDRAW_RESET});
  } catch (error) {
    console.log('Error', error);
  }
};

// Get crypto and its value
export const getCrypto = () => async dispatch => {
  try {
    dispatch({type: GET_CRYPTO_REQUEST});

    const {data} = await axios.get(`${baseUrl}crypto/price`);
    console.log(data);
    dispatch({type: GET_CRYPTO_SUCCESS, payload: data.crypto});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_CRYPTO_FAIL,
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

// reset crypto state
export const resetCrypto = () => async dispatch => {
  try {
    dispatch({type: GET_CRYPTO_RESET});
  } catch (error) {
    console.log('Error', error);
  }
};

// Clearing Errors
export const clearErrors = () => async dispatch => {
  dispatch({type: CLEAR_ERRORS});
};
