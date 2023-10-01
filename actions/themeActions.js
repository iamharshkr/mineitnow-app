import {POP_UP_SUCCESS, THEME_SUCCESS} from '../constants/themeConstants';

export const setTheme = data => async dispatch => {
  try {
    dispatch({type: THEME_SUCCESS, payload: data});
  } catch (error) {
    console.log('Error', error);
  }
};

export const setPopUp = data => async dispatch => {
  try {
    dispatch({type: POP_UP_SUCCESS, payload: data});
  } catch (error) {
    console.log('Error', error);
  }
};
