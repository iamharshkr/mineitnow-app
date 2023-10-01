import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
  CLEAR_ERRORS,
  CHECK_REFERRAL_FAIL,
  CHECK_REFERRAL_SUCCESS,
  CHECK_REFERRAL_REQUEST,
  CHECK_REFERRAL_RESET,
  TEAMS_FAIL,
  TEAMS_REQUEST,
  TEAMS_SUCCESS,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_RESET,
  TEAMS_RESET,
} from '../constants/userConstants';
import axios from 'axios';
import {RESET_MINED_COINS} from '../constants/miningConstants';
import {GET_WITHDRAW_RESET} from '../constants/withdrawConstant';
import config from '../config/config';
import {POP_UP_SUCCESS} from '../constants/themeConstants';
var baseUrl = config.BASE_URL;
// Login
export const login = (email, password) => async dispatch => {
  try {
    dispatch({type: LOGIN_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(
      `${baseUrl}login`,
      {email, password},
      config,
    );

    dispatch({type: LOGIN_SUCCESS, payload: data.user});
  } catch (error) {
    if (error.response) {
      console.log('error from action' + JSON.stringify(error.response));
      dispatch({
        type: LOGIN_FAIL,
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

// Register
export const register = userData => async dispatch => {
  try {
    dispatch({type: REGISTER_USER_REQUEST});

    const config = {headers: {'Content-Type': 'multipart/form-data'}};

    const {data} = await axios.post(`${baseUrl}register`, userData, config);

    dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: REGISTER_USER_FAIL,
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

//Check for Referred user
export const checkReferred = referralId => async dispatch => {
  try {
    dispatch({type: CHECK_REFERRAL_REQUEST});
    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(
      `${baseUrl}checkreferral`,
      {referralId},
      config,
    );
    dispatch({type: CHECK_REFERRAL_SUCCESS, payload: data.message});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECK_REFERRAL_FAIL,
        payload: error.response.message,
      });
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};
// Check referral reset
export const resetReferral = () => async dispatch => {
  try {
    dispatch({type: CHECK_REFERRAL_RESET});
    console.log('RESEST REFERRAL');
  } catch (error) {
    console.log('Error', error);
  }
};

// Load User
export const loadUser = () => async dispatch => {
  try {
    dispatch({type: LOAD_USER_REQUEST});

    const {data} = await axios.get(`${baseUrl}me`);
    dispatch({type: LOAD_USER_SUCCESS, payload: data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: LOAD_USER_FAIL,
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

// Get Teams
export const getTeams = () => async dispatch => {
  try {
    dispatch({type: TEAMS_REQUEST});
    const {data} = await axios.get(`${baseUrl}me/teams`);

    dispatch({type: TEAMS_SUCCESS, payload: data.teams});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: TEAMS_FAIL,
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
//Send Message
export const sendMessage = userData => async dispatch => {
  try {
    dispatch({type: SEND_MESSAGE_REQUEST});
    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axios.post(`${baseUrl}me/contact`, userData, config);

    dispatch({type: SEND_MESSAGE_SUCCESS, payload: data});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
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

// Logout User
export const logout = () => async dispatch => {
  try {
    await axios.get(`${baseUrl}logout`);

    dispatch({type: LOGOUT_SUCCESS});
    dispatch({type: RESET_MINED_COINS});
    dispatch({type: TEAMS_RESET});
    dispatch({type: GET_WITHDRAW_RESET});
    dispatch({type: POP_UP_SUCCESS, payload: false});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: LOGOUT_FAIL,
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

// Update Profile
export const updateProfile = userData => async dispatch => {
  try {
    dispatch({type: UPDATE_PROFILE_REQUEST});

    const config = {headers: {'Content-Type': 'multipart/form-data'}};

    const {data} = await axios.put(`${baseUrl}me/update`, userData, config);

    dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
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

// Update Password
export const updatePassword = passwords => async dispatch => {
  try {
    dispatch({type: UPDATE_PASSWORD_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.put(
      `${baseUrl}password/update`,
      passwords,
      config,
    );

    dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
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

// Forgot Password
export const forgotPassword = email => async dispatch => {
  try {
    dispatch({type: FORGOT_PASSWORD_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.post(`${baseUrl}password/forgot`, email, config);

    console.log(data);

    dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
  } catch (error) {
    if (error.response) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
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

// Reset Password
export const resetPassword = (token, passwords) => async dispatch => {
  try {
    dispatch({type: RESET_PASSWORD_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};

    const {data} = await axios.put(
      `${baseUrl}password/reset/${token}`,
      passwords,
      config,
    );

    dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.response._response,
    });
  }
};

// Profile Update Reset
export const resetProfile = () => async dispatch => {
  try {
    dispatch({type: UPDATE_PROFILE_RESET});
  } catch (error) {
    console.log('Error: ' + error);
  }
};

//Send Message Resest
export const resetSendMessage = () => async dispatch => {
  try {
    dispatch({type: SEND_MESSAGE_RESET});
  } catch (error) {
    console.log('Error: ' + error);
  }
};

// Clearing Errors
export const clearErrors = () => async dispatch => {
  dispatch({type: CLEAR_ERRORS});
};
