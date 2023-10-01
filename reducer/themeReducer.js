import {
  POP_UP_SUCCESS,
  THEME_RESET,
  THEME_SUCCESS,
} from '../constants/themeConstants';

export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case THEME_SUCCESS:
      return {
        darkMode: action.payload,
      };

    case POP_UP_SUCCESS:
      return {
        ...state,
        isPopupVisited: action.payload,
      };

    case THEME_RESET:
      return {
        darkMode: null,
      };

    default:
      return state;
  }
};
