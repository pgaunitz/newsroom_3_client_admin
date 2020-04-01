import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload.currentUser
      };
    default:
      return state;
  }
};

export default rootReducer