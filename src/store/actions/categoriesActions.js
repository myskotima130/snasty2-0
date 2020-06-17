import { GET_CATEGORIES, SET_ACTIVE_CATEGORIES } from "./types";

export const getCategories = () => dispatch =>
  dispatch({ type: GET_CATEGORIES });

export const setActiveCategory = category => dispatch => {
  dispatch({
    type: SET_ACTIVE_CATEGORIES,
    payload: category
  });
};
