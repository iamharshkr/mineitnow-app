import {
  CLEAR_ERRORS,
  GET_CRYPTO_FAIL,
  GET_CRYPTO_REQUEST,
  GET_CRYPTO_RESET,
  GET_CRYPTO_SUCCESS,
  GET_WITHDRAW_FAIL,
  GET_WITHDRAW_REQUEST,
  GET_WITHDRAW_RESET,
  GET_WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
  WITHDRAW_REQUEST,
  WITHDRAW_RESET,
  WITHDRAW_SUCCESS,
} from '../constants/withdrawConstant';

export const withdrawReducer = (state = {}, action) => {
  switch (action.type) {
    case WITHDRAW_REQUEST:
    case GET_WITHDRAW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case WITHDRAW_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case GET_WITHDRAW_SUCCESS:
      return {
        ...state,
        loading: false,
        withdraws: action.payload,
      };

    case WITHDRAW_FAIL:
    case GET_WITHDRAW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WITHDRAW_RESET:
      return {
        ...state,
        message: null,
      };

    case GET_WITHDRAW_RESET:
      return {
        ...state,
        message: null,
        withdraws: null,
        error: null
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// get crypto value reducer
export const cryptoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRYPTO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CRYPTO_SUCCESS:
      return {
        loading: false,
        crypto: action.payload,
      };

    case GET_CRYPTO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_CRYPTO_RESET:
      return {
        loading: null,
        crypto: null,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
