import { CLEAR_ERRORS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_RESET, SEND_MESSAGE_SUCCESS } from "../constants/userConstants";

//Contact Us Reducer
export const contactReducer = (state = {}, action) => {
    switch (action.type) {
      case SEND_MESSAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case SEND_MESSAGE_SUCCESS:
        return {
          loading: false,
          message: action.payload.message,
          reference: action.payload.referenceNumber,
        };
  
      case SEND_MESSAGE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
        case SEND_MESSAGE_RESET:
          return{
            ...state,
            message: null,
            reference: null
          }
  
        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };