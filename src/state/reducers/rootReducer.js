import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload.currentUser,
      };
    case actionTypes.GET_ARTICLE_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.SHOW_PUBLISH_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
