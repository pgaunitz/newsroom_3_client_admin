import axios from "axios";
import { GET_ARTICLE_DATA } from "./actionTypes";

const apiURL = "https://newsroom3api.herokuapp.com/api/v1/admin";

const fetchArticles = () => {
  return async dispatch => {
    let response = await axios.get(apiURL);
    return dispatch(dispatchArticleAction(response.data));
  };
};

const dispatchArticleAction = json => {
  return { type: GET_ARTICLE_DATA, payload: json };
};


export { fetchArticles };
