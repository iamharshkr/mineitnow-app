import {
  CLEAR_ERRORS,
  GET_MINED_COINS,
  RESET_MINED_COINS,
  REWARDS_FAIL,
  REWARDS_REQUEST,
  REWARDS_RESET,
  REWARDS_SUCCESS,
  START_MINING_FAIL,
  START_MINING_REQUEST,
  START_MINING_RESET,
  START_MINING_SUCCESS,
} from '../constants/miningConstants';
export const miningReducer = (state = {}, action) => {
  switch (action.type) {
    case REWARDS_REQUEST:
    case START_MINING_REQUEST:
      return {
        loading: true,
      };
    case REWARDS_SUCCESS:
    case START_MINING_SUCCESS:
      return {
        ...state,
        loading: false,
        mining: action.payload,
      };
    case REWARDS_FAIL:
    case START_MINING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case START_MINING_RESET:
      return {
        loading: false,
        mining: null,
        error: null,
      };

      case CLEAR_ERRORS:
        return{
          ...state,
          error: null
        }

    default:
      return state;
  }
};

export const minedReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MINED_COINS:
      return {
        minedCoins: action.payload,
      };

    case RESET_MINED_COINS:
      return {
        minedCoins: null,
      };

    default:
      return state;
  }
};
